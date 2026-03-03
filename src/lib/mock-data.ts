import {
  type Company,
  type Job,
  type CandidateProfile,
  type Application,
  type FitScore,
} from "./types";

export const companies: Company[] = [
  {
    id: "co-1",
    name: "Luminary AI",
    logo: "/logos/luminary.svg",
    industry: "Artificial Intelligence",
    size: "50-200",
    description:
      "Luminary AI builds next-generation language models that power creative tools for millions of users worldwide.",
    website: "https://luminary.ai",
  },
  {
    id: "co-2",
    name: "Verdant Health",
    logo: "/logos/verdant.svg",
    industry: "Healthcare Technology",
    size: "200-500",
    description:
      "Verdant Health is transforming patient outcomes through AI-powered diagnostics and personalized treatment plans.",
    website: "https://verdanthealth.com",
  },
  {
    id: "co-3",
    name: "Horizon Finance",
    logo: "/logos/horizon.svg",
    industry: "Fintech",
    size: "100-300",
    description:
      "Horizon Finance makes wealth management accessible to everyone through intelligent automation and beautiful design.",
    website: "https://horizonfinance.io",
  },
  {
    id: "co-4",
    name: "Canopy Studio",
    logo: "/logos/canopy.svg",
    industry: "Design Tools",
    size: "20-50",
    description:
      "Canopy Studio creates collaborative design tools that help teams bring ideas to life faster than ever.",
    website: "https://canopystudio.design",
  },
  {
    id: "co-5",
    name: "Atlas Logistics",
    logo: "/logos/atlas.svg",
    industry: "Supply Chain",
    size: "500-1000",
    description:
      "Atlas Logistics optimizes global supply chains using real-time data, ML predictions, and autonomous routing systems.",
    website: "https://atlaslogistics.com",
  },
];

