"use client";

import * as React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";

export function AuthFormShell({
  mode,
  next,
  children
}: {
  mode: "login" | "signup";
  next?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 items-center justify-center pb-10 pt-4">
      <GlassCard className="w-full p-6 sm:p-7">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            {mode === "login" ? "Welcome back" : "Create your profile"}
          </p>
          <h1 className="text-lg font-semibold text-slate-900">
            {mode === "login" ? "Candidate sign in" : "Join Together as a candidate"}
          </h1>
          <p className="text-xs text-slate-600">
            {mode === "login"
              ? "Sign in to see your fit scores and track every application in one place."
              : "We’ll use this profile to calculate your fit score for every role."}
          </p>
          {next ? (
            <p className="text-[11px] text-slate-500">
              You&apos;ll be redirected back to{" "}
              <span className="font-medium text-slate-700">{next}</span> after.
            </p>
          ) : null}
        </div>

        <div className="mt-5 space-y-4">{children}</div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
          <p>
            {mode === "login"
              ? "Don’t have a profile yet?"
              : "Already created a profile?"}
          </p>
          <Link
            href={
              mode === "login"
                ? `/auth/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`
                : `/auth/login${next ? `?next=${encodeURIComponent(next)}` : ""}`
            }
            className="font-medium text-amber-700 underline-offset-2 hover:underline"
          >
            {mode === "login" ? "Create one" : "Sign in"}
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

