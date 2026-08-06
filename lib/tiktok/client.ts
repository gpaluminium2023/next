import { prisma } from "@/lib/prisma";

// TikTok Display API v2. Requires a developer app with Login Kit (for OAuth)
// and the Display API's `video.list` scope approved — see
// docs/tiktok-integration-plan.md for the setup steps. Needs three env vars:
// TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REDIRECT_URI (must match
// the redirect URI registered on the TikTok developer app exactly).
const TIKTOK_AUTHORIZE_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_VIDEO_LIST_URL = "https://open.tiktokapis.com/v2/video/list/";
const SCOPES = "user.info.basic,video.list";

// Refresh proactively once the access token is within this window of
// expiring, rather than waiting for a 401 mid-request.
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set — see docs/tiktok-integration-plan.md for setup`);
  }
  return value;
}

export function buildAuthorizeUrl(state: string, codeChallenge: string): string {
  const params = new URLSearchParams({
    client_key: requireEnv("TIKTOK_CLIENT_KEY"),
    response_type: "code",
    scope: SCOPES,
    redirect_uri: requireEnv("TIKTOK_REDIRECT_URI"),
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  return `${TIKTOK_AUTHORIZE_URL}?${params.toString()}`;
}

interface TikTokTokenResponse {
  open_id: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  scope: string;
  token_type: string;
  error?: string;
  error_description?: string;
}

async function persistTokens(token: TikTokTokenResponse) {
  const now = Date.now();
  const data = {
    openId: token.open_id,
    accessToken: token.access_token,
    accessTokenExpiresAt: new Date(now + token.expires_in * 1000),
    refreshToken: token.refresh_token,
    refreshTokenExpiresAt: new Date(now + token.refresh_expires_in * 1000),
    scope: token.scope,
  };
  await prisma.tikTokConnection.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  });
}

export async function exchangeCodeForToken(
  code: string,
  codeVerifier: string,
): Promise<TikTokTokenResponse> {
  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({
      client_key: requireEnv("TIKTOK_CLIENT_KEY"),
      client_secret: requireEnv("TIKTOK_CLIENT_SECRET"),
      code,
      grant_type: "authorization_code",
      redirect_uri: requireEnv("TIKTOK_REDIRECT_URI"),
      code_verifier: codeVerifier,
    }),
  });
  const data = (await res.json()) as TikTokTokenResponse;
  if (!res.ok || data.error) {
    throw new Error(data.error_description ?? `TikTok token exchange failed (${res.status})`);
  }
  await persistTokens(data);
  return data;
}

async function refreshTokens(refreshToken: string): Promise<TikTokTokenResponse> {
  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({
      client_key: requireEnv("TIKTOK_CLIENT_KEY"),
      client_secret: requireEnv("TIKTOK_CLIENT_SECRET"),
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = (await res.json()) as TikTokTokenResponse;
  if (!res.ok || data.error) {
    throw new Error(data.error_description ?? `TikTok token refresh failed (${res.status})`);
  }
  await persistTokens(data);
  return data;
}

// Returns a valid access token for the connected account, refreshing first
// if it's close to expiring. Returns null if nothing is connected.
export async function getValidAccessToken(): Promise<string | null> {
  const connection = await prisma.tikTokConnection.findUnique({ where: { id: "singleton" } });
  if (!connection) return null;

  const msUntilExpiry = connection.accessTokenExpiresAt.getTime() - Date.now();
  if (msUntilExpiry > REFRESH_BUFFER_MS) {
    return connection.accessToken;
  }

  const refreshed = await refreshTokens(connection.refreshToken);
  return refreshed.access_token;
}

export async function disconnectAccount(): Promise<void> {
  await prisma.tikTokConnection.deleteMany({ where: { id: "singleton" } });
}

export interface TikTokVideoSummary {
  id: string;
  title: string;
  coverImageUrl: string;
  shareUrl: string;
  duration: number;
  createTime: number;
}

interface TikTokVideoListApiResponse {
  data?: {
    videos?: Array<{
      id: string;
      title?: string;
      cover_image_url: string;
      share_url: string;
      duration: number;
      create_time: number;
    }>;
    cursor?: number;
    has_more?: boolean;
  };
  error?: { code: string; message: string };
}

export async function listAccountVideos(
  cursor?: number,
): Promise<{ videos: TikTokVideoSummary[]; cursor: number; hasMore: boolean }> {
  const accessToken = await getValidAccessToken();
  if (!accessToken) throw new Error("No connected TikTok account");

  const res = await fetch(
    `${TIKTOK_VIDEO_LIST_URL}?fields=id,title,cover_image_url,share_url,duration,create_time`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ max_count: 20, ...(cursor ? { cursor } : {}) }),
    },
  );
  const data = (await res.json()) as TikTokVideoListApiResponse;
  if (!res.ok || (data.error && data.error.code !== "ok")) {
    throw new Error(data.error?.message ?? `TikTok video list failed (${res.status})`);
  }

  return {
    videos: (data.data?.videos ?? []).map((v) => ({
      id: v.id,
      title: v.title ?? "",
      coverImageUrl: v.cover_image_url,
      shareUrl: v.share_url,
      duration: v.duration,
      createTime: v.create_time,
    })),
    cursor: data.data?.cursor ?? 0,
    hasMore: data.data?.has_more ?? false,
  };
}
