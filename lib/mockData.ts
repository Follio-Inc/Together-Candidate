import { Application, CandidateProfile, FitExplanation, Job } from "./types";

let candidates = new Map<string, CandidateProfile>();
let jobs = new Map<string, Job>();
let applications = new Map<string, Application>();

// Simple incremental ids for demo
let candidateCounter = 1;
let applicationCounter = 1;

function bootstrapJobs() {
  if (jobs.size > 0) return;
  const now = new Date().toISOString();

  const seed: Job[] = [
    {
      id: "job-1",
      title: "Senior Full-Stack Engineer",
      companyName: "Northwind Labs",
      location: "San Francisco, CA",
      locationType: "hybrid",
      salaryRange: {
        min: 190000,
        max: 230000,
        currency: "USD"
      },
      roleCategory: "engineering",
      seniority: "senior",
      tags: ["TypeScript", "React", "Postgres"],
      shortDescription:
        "Shape the product surface for a fast-growing B2B SaaS platform.",
      overview:
        "As a Senior Full-Stack Engineer at Northwind Labs, you will own end-to-end product verticals, from discovery to rollout. You’ll work closely with design and product to ship thoughtful experiences that feel polished and reliable.",
      responsibilities: [
        "Own major product surfaces end-to-end across the stack.",
        "Collaborate closely with product and design on discovery and delivery.",
        "Raise the bar on code quality, observability, and reliability.",
        "Mentor other engineers and contribute to engineering culture."
      ],
      requirements: [
        "5+ years of professional experience shipping production software.",
        "Deep experience with TypeScript, React, and Node/Next.js.",
        "Experience designing and scaling relational data models.",
        "Thoughtful communication and product instincts."
      ],
      aboutCompany:
        "Northwind Labs builds tools for go-to-market teams who care about craft. Small, senior team with a bias for ownership and long-term thinking.",
      requiredSkills: [
        "typescript",
        "react",
        "next.js",
        "node.js",
        "postgresql",
        "system design"
      ],
      createdAt: now
    },
    {
      id: "job-2",
      title: "Product Designer",
      companyName: "Aurora Systems",
      location: "Remote (US)",
      locationType: "remote",
      salaryRange: {
        min: 150000,
        max: 185000,
        currency: "USD"
      },
      roleCategory: "design",
      seniority: "mid",
      tags: ["Product design", "B2B", "Design systems"],
      shortDescription:
        "Design the workflows and systems that power modern analytics teams.",
      overview:
        "You’ll lead design for a core product area, from research and discovery to prototypes and polished UI. You love systems thinking, UI craft, and partnering with engineering.",
      responsibilities: [
        "Own design for a major product surface, partnering with PM and Eng.",
        "Create flows, wireframes, and high-fidelity UI for new features.",
        "Maintain and extend Aurora’s design system.",
        "Conduct lightweight research and synthesize insights into clear artifacts."
      ],
      requirements: [
        "3+ years of product design experience.",
        "Strong interaction and visual design craft.",
        "Experience with complex or technical products.",
        "Comfort working end-to-end in a small team."
      ],
      aboutCompany:
        "Aurora Systems builds decision support tools for data-forward companies. We care deeply about clarity, calm interfaces, and considered defaults.",
      requiredSkills: [
        "product design",
        "figma",
        "design systems",
        "interaction design",
        "user research"
      ],
      createdAt: now
    },
    {
      id: "job-3",
      title: "Product Manager",
      companyName: "Meridian Capital",
      location: "New York, NY",
      locationType: "onsite",
      salaryRange: {
        min: 175000,
        max: 210000,
        currency: "USD"
      },
      roleCategory: "product",
      seniority: "mid",
      tags: ["Fintech", "Strategy", "Stakeholder management"],
      shortDescription:
        "Drive product strategy for a new platform connecting capital allocators and founders.",
      overview:
        "You’ll define and ship new products that help investors and founders collaborate more transparently. This role is highly cross-functional and narrative-driven.",
      responsibilities: [
        "Own product strategy and roadmap for a new initiative.",
        "Partner with leadership, GTM, and engineering to define scope.",
        "Translate ambiguous problems into crisp specs and experiments.",
        "Measure impact and iterate with a bias for thoughtful speed."
      ],
      requirements: [
        "3–6 years in product management or founder/operator roles.",
        "Experience in fintech or B2B SaaS is a plus.",
        "Strength in communication and narrative craft.",
        "Comfort navigating ambiguity and senior stakeholders."
      ],
      aboutCompany:
        "Meridian Capital is a modern investment firm building connective tissue between LPs, GPs, and founders. Small, high-context team with a long-term view.",
      requiredSkills: [
        "product management",
        "stakeholder management",
        "experimentation",
        "analytics",
        "roadmapping"
      ],
      createdAt: now
    }
  ];

  for (const job of seed) {
    jobs.set(job.id, job);
  }
}

bootstrapJobs();