export const jobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: companies[0],
    roleType: "engineering",
    locationType: "remote",
    location: "Remote (US)",
    seniority: "senior",
    salaryMin: 160000,
    salaryMax: 210000,
    currency: "USD",
    description:
      "Join Luminary AI's product team to build the next generation of creative AI tools. You'll work on complex React applications that serve millions of users, collaborating with designers and ML engineers to ship features that push the boundaries of what's possible in the browser.",
    responsibilities: [
      "Architect and build performant React applications with TypeScript",
      "Collaborate with design and ML teams on new AI-powered features",
      "Mentor junior engineers and establish frontend best practices",
      "Drive technical decisions on tooling, testing, and architecture",
      "Optimize application performance for millions of concurrent users",
    ],
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with design systems and component libraries",
      "Familiarity with CI/CD pipelines and testing frameworks",
      "Excellent communication and collaboration skills",
    ],
    niceToHave: [
      "Experience with WebGL, Canvas, or other creative web technologies",
      "Background in AI/ML or working with ML-powered features",
      "Contributions to open-source projects",
    ],
    benefits: [
      "Fully remote with quarterly team offsites",
      "Unlimited PTO with minimum 3 weeks encouraged",
      "Premium health, dental, and vision insurance",
      "$5,000 annual learning & development budget",
      "Home office setup stipend",
    ],
    tags: ["React", "TypeScript", "AI/ML", "Remote", "Senior"],
    postedAt: "2026-02-15T00:00:00Z",
    isActive: true,
  },
  {
    id: "job-2",
    title: "Product Designer",
    company: companies[3],
    roleType: "design",
    locationType: "hybrid",
    location: "San Francisco, CA (Hybrid)",
    seniority: "mid",
    salaryMin: 130000,
    salaryMax: 170000,
    currency: "USD",
    description:
      "Canopy Studio is looking for a product designer who loves craft and cares deeply about user experience. You'll own the design of key product areas, from research and ideation through to polished UI and interaction design.",
    responsibilities: [
      "Own end-to-end design for major product features",
      "Conduct user research, usability testing, and data analysis",
      "Create wireframes, prototypes, and high-fidelity designs in Figma",
      "Collaborate closely with engineering to ensure design fidelity",
      "Contribute to and evolve our design system",
    ],
    requirements: [
      "3+ years of product design experience at a tech company",
      "Strong portfolio demonstrating UX thinking and visual design skills",
      "Proficiency in Figma and modern prototyping tools",
      "Experience designing for both web and mobile platforms",
      "Ability to articulate design decisions to stakeholders",
    ],
    niceToHave: [
      "Experience with design tools or creative software",
      "Familiarity with front-end development (HTML/CSS/JS)",
      "Motion design or illustration skills",
    ],
    benefits: [
      "Hybrid schedule: 3 days in SF office, 2 remote",
      "Competitive equity package for early-stage startup",
      "Full health benefits from day one",
      "Annual design conference budget",
      "Weekly team lunches and monthly outings",
    ],
    tags: ["Figma", "UX", "Design Systems", "Hybrid", "Mid-level"],
    postedAt: "2026-02-20T00:00:00Z",
    isActive: true,
  },
  {
    id: "job-3",
    title: "Staff Backend Engineer",
    company: companies[2],
    roleType: "engineering",
    locationType: "remote",
    location: "Remote (Global)",
    seniority: "lead",
    salaryMin: 190000,
    salaryMax: 260000,
    currency: "USD",
    description:
      "Horizon Finance is building the infrastructure that powers next-generation wealth management. As a Staff Backend Engineer, you'll design and build the core financial systems that process billions of dollars in transactions.",
    responsibilities: [
      "Design and implement scalable microservices architecture",
      "Build real-time transaction processing pipelines",
      "Establish engineering standards and code review practices",
      "Lead technical design discussions and architecture reviews",
      "Partner with product and compliance teams on financial regulations",
    ],
    requirements: [
      "8+ years of backend engineering experience",
      "Deep expertise in distributed systems and event-driven architecture",
      "Experience with Go, Rust, or similar systems languages",
      "Understanding of financial systems and regulatory requirements",
      "Track record of leading technical initiatives across teams",
    ],
    niceToHave: [
      "Previous fintech or banking experience",
      "Experience with Kubernetes and cloud-native infrastructure",
      "Knowledge of blockchain or DeFi technologies",
    ],
    benefits: [
      "Fully remote with no location-based salary adjustments",
      "Significant equity stake in a fast-growing fintech",
      "Premium global health insurance",
      "4-day work week (Fridays off)",
      "$10,000 annual professional development budget",
    ],
    tags: ["Go", "Distributed Systems", "Fintech", "Remote", "Staff"],
    postedAt: "2026-02-10T00:00:00Z",
    isActive: true,
  },
  {
    id: "job-4",
    title: "Product Manager, Growth",
    company: companies[1],
    roleType: "product",
    locationType: "onsite",
    location: "Boston, MA",
    seniority: "senior",
    salaryMin: 150000,
    salaryMax: 195000,
    currency: "USD",
    description:
      "Verdant Health is seeking a senior product manager to lead our growth initiatives. You'll be responsible for driving user acquisition, activation, and retention across our healthcare platform.",
    responsibilities: [
      "Define and execute the growth product roadmap",
      "Analyze funnel metrics and identify optimization opportunities",
      "Design and run A/B tests to improve conversion rates",
      "Collaborate with marketing, engineering, and data science teams",
      "Present growth results and strategy to executive leadership",
    ],
    requirements: [
      "5+ years of product management experience with a focus on growth",
      "Strong analytical skills and experience with data-driven decision making",
      "Experience with experimentation platforms and A/B testing",
      "Understanding of healthcare or regulated industry dynamics",
      "Excellent stakeholder management and communication skills",
    ],
    niceToHave: [
      "Healthcare industry experience",
      "Technical background (CS degree or engineering experience)",
      "Experience at a high-growth startup (Series B+)",
    ],
    benefits: [
      "On-site in a beautiful Boston office with harbor views",
      "Top-tier health insurance (fitting for a health company!)",
      "Generous parental leave (20 weeks)",
      "401k with 6% match",
      "Monthly wellness stipend",
    ],
    tags: ["Growth", "Analytics", "Healthcare", "On-site", "Senior"],
    postedAt: "2026-02-25T00:00:00Z",
    isActive: true,
  },
  {
    id: "job-5",
    title: "Data Engineer",
    company: companies[4],
    roleType: "data",
    locationType: "remote",
    location: "Remote (US/EU)",
    seniority: "mid",
    salaryMin: 140000,
    salaryMax: 180000,
    currency: "USD",
    description:
      "Atlas Logistics processes petabytes of supply chain data daily. We need a data engineer who can build and maintain the pipelines that turn raw logistics data into actionable intelligence for our customers.",
    responsibilities: [
      "Design and build data pipelines processing petabytes of daily data",
      "Optimize data warehouse architecture for query performance",
      "Implement data quality monitoring and alerting systems",
      "Collaborate with data science team on ML feature pipelines",
      "Maintain and improve our real-time streaming infrastructure",
    ],
    requirements: [
      "3+ years of data engineering experience",
      "Strong SQL skills and experience with data warehouses (Snowflake, BigQuery)",
      "Experience with Apache Spark, Kafka, or similar technologies",
      "Proficiency in Python and/or Scala",
      "Understanding of data modeling and ETL best practices",
    ],
    niceToHave: [
      "Experience with supply chain or logistics data",
      "Knowledge of dbt or similar transformation tools",
      "Experience with real-time streaming systems",
    ],
    benefits: [
      "Remote-first culture with async communication",
      "Competitive salary with annual performance bonuses",
      "Full benefits package including mental health support",
      "Home office budget and ergonomic setup",
      "Sabbatical program after 3 years",
    ],
    tags: ["Python", "Spark", "Kafka", "Data", "Remote"],
    postedAt: "2026-03-01T00:00:00Z",
    isActive: true,
  },
  {
    id: "job-6",
    title: "Junior Full-Stack Developer",
    company: companies[0],
    roleType: "engineering",
    locationType: "hybrid",
    location: "New York, NY (Hybrid)",
    seniority: "junior",
    salaryMin: 95000,
    salaryMax: 125000,
    currency: "USD",
    description:
      "Kick-start your career at Luminary AI! We're looking for a motivated junior full-stack developer to join our platform team. You'll learn from senior engineers while shipping real features to production.",
    responsibilities: [
      "Build features across the full stack (React + Node.js)",
      "Write clean, tested, and well-documented code",
      "Participate in code reviews and engineering discussions",
      "Help maintain and improve our internal tools",
      "Learn and grow through pairing and mentorship",
    ],
    requirements: [
      "0-2 years of professional development experience",
      "Familiarity with React, TypeScript, and Node.js",
      "Understanding of REST APIs and databases",
      "Strong desire to learn and grow as an engineer",
      "CS degree or equivalent practical experience",
    ],
    niceToHave: [
      "Personal projects or open-source contributions",
      "Familiarity with cloud services (AWS/GCP)",
      "Interest in AI/ML technologies",
    ],
    benefits: [
      "Structured mentorship program with senior engineers",
      "Hybrid: 2 days in NYC office, 3 remote",
      "Full health and dental coverage",
      "Learning stipend for courses and books",
      "Regular hackathons and innovation days",
    ],
    tags: ["React", "Node.js", "TypeScript", "Junior", "Hybrid"],
    postedAt: "2026-02-28T00:00:00Z",
    isActive: true,
  },
  {
    id: "job-7",
    title: "DevOps Engineer",
    company: companies[4],
    roleType: "devops",
    locationType: "remote",
    location: "Remote (US)",
    seniority: "senior",
    salaryMin: 155000,
    salaryMax: 200000,
    currency: "USD",
    description:
      "Atlas Logistics runs a massive global infrastructure. We need a senior DevOps engineer to help us scale reliably, automate everything, and keep our platform running at 99.99% uptime.",
    responsibilities: [
      "Design and manage Kubernetes clusters across multiple cloud regions",
      "Build and maintain CI/CD pipelines for 50+ microservices",
      "Implement infrastructure as code using Terraform and Pulumi",
      "Lead incident response and post-mortem processes",
      "Optimize cloud costs while maintaining performance SLAs",
    ],
    requirements: [
      "5+ years of DevOps/SRE experience",
      "Expert-level Kubernetes and container orchestration skills",
      "Strong experience with AWS or GCP",
      "Proficiency in Terraform, Ansible, or similar IaC tools",
      "On-call experience and incident management",
    ],
    niceToHave: [
      "Experience at scale (1000+ nodes)",
      "Multi-cloud or hybrid cloud experience",
      "Background in networking or security",
    ],
    benefits: [
      "Remote-first with flexible hours",
      "Competitive on-call compensation",
      "Full benefits and generous equity",
      "Conference and certification budget",
      "Annual team retreat",
    ],
    tags: ["Kubernetes", "Terraform", "AWS", "DevOps", "Remote"],
    postedAt: "2026-02-18T00:00:00Z",
    isActive: true,
  },
  {
    id: "job-8",
    title: "Marketing Lead",
    company: companies[3],
    roleType: "marketing",
    locationType: "hybrid",
    location: "San Francisco, CA (Hybrid)",
    seniority: "senior",
    salaryMin: 140000,
    salaryMax: 185000,
    currency: "USD",
    description:
      "Canopy Studio is looking for a marketing lead to build our brand and drive adoption of our design tools. You'll own the marketing strategy from content to campaigns to community building.",
    responsibilities: [
      "Develop and execute comprehensive marketing strategy",
      "Build and manage content marketing and social media presence",
      "Plan and run product launches and feature announcements",
      "Grow and engage our designer community",
      "Track and optimize marketing metrics and ROI",
    ],
    requirements: [
      "5+ years of marketing experience in B2B SaaS or dev tools",
      "Proven track record of building brand awareness",
      "Experience with content marketing, SEO, and paid acquisition",
      "Strong writing and communication skills",
      "Data-driven approach to marketing decisions",
    ],
    niceToHave: [
      "Experience marketing design or creative tools",
      "Personal brand or following in the design community",
      "Experience with PLG (product-led growth) strategies",
    ],
    benefits: [
      "Hybrid schedule with SF office perks",
      "Early-stage equity with significant upside",
      "Full benefits from day one",
      "Marketing tool and conference budget",
      "Creative freedom to build the brand your way",
    ],
    tags: ["B2B SaaS", "Content", "Brand", "Hybrid", "Senior"],
    postedAt: "2026-02-22T00:00:00Z",
    isActive: true,
  },
];

