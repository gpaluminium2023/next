import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const API_SECRET = process.env.CLOUDINARY_API_SECRET!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const paramsToSign: Record<string, string> = body.paramsToSign;

  if (!paramsToSign || typeof paramsToSign !== "object") {
    return NextResponse.json(
      { error: "Invalid paramsToSign" },
      { status: 400 }
    );
  }

  // Build the string to sign: sorted key=value pairs joined by & then append secret
  const stringToSign =
    Object.keys(paramsToSign)
      .sort()
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join("&") + API_SECRET;

  const signature = createHash("sha256").update(stringToSign).digest("hex");

  return NextResponse.json({ signature, apiKey: API_KEY, cloudName: CLOUD_NAME });
}
