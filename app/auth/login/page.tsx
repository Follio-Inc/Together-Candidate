"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthFormShell } from "../AuthFormShell";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, name: name || undefined })
      });

      if (!res.ok) {
        setError("Unable to sign in. Please check your email.");
        return;
      }

      const redirectTo = next || "/dashboard";
      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormShell mode="login">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Work email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Name"
          hint="Optional, but helps personalize your dashboard."
          placeholder="Taylor Rivers"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error ? (
          <p className="text-[11px] text-rose-600">{error}</p>
        ) : (
          <p className="text-[11px] text-slate-500">
            We&apos;ll create a lightweight profile if this is your first time here.
          </p>
        )}
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Continue"}
        </Button>
      </form>
    </AuthFormShell>
  );
}

