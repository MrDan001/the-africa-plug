import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "tap_admin";
const maxAge = 60 * 60 * 12;

function signature(value: string) {
  return createHmac("sha256", process.env.ADMIN_PASSWORD || "").update(value).digest("hex");
}

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });

  let body: { password?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  if (!body.password || body.password.length > 200) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const provided = createHmac("sha256", password).update(body.password).digest();
  const expected = createHmac("sha256", password).update(password).digest();
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const issued = Date.now().toString();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, issued + "." + signature(issued), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
    path: "/", maxAge
  });
  return response;
}
