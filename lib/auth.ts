import { cookies } from "next/headers";
import {
  CandidateProfile,
  type Application,
  type Job
} from "./types";
import {
  createApplication,
  createCandidate,
  findCandidateByEmail,
  getApplicationById,
  getCandidateById,
  getJobById,
  listApplicationsForCandidate,
  listJobs,
  updateCandidate
} from "./mockData";

const CANDIDATE_COOKIE = "together_candidate_id";

export function getCurrentCandidateFromCookies(): CandidateProfile | null {
  const store = cookies();
  const id = store.get(CANDIDATE_COOKIE)?.value;
  if (!id) return null;
  return getCandidateById(id);
}

export function requireCurrentCandidate(): CandidateProfile {
  const candidate = getCurrentCandidateFromCookies();
  if (!candidate) {
    throw new Error("UNAUTHENTICATED");
  }
  return candidate;
}

export function setCandidateCookie(id: string) {
  const store = cookies();
  store.set(CANDIDATE_COOKIE, id, {
    httpOnly: false,
    sameSite: "lax",
    path: "/"
  });
}

export function clearCandidateCookie() {
  const store = cookies();
  store.delete(CANDIDATE_COOKIE);
}

export function handleSignup(input: {
  name: string;
  email: string;
}): CandidateProfile {
  const existing = findCandidateByEmail(input.email);
  if (existing) {
    setCandidateCookie(existing.id);
    return existing;
  }
  const created = createCandidate(input);
  setCandidateCookie(created.id);
  return created;
}

export function handleLogin(input: {
  email: string;
  name?: string;
}): CandidateProfile {
  const existing = findCandidateByEmail(input.email);
  if (existing) {
    setCandidateCookie(existing.id);
    return existing;
  }
  const created = createCandidate({
    name: input.name ?? input.email.split("@")[0] ?? "Candidate",
    email: input.email
  });
  setCandidateCookie(created.id);
  return created;
}

export function updateCurrentCandidateProfile(
  partial: Partial<CandidateProfile>
): CandidateProfile {
  const current = requireCurrentCandidate();
  const updated = updateCandidate(current.id, partial);
  if (!updated) {
    throw new Error("NOT_FOUND");
  }
  return updated;
}

// Re‑export basic data helpers so route handlers and server components
// share a single surface that can be swapped for a real backend later.
export {
  listJobs,
  getJobById,
  createApplication,
  listApplicationsForCandidate,
  getApplicationById
};

export type { CandidateProfile, Job, Application };
