import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-stretch">
      <section className="glass-card glass-hover relative overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_55%)]" />
        <div className="relative flex h-full flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200/70 bg-amber-50/70 px-3 py-1 text-xs font-medium text-amber-800 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Smart matching for candidates
          </div>
          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Find roles where{" "}
              <span className="bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                you&apos;re truly a fit
              </span>
              .
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-600 sm:text-base">
              Together reads between the lines of job descriptions and your
              experience to calculate a transparent fit score for every role,
              with clear explanations you can actually use.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/jobs"
              className="focus-ring inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md shadow-amber-300/40 transition hover:from-amber-400 hover:to-amber-300"
            >
              Browse open roles
            </Link>
            <Link
              href="/auth/signup"
              className="focus-ring inline-flex items-center justify-center rounded-full border border-amber-200/80 bg-white/70 px-4 py-2 text-xs font-medium text-amber-800 shadow-sm backdrop-blur-md hover:bg-amber-50/80"
            >
              Create your candidate profile
            </Link>
          </div>

          <dl className="mt-4 grid gap-4 text-xs text-slate-600 sm:grid-cols-3">
            <div>
              <dt className="font-medium text-slate-900">Personal fit scores</dt>
              <dd className="mt-1">
                See how well you match each role, beyond generic keywords.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">
                Human-readable insights
              </dt>
              <dd className="mt-1">
                Understand your strengths, gaps, and where to focus preparation.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">
                One cockpit for every app
              </dt>
              <dd className="mt-1">
                Track applications, stages, and feedback in one clean view.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="space-y-4">
        <div className="glass-card p-6 sm:p-7">
          <h2 className="text-sm font-semibold text-slate-900">
            How Together evaluates fit
          </h2>
          <p className="mt-2 text-xs text-slate-600">
            For every role, Together compares your profile against the job&apos;s
            real requirements: skills, scope, and work style. Our models
            highlight where you shine and where to go deeper in interviews.
          </p>
          <ul className="mt-3 space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              <span>
                <span className="font-medium text-slate-900">
                  Strengths:
                </span>{" "}
                core skills and experiences strongly aligned with the role.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              <span>
                <span className="font-medium text-slate-900">Gaps:</span>{" "}
                capabilities that may be underdeveloped or missing.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              <span>
                <span className="font-medium text-slate-900">
                  Recommendations:
                </span>{" "}
                targeted tips to refine your resume and interview prep.
              </span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                Trusted by teams hiring thoughtfully
              </h3>
              <p className="mt-2 text-xs text-slate-600">
                Roles from high-signal teams that care about candidate
                experience.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-700 sm:grid-cols-4">
            <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-center shadow-sm">
              Northwind Labs
            </div>
            <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-center shadow-sm">
              Aurora Systems
            </div>
            <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-center shadow-sm">
              Meridian Capital
            </div>
            <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-center shadow-sm">
              Lumen Studio
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
