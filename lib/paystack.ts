// Thin wrapper over the Paystack REST API. Works with test (sk_test_/pk_test_)
// or live keys — nothing else in the codebase needs to change when switching.
const PAYSTACK_BASE = "https://api.paystack.co";

class PaystackError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "PaystackError";
  }
}

async function paystackFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new PaystackError("PAYSTACK_SECRET_KEY is not configured", 500);
  }

  const res = await fetch(`${PAYSTACK_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok || !json.status) {
    throw new PaystackError(json.message ?? "Paystack request failed", res.status);
  }

  return json.data as T;
}

interface InitializeTransactionParams {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}

interface InitializeTransactionResult {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export function initializeTransaction(params: InitializeTransactionParams) {
  return paystackFetch<InitializeTransactionResult>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKobo,
      reference: params.reference,
      callback_url: params.callbackUrl,
      currency: "NGN",
      metadata: params.metadata,
    }),
  });
}

interface VerifyTransactionResult {
  id: number;
  status: "success" | "failed" | "abandoned" | string;
  reference: string;
  amount: number;
  currency: string;
  channel: string;
  paid_at: string | null;
  gateway_response: string;
}

export function verifyTransaction(reference: string) {
  return paystackFetch<VerifyTransactionResult>(
    `/transaction/verify/${encodeURIComponent(reference)}`,
  );
}

export { PaystackError };
