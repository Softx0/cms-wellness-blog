import { NextRequest, NextResponse } from "next/server";
import { graphqlClient } from "@/lib/api";
import { signJwtToken, setAuthCookie } from "@/lib/auth";

interface AuthenticationResult {
  authenticateUserWithPassword: {
    __typename:
      | "UserAuthenticationWithPasswordSuccess"
      | "UserAuthenticationWithPasswordFailure";
    sessionToken?: string;
    item?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    message?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Authenticate user with Keystone
    const authMutation = `
      mutation authenticateUser($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
          ... on UserAuthenticationWithPasswordSuccess {
            sessionToken
            item {
              id
              name
              email
              role
            }
          }
          ... on UserAuthenticationWithPasswordFailure {
            message
          }
        }
      }
    `;

    const authResult = await graphqlClient.request<AuthenticationResult>(
      authMutation,
      {
        email,
        password,
      }
    );

    const authData = authResult.authenticateUserWithPassword;

    if (authData.__typename === "UserAuthenticationWithPasswordFailure") {
      return NextResponse.json(
        { error: authData.message || "Invalid credentials" },
        { status: 401 }
      );
    }

    if (authData.__typename === "UserAuthenticationWithPasswordSuccess") {
      const { sessionToken, item: user } = authData;

      if (!user) {
        return NextResponse.json(
          { error: "User data not found" },
          { status: 401 }
        );
      }

      // Create JWT token
      const token = await signJwtToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      // Set cookie
      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });

      setAuthCookie(response, token);

      return response;
    }

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
