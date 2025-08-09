"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Enter your email");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Request failed");
      toast.success("If the email exists, a reset link has been sent.");
      if (result.token) setToken(result.token);
    } catch (err: any) {
      toast.error(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 container max-w-md mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
          {token && (
            <p className="text-xs text-muted-foreground mt-4 break-all">
              Test token (dev): {token}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


