export type RoleCategory = "engineering" | "design" | "product" | "other";

export type LocationType = "remote" | "hybrid" | "onsite";

export type Seniority = "junior" | "mid" | "senior";

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  location?: string;
  experienceLevel?: Seniority;
  rolePreferences?: RoleCategory[];
  skills: string[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  locationType: LocationType;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  roleCategory: RoleCategory;
  seniority: Seniority;
  tags: string[];
  shortDescription: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  aboutCompany: string;
  requiredSkills: string[];
  createdAt: string;
}

export type ApplicationStage =
  | "applied"
  | "reviewing"
  | "shortlisted"
  | "interview"
  | "offer"
  | "rejected";

export interface FitExplanation {
  score: number; // 0-100
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  createdAt: string;
  updatedAt: string;
  stage: ApplicationStage;
  resumeUrl?: string;
  whyYou?: string;
  fit: FitExplanation;
}