export const mockCandidate: CandidateProfile = {
  id: "cand-1",
  email: "alex.chen@example.com",
  name: "Alex Chen",
  location: "San Francisco, CA",
  experienceLevel: "senior",
  rolePreferences: ["engineering", "data"],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "AWS",
    "GraphQL",
    "Docker",
    "Next.js",
    "Tailwind CSS",
  ],
  portfolioUrl: "https://alexchen.dev",
  githubUrl: "https://github.com/alexchen",
  linkedinUrl: "https://linkedin.com/in/alexchen",
  resumeUrl: "/resumes/alex-chen.pdf",
  bio: "Full-stack engineer with 6 years of experience building scalable web applications. Passionate about developer tools and AI-powered products.",
  createdAt: "2026-01-15T00:00:00Z",
  updatedAt: "2026-02-28T00:00:00Z",
};

export function calculateFitScore(
  candidate: CandidateProfile,
  job: Job
): FitScore {
  const candidateSkillsLower = candidate.skills.map((s) => s.toLowerCase());
  const jobRequirements = [
    ...job.requirements,
    ...job.tags,
    ...job.niceToHave,
  ].map((r) => r.toLowerCase());

  const matchedSkills = candidateSkillsLower.filter((skill) =>
    jobRequirements.some((req) => req.includes(skill))
  );

  const roleMatch = candidate.rolePreferences.includes(job.roleType) ? 15 : 0;

  const seniorityMap: Record<string, number> = {
    junior: 1,
    mid: 2,
    senior: 3,
    lead: 4,
    executive: 5,
  };
  const seniorityDiff = Math.abs(
    seniorityMap[candidate.experienceLevel] - seniorityMap[job.seniority]
  );
  const seniorityScore = Math.max(0, 15 - seniorityDiff * 5);

  const skillScore = Math.min(
    50,
    (matchedSkills.length / Math.max(job.requirements.length, 1)) * 50
  );

  const overall = Math.min(
    100,
    Math.round(skillScore + roleMatch + seniorityScore + 10)
  );

  const strengths: { area: string; description: string; score: number }[] = [];
  const gaps: { area: string; description: string; score: number }[] = [];

  if (matchedSkills.length > 0) {
    strengths.push({
      area: "Technical Skills",
      description: `Strong match on ${matchedSkills.slice(0, 3).join(", ")}${matchedSkills.length > 3 ? ` and ${matchedSkills.length - 3} more` : ""}`,
      score: Math.round(skillScore),
    });
  }

  if (roleMatch > 0) {
    strengths.push({
      area: "Role Alignment",
      description: `Your preference for ${job.roleType} roles aligns perfectly with this position`,
      score: roleMatch,
    });
  }

  if (seniorityScore >= 10) {
    strengths.push({
      area: "Experience Level",
      description: `Your ${candidate.experienceLevel} experience level is a great match for this ${job.seniority} role`,
      score: seniorityScore,
    });
  }

  if (skillScore < 30) {
    gaps.push({
      area: "Skill Coverage",
      description:
        "Some required skills may need development or aren't reflected in your profile",
      score: Math.round(30 - skillScore),
    });
  }

  if (seniorityDiff > 1) {
    gaps.push({
      area: "Experience Gap",
      description: `This ${job.seniority} role may expect ${seniorityDiff > 0 ? "more" : "less"} experience than your current level`,
      score: seniorityDiff * 5,
    });
  }

  const recommendations: string[] = [];
  if (matchedSkills.length < 3) {
    recommendations.push(
      "Consider highlighting relevant projects or transferable skills in your application"
    );
  }
  if (seniorityDiff > 0) {
    recommendations.push(
      "Emphasize leadership experience and impact in previous roles"
    );
  }
  recommendations.push(
    "Tailor your cover note to address the specific responsibilities listed"
  );
  if (job.niceToHave.length > 0) {
    recommendations.push(
      `Mention any experience with: ${job.niceToHave.slice(0, 2).join(", ")}`
    );
  }

  const summary =
    overall >= 75
      ? "You're a strong match for this role. Your skills and experience align well with what the team is looking for."
      : overall >= 50
        ? "You're a good potential fit. There are some areas where you could strengthen your application."
        : "This role may be a stretch, but don't count yourself out — highlight transferable skills and passion for the domain.";

  return { overall, strengths, gaps, recommendations, summary };
}

