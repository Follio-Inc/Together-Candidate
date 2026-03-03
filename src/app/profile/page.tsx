"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SkillTagInput } from "@/components/ui/skill-tag";
import { Badge } from "@/components/ui/badge";
import type { ExperienceLevel, RoleType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  User,
  MapPin,
  Briefcase,
  Code,
  Link as LinkIcon,
  Save,
  ExternalLink,
} from "lucide-react";

const experienceLevels: { value: ExperienceLevel; label: string }[] = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "executive", label: "Executive" },
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

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, isLoading, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("mid");
  const [rolePreferences, setRolePreferences] = useState<RoleType[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/profile");
    }
    if (profile) {
      setName(profile.name);
      setLocation(profile.location);
      setExperienceLevel(profile.experienceLevel);
      setRolePreferences(profile.rolePreferences);
      setSkills(profile.skills);
      setPortfolioUrl(profile.portfolioUrl || "");
      setGithubUrl(profile.githubUrl || "");
      setLinkedinUrl(profile.linkedinUrl || "");
    }
  }, [isLoading, user, profile, router]);

  const toggleRole = (role: RoleType) => {
    setRolePreferences((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    updateProfile({
      name,
      location,
      experienceLevel,
      rolePreferences,
      skills,
      portfolioUrl: portfolioUrl || undefined,
      githubUrl: githubUrl || undefined,
      linkedinUrl: linkedinUrl || undefined,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (isLoading || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">My Profile</h1>
          <p className="text-stone-500 mt-1">
            Keep your profile updated for accurate fit scores
          </p>
        </div>
        <Button onClick={handleSave} isLoading={saving}>
          {saved ? (
            <>Saved!</>
          ) : (
            <>
              <Save className="w-4 h-4 mr-1" />
              Save
            </>
          )}
        </Button>
      </div>

      <div className="space-y-6">
        <GlassCard padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-amber-600" />
            <h2 className="font-semibold text-stone-800">Basic Info</h2>
          </div>
          <div className="space-y-4">
            <Input
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              value={user.email}
              disabled
              hint="Email cannot be changed"
            />
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-stone-400" />
              <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="flex-1"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-amber-600" />
            <h2 className="font-semibold text-stone-800">Experience</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Experience level
              </label>
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setExperienceLevel(l.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium border transition-all cursor-pointer",
                      experienceLevel === l.value
                        ? "bg-amber-50 border-amber-300 text-amber-700"
                        : "bg-white/40 border-white/60 text-stone-500 hover:bg-white/60"
                    )}
                  >
                    {l.label}
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
        </GlassCard>

        <GlassCard padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-amber-600" />
            <h2 className="font-semibold text-stone-800">Skills</h2>
          </div>
          <SkillTagInput
            skills={skills}
            onChange={setSkills}
            placeholder="React, TypeScript, Python..."
          />
        </GlassCard>

        <GlassCard padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="w-5 h-5 text-amber-600" />
            <h2 className="font-semibold text-stone-800">Links</h2>
          </div>
          <div className="space-y-4">
            <Input
              label="Portfolio"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://yoursite.com"
            />
            <Input
              label="GitHub"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username"
            />
            <Input
              label="LinkedIn"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </GlassCard>

        <GlassCard padding="lg" variant="subtle">
          <h3 className="text-sm font-semibold text-stone-700 mb-2">
            Profile Summary
          </h3>
          <div className="flex flex-wrap gap-4 text-sm text-stone-500">
            <span className="flex items-center gap-1">
              <Badge variant="amber" size="md">
                {experienceLevel}
              </Badge>
            </span>
            <span>{skills.length} skills</span>
            <span>{rolePreferences.length} role preferences</span>
            {[portfolioUrl, githubUrl, linkedinUrl].filter(Boolean).length > 0 && (
              <span className="flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" />
                {[portfolioUrl, githubUrl, linkedinUrl].filter(Boolean).length} links
              </span>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
