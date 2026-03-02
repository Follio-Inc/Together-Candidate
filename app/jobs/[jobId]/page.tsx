import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { FitScoreBadge } from "@/components/ui/fit-score-badge";
import { getCurrentCandidateFromCookies } from "@/lib/auth";
import { getJobById } from "@/lib/auth";
import { createFitExplanation } from "@/lib/mockData";
import { ApplyClient } from "./ApplyClient";

interface Params {
  params: {
    jobId: string;
  };
}

export default function JobDetailPage({ params }: Params) {
  const job = getJobById(params.jobId);
  if (!job) {
    notFound();
  }

  const candidate = getCurrentCandidateFromCookies();
  const fit =
    candidate && candidate.skills.length > 0
      ? createFitExplanation({ candidate, job })
      : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <GlassCard className="p-6 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {job.title}
                </h1>
                <span className="text-xs text-slate-500">•</span>
                <p className="text-xs font-medium text-slate-700">
                  {job.companyName}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                <span>{job.location}</span>
                <span>•</span>
                <span className="capitalize">{job.locationType}</span>
                <span>•</span>
                <span className="capitalize">{job.seniority}-level</span>
                {job.salaryRange ? (
                  <>
                    <span>•</span>
                    <span>
                      {job.salaryRange.currency}{" "}
                      {Math.round(job.salaryRange.min / 1000)}k–
                      {Math.round(job.salaryRange.max / 1000)}k
                    </span>
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Link
                href="#apply"
                className="focus-ring inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-xs font-semibold text-slate-900 shadow-md shadow-amber-300/40 hover:from-amber-400 hover:to-amber-300"
              >
                Apply now
              </Link>
              <p className="max-w-[180px] text-right text-[11px] text-slate-500">
                Together sends your application directly to the hiring team.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-700">{job.overview}</p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-7 space-y-5">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
              Responsibilities
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
              Requirements
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              {job.requirements.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
              Skills &amp; keywords
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.requiredSkills.map((skill) => (
                <Badge key={skill} variant="subtle">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
              About the company
            </h2>
            <p className="mt-2 text-sm text-slate-700">{job.aboutCompany}</p>
          </section>
        </GlassCard>
      </div>

      <div className="space-y-4" id="apply">
        <GlassCard className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Your fit for this role
              </h2>
              {candidate ? (
                fit ? (
                  <p className="mt-1 text-xs text-slate-600">
                    Based on your current profile, this is how Together sees your
                    match with this opportunity.
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-slate-600">
                    Complete your skills and preferences in your profile to see a
                    personalized fit score.
                  </p>
                )
              ) : (
                <p className="mt-1 text-xs text-slate-600">
                  Sign in and complete your profile to see a personal fit score
                  and tailored prep suggestions.
                </p>
              )}
            </div>
            {fit ? <FitScoreBadge score={fit.score} size="sm" /> : null}
          </div>

          {fit ? (
            <div className="space-y-3 rounded-xl border border-white/70 bg-white/60 p-3 text-xs text-slate-700">
              <p className="font-medium text-slate-900">{fit.summary}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    Strengths
                  </p>
                  <ul className="space-y-1.5">
                    {fit.strengths.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                    Gaps &amp; focus
                  </p>
                  <ul className="space-y-1.5">
                    {fit.gaps.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          {!candidate ? (
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-3 text-xs text-amber-900">
              <p className="font-medium">Sign in to apply with context</p>
              <p className="mt-1">
                We&apos;ll calculate your fit score after you sign in and complete
                your profile, so your application lands with more signal.
              </p>
              <Link
                href={`/auth/login?next=${encodeURIComponent(`/jobs/${job.id}`)}`}
                className="mt-2 inline-flex text-[11px] font-medium underline underline-offset-2"
              >
                Sign in or create a profile
              </Link>
            </div>
          ) : null}
        </GlassCard>

        <GlassCard className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Apply to this role
              </h2>
              <p className="mt-1 text-xs text-slate-600">
                Share a resume link and a short note. Together attaches your fit
                breakdown for the hiring team.
              </p>
            </div>
          </div>
          <ApplyClient jobId={job.id} />
        </GlassCard>
      </div>
    </div>
  );
}