export const mockApplications: Application[] = [
  {
    id: "app-1",
    candidateId: "cand-1",
    jobId: "job-1",
    job: jobs[0],
    coverNote:
      "I'm passionate about building AI-powered creative tools and have 6 years of experience with React and TypeScript at scale.",
    resumeUrl: "/resumes/alex-chen.pdf",
    stage: "interview",
    fitScore: calculateFitScore(mockCandidate, jobs[0]),
    appliedAt: "2026-02-18T10:30:00Z",
    updatedAt: "2026-02-28T14:00:00Z",
    timeline: [
      { stage: "applied", date: "2026-02-18T10:30:00Z" },
      {
        stage: "reviewing",
        date: "2026-02-20T09:00:00Z",
        note: "Application received and under review",
      },
      {
        stage: "shortlisted",
        date: "2026-02-24T11:00:00Z",
        note: "Shortlisted by hiring manager",
      },
      {
        stage: "interview",
        date: "2026-02-28T14:00:00Z",
        note: "Technical interview scheduled",
      },
    ],
  },
  {
    id: "app-2",
    candidateId: "cand-1",
    jobId: "job-3",
    job: jobs[2],
    coverNote:
      "While my primary experience is in frontend, I've built several backend services in Node.js and am eager to deepen my systems engineering skills.",
    resumeUrl: "/resumes/alex-chen.pdf",
    stage: "reviewing",
    fitScore: calculateFitScore(mockCandidate, jobs[2]),
    appliedAt: "2026-02-22T15:45:00Z",
    updatedAt: "2026-02-25T09:00:00Z",
    timeline: [
      { stage: "applied", date: "2026-02-22T15:45:00Z" },
      {
        stage: "reviewing",
        date: "2026-02-25T09:00:00Z",
        note: "Application is being reviewed",
      },
    ],
  },
  {
    id: "app-3",
    candidateId: "cand-1",
    jobId: "job-5",
    job: jobs[4],
    coverNote:
      "I have strong Python and SQL skills, and I'm excited about working with data at petabyte scale. My experience with AWS and Docker would be valuable here.",
    resumeUrl: "/resumes/alex-chen.pdf",
    stage: "shortlisted",
    fitScore: calculateFitScore(mockCandidate, jobs[4]),
    appliedAt: "2026-03-01T12:00:00Z",
    updatedAt: "2026-03-02T16:00:00Z",
    timeline: [
      { stage: "applied", date: "2026-03-01T12:00:00Z" },
      {
        stage: "reviewing",
        date: "2026-03-02T10:00:00Z",
        note: "Application received",
      },
      {
        stage: "shortlisted",
        date: "2026-03-02T16:00:00Z",
        note: "Moved to shortlist — skills look promising",
      },
    ],
  },
];
