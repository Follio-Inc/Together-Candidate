import { Suspense } from "react";
import { listJobs } from "@/lib/auth";
import { JobsClient } from "./JobsClient";

function JobsClientWrapper() {
  const jobs = listJobs();
  return <JobsClient initialJobs={jobs} />;
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-sm text-slate-600">
          Loading roles…
        </div>
      }
    >
      <JobsClientWrapper />
    </Suspense>
  );
}


