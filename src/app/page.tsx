import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Sparkles,
  Target,
  MessageSquareText,
  TrendingUp,
  ArrowRight,
  Building2,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Personal Fit Scores",
    description:
      "Every role comes with a 0–100 fit score calculated from your skills, experience, and preferences. No more guessing.",
  },
  {
    icon: MessageSquareText,
    title: "Transparent Explanations",
    description:
      "Understand exactly why you're a match — see your strengths, gaps, and actionable recommendations for every role.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "Follow every application from submission to offer. See stage updates, timelines, and personalized next steps.",
  },
];

const testimonials = [
  {
    name: "Sarah Kim",
    role: "Software Engineer at Luminary AI",
    quote:
      "Together showed me exactly where I fit and where I needed to grow. I got the offer within two weeks.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Designer at Canopy Studio",
    quote:
      "The fit score explanation helped me tailor my application perfectly. It felt like having a career coach.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Data Engineer at Atlas Logistics",
    quote:
      "I stopped applying everywhere and started applying smart. My success rate went from 5% to 40%.",
    rating: 5,
  },
];

const companyLogos = [
  "Luminary AI",
  "Verdant Health",
  "Horizon Finance",
  "Canopy Studio",
  "Atlas Logistics",
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/50 text-amber-700 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-powered career matching
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight tracking-tight animate-slide-up">
            Find roles where you&apos;re
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              actually a fit
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Together uses AI to calculate your personal fit score for every role.
            See your strengths, understand your gaps, and apply with confidence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="/jobs">
              <Button size="lg" className="text-base">
                Browse open roles
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary" size="lg" className="text-base">
                Create your profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company logos */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-6">
            Discover roles at leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {companyLogos.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800">
              How Together works
            </h2>
            <p className="mt-3 text-lg text-stone-500 max-w-xl mx-auto">
              We go beyond keyword matching. Our AI understands your whole
              profile to find where you truly belong.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <GlassCard key={i} hover padding="lg">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Fit Score Demo */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <GlassCard variant="strong" padding="lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-4">
                  <Target className="w-3.5 h-3.5" />
                  Sample Fit Score
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-3">
                  See exactly where you stand
                </h3>
                <p className="text-stone-500 leading-relaxed mb-6">
                  For every role you view, Together calculates a personalized fit
                  score with a transparent breakdown of your strengths and areas
                  for growth.
                </p>
                <Link href="/signup">
                  <Button>
                    Get your fit scores
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-700">
                    Overall Fit
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    82
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Technical Skills", value: 90 },
                    { label: "Experience Level", value: 85 },
                    { label: "Role Alignment", value: 75 },
                    { label: "Culture Fit", value: 78 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">{item.label}</span>
                        <span className="font-medium text-stone-700">
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800">
              Candidates love Together
            </h2>
            <p className="mt-3 text-lg text-stone-500">
              Join thousands of candidates who found their perfect role.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <GlassCard key={i} hover padding="lg">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-stone-600 leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-stone-800">
                    {t.name}
                  </p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard variant="strong" padding="lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-3">
              Ready to find your fit?
            </h2>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">
              Create your profile in 2 minutes. We&apos;ll start calculating
              your fit scores immediately.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup">
                <Button size="lg">
                  Get started free
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="secondary" size="lg">
                  Browse roles first
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
