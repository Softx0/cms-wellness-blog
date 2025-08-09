import { NextRequest, NextResponse } from "next/server";
import { graphqlClient } from "@/lib/api";

interface CreateUserResult {
  createUser: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const mutation = `
      mutation register($data: UserCreateInput!) {
        createUser(data: $data) {
          id
          name
          email
          role
        }
      }
    `;

    // Usuarios creados por self-service deben ser authors por defecto
    const variables = {
      data: {
        name,
        email,
        password,
      },
    };

    const result = await graphqlClient.request<CreateUserResult>(
      mutation,
      variables
    );

    if (!result.createUser) {
      return NextResponse.json(
        { error: "Registration failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Register error:", error);
    const message = error?.response?.errors?.[0]?.message || "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


