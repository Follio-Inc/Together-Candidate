"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SkillTagInput } from "@/components/ui/skill-tag";
import type { ExperienceLevel, RoleType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Briefcase,
  Code,
  Link as LinkIcon,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

const experienceLevels: { value: ExperienceLevel; label: string; desc: string }[] = [
  { value: "junior", label: "Junior", desc: "0-2 years" },
  { value: "mid", label: "Mid-level", desc: "3-5 years" },
  { value: "senior", label: "Senior", desc: "5-8 years" },
  { value: "lead", label: "Lead", desc: "8+ years" },
  { value: "executive", label: "Executive", desc: "Director+" },
];

const roleTypes: { value: RoleType; label: string }[] = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "data", label: "Data" },
  { value: "devops", label: "DevOps" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "operations", label: "Operations" },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const { updateProfile, profile } = useAuth();
  const [step, setStep] = useState(0);

  const [location, setLocation] = useState(profile?.location || "");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    profile?.experienceLevel || "mid"
  );
  const [rolePreferences, setRolePreferences] = useState<RoleType[]>(
    profile?.rolePreferences || []
  );
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [portfolioUrl, setPortfolioUrl] = useState(profile?.portfolioUrl || "");
  const [githubUrl, setGithubUrl] = useState(profile?.githubUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedinUrl || "");

  const toggleRole = (role: RoleType) => {
    setRolePreferences((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const steps = [
    {
      title: "Basics",
      icon: MapPin,
      description: "Where are you based?",
    },
    {
      title: "Experience",
      icon: Briefcase,
      description: "Your level and interests",
    },
    {
      title: "Skills",
      icon: Code,
      description: "What are you great at?",
    },
    {
      title: "Links",
      icon: LinkIcon,
      description: "Optional but helpful",
    },
  ];

  const canProceed = () => {
    if (step === 0) return location.trim().length > 0;
    if (step === 1) return rolePreferences.length > 0;
    if (step === 2) return skills.length >= 3;
    return true;
  };

  const handleFinish = () => {
    updateProfile({
      location,
      experienceLevel,
      rolePreferences,
      skills,
      portfolioUrl: portfolioUrl || undefined,
      githubUrl: githubUrl || undefined,
      linkedinUrl: linkedinUrl || undefined,
    });
    router.push("/jobs");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-stone-800">
            Set up your profile
          </h1>
          <p className="text-stone-500 mt-1">
            This helps us calculate your fit scores
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all cursor-pointer",
                  i < step
                    ? "bg-amber-500 text-white"
                    : i === step
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20"
                      : "bg-white/50 text-stone-400 border border-white/60"
                )}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 rounded-full transition-colors",
                    i < step ? "bg-amber-400" : "bg-stone-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <GlassCard variant="strong" padding="lg">
          <div className="flex items-center gap-2 mb-6">
            {(() => {
              const Icon = steps[step].icon;
              return (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
              );
            })()}
            <div>
              <h2 className="font-semibold text-stone-800">{steps[step].title}</h2>
              <p className="text-sm text-stone-500">{steps[step].description}</p>
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <Input
                label="Location"
                placeholder="San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Experience level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setExperienceLevel(level.value)}
                      className={cn(
                        "px-3 py-2.5 rounded-xl text-left border transition-all cursor-pointer",
                        experienceLevel === level.value
                          ? "bg-amber-50 border-amber-300 text-amber-800"
                          : "bg-white/40 border-white/60 text-stone-600 hover:bg-white/60"
                      )}
                    >
                      <div className="text-sm font-medium">{level.label}</div>
                      <div className="text-xs text-stone-400">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Role preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {roleTypes.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => toggleRole(role.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer",
                        rolePreferences.includes(role.value)
                          ? "bg-amber-50 border-amber-300 text-amber-700"
                          : "bg-white/40 border-white/60 text-stone-500 hover:bg-white/60"
                      )}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <SkillTagInput
                label="Your key skills"
                skills={skills}
                onChange={setSkills}
                placeholder="React, TypeScript, Python..."
              />
              {skills.length < 3 && (
                <p className="text-xs text-amber-600">
                  Add at least 3 skills to get accurate fit scores
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Input
                label="Portfolio URL"
                placeholder="https://yoursite.com"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
              />
              <Input
                label="GitHub"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
              <Input
                label="LinkedIn"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
              <p className="text-xs text-stone-400">
                All fields are optional. You can add these later.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleFinish}>
                Complete setup
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
