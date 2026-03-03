export interface CandidateProfile {
  id: string;
  email: string;
  name: string;
  location: string;
  experienceLevel: ExperienceLevel;
  rolePreferences: RoleType[];
  skills: string[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export type ExperienceLevel = "junior" | "mid" | "senior" | "lead" | "executive";

export type RoleType =
  | "engineering"
  | "design"
  | "product"
  | "marketing"
  | "sales"
  | "operations"
  | "data"
  | "devops";

export type LocationType = "remote" | "hybrid" | "onsite";

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  description: string;
  website: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  roleType: RoleType;
  locationType: LocationType;
  location: string;
  seniority: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  tags: string[];
  postedAt: string;
  closesAt?: string;
  isActive: boolean;
}

export type ApplicationStage =
  | "applied"
  | "reviewing"
  | "shortlisted"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

export interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  job: Job;
  coverNote: string;
  resumeUrl: string;
  stage: ApplicationStage;
  fitScore: FitScore;
  appliedAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

export interface FitScore {
  overall: number;
  strengths: FitDetail[];
  gaps: FitDetail[];
  recommendations: string[];
  summary: string;
}

export interface FitDetail {
  area: string;
  description: string;
  score: number;
}

export interface TimelineEvent {
  stage: ApplicationStage;
  date: string;
  note?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  hasProfile: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
