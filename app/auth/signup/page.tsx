"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthFormShell } from "../AuthFormShell";

export default function SignupPage() {
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, name })
      });

      if (!res.ok) {
        setError("Unable to create your profile. Please check your details.");
        return;
      }

      const redirectTo = next || "/profile/setup";
      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormShell mode="signup">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Full name"
          required
          autoComplete="name"
          placeholder="Taylor Rivers"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Work email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error ? (
          <p className="text-[11px] text-rose-600">{error}</p>
        ) : (
          <p className="text-[11px] text-slate-500">
            We&apos;ll start with the basics, then help you add skills so fit scores
            stay accurate.
          </p>
        )}
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Creating profile…" : "Continue"}
        </Button>
      </form>
    </AuthFormShell>
  );
}

