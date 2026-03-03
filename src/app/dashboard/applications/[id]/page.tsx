"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { mockApplications } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { StageBadge } from "@/components/ui/badge";
import { FitScoreRing, FitScoreBar } from "@/components/ui/fit-score";
import { SkillTag } from "@/components/ui/skill-tag";
import { formatDate, cn, stageLabel } from "@/lib/utils";
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { formatSalary } from "@/lib/utils";

const stageOrder = [
  "applied",
  "reviewing",
  "shortlisted",
  "interview",
  "offer",
] as const;

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [isLoading, user, router]);

  const application = mockApplications.find((a) => a.id === id);

  if (isLoading || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500">Loading...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-stone-800">
          Application not found
        </h1>
        <Link href="/dashboard" className="mt-4 inline-block">
          <Button variant="secondary">Back to dashboard</Button>
        </Link>
      </div>
    );
  }

  const { job, fitScore, timeline, stage } = application;
  const salary = formatSalary(job.salaryMin, job.salaryMax, job.currency);
  const currentStageIdx = stageOrder.indexOf(
    stage as (typeof stageOrder)[number]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to applications
      </Link>

      {/* Header */}
      <GlassCard variant="strong" padding="lg" className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-7 h-7 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-800">
                {job.title}
              </h1>
              <StageBadge stage={stage} />
            </div>
            <p className="text-stone-500 mt-0.5">{job.company.name}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-stone-400">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
              {salary && (
                <span className="inline-flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  {salary}
                </span>
              )}
              <span>Applied {formatDate(application.appliedAt)}</span>
            </div>
          </div>
          <Link href={`/jobs/${job.id}`}>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              View role
            </Button>
          </Link>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stage timeline */}
          <GlassCard padding="lg">
            <h2 className="text-lg font-semibold text-stone-800 mb-5">
              Application Timeline
            </h2>

            {/* Visual progress bar */}
            <div className="flex items-center gap-1 mb-6">
              {stageOrder.map((s, i) => {
                const isCompleted = i <= currentStageIdx;
                const isCurrent = i === currentStageIdx;
                return (
                  <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "h-2 w-full rounded-full transition-all",
                        isCompleted
                          ? "bg-gradient-to-r from-amber-500 to-amber-400"
                          : "bg-stone-100"
                      )}
                    />
                    <span
                      className={cn(
                        "text-[10px] font-medium uppercase tracking-wider",
                        isCurrent ? "text-amber-600" : isCompleted ? "text-stone-500" : "text-stone-300"
                      )}
                    >
                      {stageLabel(s)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Timeline events */}
            <div className="space-y-0">
              {timeline.map((event, i) => (
                <div key={i} className="flex gap-3 relative">
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[11px] top-6 w-0.5 h-[calc(100%-8px)] bg-amber-200" />
                  )}
                  <div className="flex-shrink-0 mt-0.5">
                    {i === timeline.length - 1 ? (
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                        <Circle className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      </div>
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-medium text-stone-700">
                      {stageLabel(event.stage)}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {formatDate(event.date)}
                    </p>
                    {event.note && (
                      <p className="text-sm text-stone-500 mt-1">
                        {event.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Fit breakdown */}
          <GlassCard padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-stone-800">
                Detailed Fit Breakdown
              </h2>
            </div>

            <p className="text-stone-500 mb-6">{fitScore.summary}</p>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-semibold text-stone-700">
                    Your Strengths
                  </h3>
                </div>
                <div className="space-y-3">
                  {fitScore.strengths.map((s, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100"
                    >
                      <p className="text-sm font-medium text-emerald-800">
                        {s.area}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">
                        {s.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gaps */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-stone-700">
                    Areas to Improve
                  </h3>
                </div>
                <div className="space-y-3">
                  {fitScore.gaps.length > 0 ? (
                    fitScore.gaps.map((g, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-amber-50/50 border border-amber-100"
                      >
                        <p className="text-sm font-medium text-amber-800">
                          {g.area}
                        </p>
                        <p className="text-xs text-amber-600 mt-0.5">
                          {g.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-stone-400 italic">
                      No significant gaps identified
                    </p>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Recommendations */}
          <GlassCard padding="lg">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-stone-800">
                Suggested Next Steps
              </h2>
            </div>
            <div className="space-y-3">
              {fitScore.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/40 border border-white/40"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-stone-600">{rec}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Fit score ring */}
          <GlassCard variant="strong" padding="lg" className="text-center">
            <FitScoreRing score={fitScore.overall} size="lg" />
            <p className="text-sm text-stone-500 mt-3">
              {fitScore.overall >= 75
                ? "Strong match for this role"
                : fitScore.overall >= 50
                  ? "Good potential fit"
                  : "Growing match"}
            </p>
          </GlassCard>

          {/* Score bars */}
          <GlassCard padding="lg">
            <h3 className="text-sm font-semibold text-stone-700 mb-3">
              Score Breakdown
            </h3>
            <div className="space-y-3">
              {fitScore.strengths.map((s, i) => (
                <FitScoreBar
                  key={i}
                  label={s.area}
                  score={Math.min(100, Math.round((s.score / 50) * 100))}
                />
              ))}
            </div>
          </GlassCard>

          {/* Your cover note */}
          <GlassCard padding="lg" variant="subtle">
            <h3 className="text-sm font-semibold text-stone-700 mb-2">
              Your Cover Note
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed italic">
              &ldquo;{application.coverNote}&rdquo;
            </p>
          </GlassCard>

          {/* Tags */}
          <GlassCard padding="lg">
            <h3 className="text-sm font-semibold text-stone-700 mb-3">
              Role Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {job.tags.map((tag) => (
                <SkillTag key={tag} label={tag} variant="amber" />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
