import { NextRequest, NextResponse } from "next/server";
import { graphqlClient } from "@/lib/api";
import { jwtVerify } from "jose";

const RESET_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "this-should-be-a-secure-secret-key"
);

interface UpdateUserResult {
  updateUser: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Verify token and extract userId
    const { payload } = await jwtVerify(token, RESET_SECRET);
    const userId = payload?.sub as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const updateMutation = `
      mutation updateUserPassword($id: ID!, $password: String!) {
        updateUser(where: { id: $id }, data: { password: $password }) {
          id
          name
          email
        }
      }
    `;

    const result = await graphqlClient.request<UpdateUserResult>(
      updateMutation,
      {
        id: userId,
        password: newPassword,
      }
    );

    if (!result.updateUser) {
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}


