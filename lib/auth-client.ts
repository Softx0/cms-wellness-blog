"use client";

import { useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "author";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// Client-side hook for authentication
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          // Clear invalid data
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
    }

    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and state
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setUser(null);
      setToken(null);
    }
  };

  return { user, token, loading, logout };
}
