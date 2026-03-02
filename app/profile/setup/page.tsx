"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { CandidateProfile } from "@/lib/types";

type ExperienceLevel = CandidateProfile["experienceLevel"];

export default function ProfileSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [candidate, setCandidate] = React.useState<CandidateProfile | null>(
    null
  );
  const [location, setLocation] = React.useState("");
  const [experienceLevel, setExperienceLevel] =
    React.useState<ExperienceLevel>();
  const [rolePreferences, setRolePreferences] = React.useState<string[]>([]);
  const [skillsInput, setSkillsInput] = React.useState("");
  const [portfolioUrl, setPortfolioUrl] = React.useState("");
  const [githubUrl, setGithubUrl] = React.useState("");
  const [linkedinUrl, setLinkedinUrl] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/candidates/me");
        if (res.status === 401) {
          router.push("/auth/login?next=/profile/setup");
          return;
        }
        const data = (await res.json()) as { candidate: CandidateProfile };
        setCandidate(data.candidate);
        setLocation(data.candidate.location ?? "");
        setExperienceLevel(data.candidate.experienceLevel);
        setRolePreferences(data.candidate.rolePreferences ?? []);
        setSkillsInput(data.candidate.skills.join(", "));
        setPortfolioUrl(data.candidate.portfolioUrl ?? "");
        setGithubUrl(data.candidate.githubUrl ?? "");
        setLinkedinUrl(data.candidate.linkedinUrl ?? "");
      } catch (err) {
        console.error(err);
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router]);

  const toggleRolePreference = (value: string) => {
    setRolePreferences((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const parsedSkills = React.useMemo(
    () =>
      skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [skillsInput]
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/candidates/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          location: location || undefined,
          experienceLevel: experienceLevel,
          rolePreferences,
          skills: parsedSkills,
          portfolioUrl: portfolioUrl || undefined,
          githubUrl: githubUrl || undefined,
          linkedinUrl: linkedinUrl || undefined
        })
      });

      if (!res.ok) {
        setError("Unable to save your profile. Please try again.");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 items-center justify-center pb-10 pt-4">
        <GlassCard className="w-full p-6 text-sm text-slate-600">
          Loading your profile…
        </GlassCard>
      </div>
    );
  }

  if (!candidate) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-xl pb-10 pt-4">
      <GlassCard className="p-6 sm:p-7">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Profile setup
          </p>
          <h1 className="text-lg font-semibold text-slate-900">
            Tell Together how you work
          </h1>
          <p className="text-xs text-slate-600">
            We&apos;ll use this to calculate your fit score for every role and
            highlight where you shine.
          </p>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <Input
            label="Location"
            placeholder="San Francisco Bay Area (Remote-friendly)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Select
            label="Experience level"
            value={experienceLevel ?? ""}
            onChange={(e) =>
              setExperienceLevel(
                (e.target.value || undefined) as ExperienceLevel
              )
            }
          >
            <option value="">Select level</option>
            <option value="junior">Junior (0–2 years)</option>
            <option value="mid">Mid-level (3–6 years)</option>
            <option value="senior">Senior (7+ years)</option>
          </Select>

          <div className="space-y-1.5 text-sm">
            <p className="text-xs font-medium text-slate-800">
              Role preferences
            </p>
            <p className="text-[11px] text-slate-500">
              This doesn&apos;t filter out roles you can see; it just guides which
              ones we highlight.
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {[
                { id: "engineering", label: "Engineering" },
                { id: "design", label: "Design" },
                { id: "product", label: "Product" },
                { id: "other", label: "Other / adjacent" }
              ].map((role) => {
                const active = rolePreferences.includes(role.id);
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => toggleRolePreference(role.id)}
                    className={
                      active
                        ? "focus-ring inline-flex items-center rounded-full border border-amber-300 bg-amber-50/80 px-3 py-1 text-xs font-medium text-amber-800 shadow-sm"
                        : "focus-ring inline-flex items-center rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
                    }
                  >
                    {role.label}
                  </button>
                );
              })}
            </div>
          </div>

          <Textarea
            label="Key skills"
            hint="Comma-separated — we’ll use these for fit scoring."
            placeholder="TypeScript, React, Next.js, system design, stakeholder management"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            rows={2}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Portfolio"
              placeholder="https://studio.bio/you"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
            />
            <Input
              label="GitHub"
              placeholder="https://github.com/you"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            <Input
              label="LinkedIn"
              className="sm:col-span-2"
              placeholder="https://linkedin.com/in/you"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </div>

          {error ? (
            <p className="text-[11px] text-rose-600">{error}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              You can refine this later from your dashboard. Updating skills will
              refresh future fit scores.
            </p>
          )}

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save profile"}
            </Button>
            <button
              type="button"
              className="text-[11px] text-slate-500 underline-offset-2 hover:underline"
              onClick={() => router.push("/dashboard")}
            >
              Skip for now
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

