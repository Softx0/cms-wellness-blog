import { NextRequest, NextResponse } from "next/server";
import { graphqlClient } from "@/lib/api";

interface UpdateUserResult {
  updateUser: {
    id: string;
    name: string;
    email: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Update the admin user's password
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
        id: "1", // The admin user ID we found earlier
        password: newPassword,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
      user: result.updateUser,
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}
