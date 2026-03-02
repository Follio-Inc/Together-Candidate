import { listJobs } from "@/lib/auth";
import { JobsClient } from "./JobsClient";

export default async function JobsPage() {
  const jobs = listJobs();
  return <JobsClient initialJobs={jobs} />;
}

