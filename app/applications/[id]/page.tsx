import { notFound, redirect } from "next/navigation";
import {
  getApplicationById,
  getCurrentCandidateFromCookies,
  getJobById
} from "@/lib/auth";
import { GlassCard } from "@/components/ui/glass-card";
import { FitScoreBadge } from "@/components/ui/fit-score-badge";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Params {
  params: {
    id: string;
  };
}

const stageTimeline = [
  "applied",
  "reviewing",
  "shortlisted",
  "interview",
  "offer",
  "rejected"
] as const;

function formatStage(stage: string) {
  switch (stage) {
    case "applied":
      return "Applied";
    case "reviewing":
      return "Reviewing";
    case "shortlisted":
      return "Shortlisted";
    case "interview":
      return "Interview";
    case "offer":
      return "Offer";
    case "rejected":
      return "Closed";
    default:
      return stage;
  }
}

export default function ApplicationDetailPage({ params }: Params) {
  const candidate = getCurrentCandidateFromCookies();
  if (!candidate) {
    redirect(`/auth/login?next=/applications/${params.id}`);
  }

  const app = getApplicationById(params.id);
  if (!app || app.candidateId !== candidate.id) {
    notFound();
  }

  const job = getJobById(app.jobId);
  if (!job) {
    notFound();
  }

  const createdAt = new Date(app.createdAt);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <GlassCard className="p-6 sm:p-7 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Application overview
              </p>
              <h1 className="text-lg font-semibold text-slate-900">
                {job.title}
              </h1>
              <p className="text-xs text-slate-600">
                {job.companyName} • {job.location} •{" "}
                <span className="capitalize">{job.locationType}</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <FitScoreBadge score={app.fit.score} />
              <p className="text-[11px] text-slate-500">
                Submitted on {createdAt.toLocaleDateString()} at{" "}
                {createdAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-white/80 bg-white/70 p-3 text-xs text-slate-700">
            <p className="font-medium text-slate-900">{app.fit.summary}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Strengths
                </p>
                <ul className="space-y-1.5">
                  {app.fit.strengths.map((item) => (
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
                  {app.fit.gaps.map((item) => (
                    <li key={item} className="flex gap-1.5">
                      <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-white/80 bg-white/70 p-3 text-xs text-slate-700">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Suggested next steps
            </p>
            <ul className="space-y-1.5">
              {app.fit.recommendations.map((item) => (
                <li key={item} className="flex gap-1.5">
                  <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5 sm:p-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              Status
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
              <Badge variant="amber" className="capitalize">
                {formatStage(app.stage)}
              </Badge>
              <span className="text-[11px] text-slate-500">
                This mirrors the latest signal from the hiring team.
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <p className="text-[11px] font-medium text-slate-700">
                Timeline
              </p>
              <ol className="space-y-1.5 text-[11px] text-slate-600">
                {stageTimeline.map((stage) => {
                  const reached = stageTimeline.indexOf(stage) <=
                    stageTimeline.indexOf(app.stage as (typeof stageTimeline)[number]);
                  const isCurrent = stage === app.stage;
                  return (
                    <li
                      key={stage}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={
                          reached
                            ? "inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-semibold text-amber-950"
                            : "inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[9px] text-slate-400"
                        }
                      >
                        {reached ? "●" : ""}
                      </span>
                      <span
                        className={
                          isCurrent
                            ? "font-medium text-slate-900"
                            : "text-slate-600"
                        }
                      >
                        {formatStage(stage)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              Your submission
            </p>
            {app.resumeUrl ? (
              <p className="text-xs text-slate-700">
                <span className="font-medium">Resume:</span>{" "}
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-700 underline-offset-2 hover:underline"
                >
                  {app.resumeUrl}
                </a>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                You didn&apos;t attach a resume link for this application.
              </p>
            )}
            {app.whyYou ? (
              <div className="space-y-1 text-xs text-slate-700">
                <p className="font-medium">“Why you?” note</p>
                <p className="whitespace-pre-line rounded-lg bg-white/80 p-2.5 text-[11px] text-slate-700">
                  {app.whyYou}
                </p>
              </div>
            ) : null}
          </GlassCard>

          <GlassCard className="p-4 sm:p-5 flex items-center justify-between gap-3 text-[11px] text-slate-600">
            <div>
              <p className="font-medium text-slate-800">Next steps</p>
              <p>
                Use these insights to tune your resume and stories before each
                conversation.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Link
                href="/dashboard"
                className="underline underline-offset-2 hover:text-slate-800"
              >
                Back to my applications
              </Link>
              <Link
                href={`/jobs/${job.id}`}
                className="underline underline-offset-2 hover:text-slate-800"
              >
                Revisit role details
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

