import { NextRequest, NextResponse } from "next/server";
import { graphqlClient } from "@/lib/api";
import { SignJWT } from "jose";

const RESET_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "this-should-be-a-secure-secret-key"
);

interface UserByEmailResult {
  users: { id: string; email: string; name: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const query = `
      query getUserByEmail($email: String!) {
        users(where: { email: { equals: $email } }) {
          id
          email
          name
        }
      }
    `;

    const res = await graphqlClient.request<UserByEmailResult>(query, { email });
    const user = res.users?.[0];
    if (!user) {
      // No revelar si existe o no
      return NextResponse.json({ success: true });
    }

    // Emitir token de reset (válido 30 min)
    const token = await new SignJWT({ sub: user.id, type: "pwd-reset" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30m")
      .sign(RESET_SECRET);

    // TODO: enviar email con link que apunte a /reset-password?token=...
    // Por ahora devolvemos el token para facilitar pruebas locales
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


