import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getCurrentCandidateFromCookies,
  listApplicationsForCandidate,
  getJobById
} from "@/lib/auth";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { FitScoreBadge } from "@/components/ui/fit-score-badge";

const stageOrder = [
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

export default function DashboardPage() {
  const candidate = getCurrentCandidateFromCookies();
  if (!candidate) {
    redirect("/auth/login?next=/dashboard");
  }

  const apps = listApplicationsForCandidate(candidate.id)
    .map((app) => ({
      ...app,
      job: getJobById(app.jobId)
    }))
    .filter((app) => app.job != null)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <GlassCard className="p-6 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Your applications
              </p>
              <h1 className="text-lg font-semibold text-slate-900">
                Hi {candidate.name || "there"} — here&apos;s your cockpit
              </h1>
              <p className="mt-1 text-xs text-slate-600">
                Track each opportunity, see how Together evaluates your fit, and
                prep intentionally for every conversation.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 text-[11px] text-slate-500">
              <p>
                {apps.length === 0
                  ? "No applications yet."
                  : `${apps.length} active application${apps.length > 1 ? "s" : ""}.`}
              </p>
              <Link
                href="/jobs"
                className="text-amber-700 underline-offset-2 hover:underline"
              >
                Browse open roles
              </Link>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            Profile snapshot
          </p>
          <div className="space-y-1 text-xs text-slate-700">
            <p className="font-medium">{candidate.name}</p>
            <p>{candidate.location || "Location not set yet"}</p>
            <p className="capitalize">
              {candidate.experienceLevel
                ? `${candidate.experienceLevel}-level`
                : "Experience level not set"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-medium text-slate-700">
              Skills powering your fit scores
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(candidate.skills.length > 0
                ? candidate.skills
                : ["Add skills to refine your matches"]
              ).map((skill) => (
                <Badge key={skill} variant="subtle">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <Link
            href="/profile/setup"
            className="inline-flex text-[11px] font-medium text-amber-700 underline-offset-2 hover:underline"
          >
            Edit profile &amp; skills
          </Link>
        </GlassCard>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            Application timeline
          </p>
        </div>

        {apps.length === 0 ? (
          <GlassCard className="p-6 text-sm text-slate-600">
            Once you apply to a role, you&apos;ll see its status and fit breakdown
            here.
          </GlassCard>
        ) : (
          apps.map((app) =>
            app.job ? (
              <Link
                key={app.id}
                href={`/applications/${app.id}`}
                className="block focus-visible:outline-none"
              >
                <GlassCard className="glass-hover p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                          {app.job.title}
                        </h2>
                        <span className="text-xs text-slate-500">•</span>
                        <p className="text-xs font-medium text-slate-700">
                          {app.job.companyName}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {formatStage(app.stage)}
                        </span>
                        <span>•</span>
                        <span className="capitalize">
                          {app.job.locationType}
                        </span>
                      </div>
                      <p className="mt-1 max-w-xl text-xs text-slate-600">
                        {app.job.shortDescription}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {app.job.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="subtle">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <FitScoreBadge score={app.fit.score} size="sm" />
                      <p className="text-right text-[11px] text-slate-500">
                        Tap to see strengths, gaps, and prep suggestions.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ) : null
          )
        )}
      </div>
    </div>
  );
}