export function listJobs(filters?: {
  roleCategory?: string;
  locationType?: string;
  seniority?: string;
}): Job[] {
  const all = Array.from(jobs.values());
  if (!filters) return all;

  return all.filter((job) => {
    if (filters.roleCategory && filters.roleCategory !== "all") {
      if (job.roleCategory !== filters.roleCategory) return false;
    }
    if (filters.locationType && filters.locationType !== "all") {
      if (job.locationType !== filters.locationType) return false;
    }
    if (filters.seniority && filters.seniority !== "all") {
      if (job.seniority !== filters.seniority) return false;
    }
    return true;
  });
}

export function getJobById(id: string): Job | undefined {
  return jobs.get(id);
}

export function createCandidate(input: {
  name: string;
  email: string;
}): CandidateProfile {
  const id = `cand-${candidateCounter++}`;
  const now = new Date().toISOString();
  const candidate: CandidateProfile = {
    id,
    name: input.name,
    email: input.email.toLowerCase(),
    skills: [],
    createdAt: now,
    updatedAt: now
  };
  candidates.set(id, candidate);
  return candidate;
}

export function findCandidateByEmail(email: string): CandidateProfile | null {
  const normalized = email.toLowerCase();
  for (const cand of candidates.values()) {
    if (cand.email === normalized) return cand;
  }
  return null;
}

export function getCandidateById(id: string): CandidateProfile | null {
  return candidates.get(id) ?? null;
}

export function updateCandidate(
  id: string,
  partial: Partial<CandidateProfile>
): CandidateProfile | null {
  const existing = candidates.get(id);
  if (!existing) return null;
  const updated: CandidateProfile = {
    ...existing,
    ...partial,
    id: existing.id,
    email: existing.email,
    updatedAt: new Date().toISOString()
  };
  candidates.set(id, updated);
  return updated;
}

export function createFitExplanation(params: {
  candidate: CandidateProfile;
  job: Job;
}): FitExplanation {
  const candidateSkills = new Set(
    params.candidate.skills.map((s) => s.toLowerCase())
  );
  const requiredSkills = params.job.requiredSkills.map((s) => s.toLowerCase());

  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of requiredSkills) {
    if (candidateSkills.has(skill)) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  const coverage =
    requiredSkills.length === 0
      ? 0
      : (matched.length / requiredSkills.length) * 100;

  let baseScore = 40 + coverage * 0.6;
  baseScore = Math.max(20, Math.min(98, Math.round(baseScore)));

  const strengths: string[] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];

  if (matched.length > 0) {
    strengths.push(
      `Strong overlap with core skills: ${matched
        .slice(0, 5)
        .map((s) => `\`${s}\``)
        .join(", ")}.`
    );
  } else {
    strengths.push(
      "Background may be adjacent to this role; focus on transferable skills."
    );
  }

  if (missing.length > 0) {
    gaps.push(
      `Limited depth in ${missing
        .slice(0, 4)
        .map((s) => `\`${s}\``)
        .join(", ")} based on your current profile.`
    );
    recommendations.push(
      "Consider adding concrete examples of projects that use the highlighted skills."
    );
  }

  if (params.candidate.experienceLevel && params.job.seniority) {
    if (params.candidate.experienceLevel === "junior" && params.job.seniority === "senior") {
      baseScore = Math.max(25, baseScore - 15);
      gaps.push(
        "Role expects senior-level ownership; highlight any end-to-end projects or leadership experience."
      );
    }
    if (params.candidate.experienceLevel === "senior" && params.job.seniority === "junior") {
      recommendations.push(
        "Role may be earlier in career; clarify why this scope and level are a deliberate fit for you."
      );
    }
  }

  const summary =
    baseScore >= 75
      ? "Strong fit overall. Your experience and skills line up closely with what this team is hiring for."
      : baseScore >= 55
      ? "Promising but mixed fit. You align on several key areas with clear opportunities to deepen specific skills."
      : "More exploratory fit. This could work if you lean on adjacent experience and show a strong learning curve.";

  if (recommendations.length === 0) {
    recommendations.push(
      "Tailor your resume and \"Why you\" answer to mirror the language and focus areas in this description."
    );
  }

  return {
    score: baseScore,
    summary,
    strengths,
    gaps,
    recommendations
  };
}

export function createApplication(params: {
  candidate: CandidateProfile;
  job: Job;
  resumeUrl?: string;
  whyYou?: string;
}): Application {
  const id = `app-${applicationCounter++}`;
  const now = new Date().toISOString();
  const fit = createFitExplanation({ candidate: params.candidate, job: params.job });

  const app: Application = {
    id,
    jobId: params.job.id,
    candidateId: params.candidate.id,
    createdAt: now,
    updatedAt: now,
    stage: "applied",
    resumeUrl: params.resumeUrl,
    whyYou: params.whyYou,
    fit
  };

  applications.set(id, app);
  return app;
}

export function listApplicationsForCandidate(candidateId: string): Application[] {
  return Array.from(applications.values()).filter(
    (app) => app.candidateId === candidateId
  );
}

export function getApplicationById(id: string): Application | null {
  return applications.get(id) ?? null;
}
