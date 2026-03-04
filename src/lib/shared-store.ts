import { supabase } from "./supabase";
import type { Job, Company } from "./types";

export interface SharedApplication {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  candidateSkills: string[];
  candidateLocation: string;
  candidateExperience: string;
  candidateBio: string;
  candidateResumeUrl: string;
  coverNote: string;
  appliedAt: string;
}

interface SharedJobRow {
  id: string;
  company_id: string;
  company_name: string;
  title: string;
  department: string;
  role_type: string;
  required_skills: string[];
  experience_level: string;
  description: string;
  must_have: string[];
  nice_to_have: string[];
  created_at: string;
  status: string;
}

const ROLE_TYPE_MAP: Record<string, Job["roleType"]> = {
  developer: "engineering",
  designer: "design",
  pm: "product",
  custom: "engineering",
};

const EXPERIENCE_MAP: Record<string, Job["seniority"]> = {
  junior: "junior",
  mid: "mid",
  senior: "senior",
  lead: "lead",
  principal: "lead",
};

function sharedRowToTogetherJob(row: SharedJobRow): Job {
  const company: Company = {
    id: row.company_id,
    name: row.company_name,
    logo: "/logos/together.svg",
    industry: "Technology",
    size: "50-200",
    description: `${row.company_name} is hiring for exciting roles across the company.`,
    website: `https://${row.company_name.toLowerCase().replace(/\s+/g, "")}.dev`,
  };

  return {
    id: row.id,
    title: row.title,
    company,
    roleType: ROLE_TYPE_MAP[row.role_type] ?? "engineering",
    locationType: "remote",
    location: "Remote",
    seniority: EXPERIENCE_MAP[row.experience_level] ?? "mid",
    currency: "USD",
    description: row.description,
    responsibilities:
      row.must_have && row.must_have.length > 0
        ? row.must_have
        : ["See job description for details"],
    requirements: (row.required_skills ?? []).map((s) => `Experience with ${s}`),
    niceToHave: row.nice_to_have ?? [],
    benefits: [],
    tags: (row.required_skills ?? []).slice(0, 5),
    postedAt: row.created_at,
    isActive: row.status === "active",
  };
}

export async function getSharedJobs(): Promise<Job[]> {
  const { data: rows, error } = await supabase
    .from("shared_jobs")
    .select("*")
    .eq("status", "active");

  if (error) {
    console.error("Supabase select shared_jobs error:", error);
    return [];
  }

  return (rows as SharedJobRow[]).map(sharedRowToTogetherJob);
}

export async function getSharedJobById(
  jobId: string
): Promise<Job | undefined> {
  const { data: row, error } = await supabase
    .from("shared_jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (error || !row) return undefined;
  return sharedRowToTogetherJob(row as SharedJobRow);
}

export async function saveApplicationToSharedStore(app: SharedApplication) {
  const { error } = await supabase.from("shared_applications").upsert({
    id: app.id,
    job_id: app.jobId,
    candidate_name: app.candidateName,
    candidate_email: app.candidateEmail,
    candidate_skills: app.candidateSkills,
    candidate_location: app.candidateLocation,
    candidate_experience: app.candidateExperience,
    candidate_bio: app.candidateBio,
    candidate_resume_url: app.candidateResumeUrl,
    cover_note: app.coverNote,
    applied_at: app.appliedAt,
  });

  if (error) {
    console.error("Supabase upsert shared_applications error:", error);
    throw error;
  }
}
