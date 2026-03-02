"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ApplyClient({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [resumeUrl, setResumeUrl] = React.useState("");
  const [whyYou, setWhyYou] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          resumeUrl: resumeUrl || undefined,
          whyYou: whyYou || undefined
        })
      });

      if (res.status === 401) {
        const next = encodeURIComponent(`/jobs/${jobId}`);
        router.push(`/auth/login?next=${next}`);
        return;
      }

      if (!res.ok) {
        setError("Something went wrong while submitting your application.");
        return;
      }

      const data = (await res.json()) as {
        application: { id: string };
      };
      router.push(`/applications/${data.application.id}`);
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Resume"
        placeholder="Link to your resume (URL or Drive link)"
        value={resumeUrl}
        onChange={(e) => setResumeUrl(e.target.value)}
        autoComplete="off"
      />
      <Textarea
        label="Why you?"
        hint="A short note on why this role and team are a fit."
        placeholder="Share 3–5 sentences on why this role is a deliberate move for you."
        rows={4}
        value={whyYou}
        onChange={(e) => setWhyYou(e.target.value)}
      />
      {error ? (
        <p className="text-[11px] text-rose-600">{error}</p>
      ) : (
        <p className="text-[11px] text-slate-500">
          We&apos;ll send your profile and this note directly to the hiring team.
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Submit application"}
        </Button>
        <button
          type="button"
          className="text-[11px] text-slate-500 underline-offset-2 hover:underline"
          onClick={() => router.push("/dashboard")}
        >
          View my applications
        </button>
      </div>
    </form>
  );
}

