import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "this-should-be-a-secure-secret-key"
);

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "author";
}

export async function signJwtToken(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(JWT_SECRET);

  return token;
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  const payload = await verifyJwtToken(token);
  return payload;
}

export function setAuthCookie(res: NextResponse, token: string) {
  res.cookies.set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return res;
}

export function removeAuthCookie(res: NextResponse) {
  res.cookies.set({
    name: "auth-token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return res;
}

export async function validateApiKey(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey) {
    return null;
  }

  // Implement API key validation logic here
  // This would typically involve looking up the API key in the database
  // and checking if it's valid and not expired

  return null; // Return user information if the API key is valid
}
