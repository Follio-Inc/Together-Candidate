"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/types";

type Filters = {
  roleCategory: "all" | "engineering" | "design" | "product" | "other";
  locationType: "all" | "remote" | "hybrid" | "onsite";
  seniority: "all" | "junior" | "mid" | "senior";
};

const defaultFilters: Filters = {
  roleCategory: "all",
  locationType: "all",
  seniority: "all"
};

export function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = React.useState<Filters>(() => {
    return {
      roleCategory:
        (searchParams.get("roleCategory") as Filters["roleCategory"]) ??
        "all",
      locationType:
        (searchParams.get("locationType") as Filters["locationType"]) ?? "all",
      seniority:
        (searchParams.get("seniority") as Filters["seniority"]) ?? "all"
    };
  });

  const filteredJobs = React.useMemo(() => {
    return initialJobs.filter((job) => {
      if (filters.roleCategory !== "all" && job.roleCategory !== filters.roleCategory) {
        return false;
      }
      if (filters.locationType !== "all" && job.locationType !== filters.locationType) {
        return false;
      }
      if (filters.seniority !== "all" && job.seniority !== filters.seniority) {
        return false;
      }
      return true;
    });
  }, [filters, initialJobs]);

  const handleFilterChange = (key: keyof Filters, value: Filters[typeof key]) => {
    const next = { ...filters, [key]: value };
    setFilters(next);

    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Open roles
          </h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Curated opportunities from Together customers. Filter by craft,
            location, and level.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Updated live from partner teams
        </div>
      </div>

      <GlassCard className="p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <Select
            label="Role"
            value={filters.roleCategory}
            onChange={(e) =>
              handleFilterChange("roleCategory", e.target.value as Filters["roleCategory"])
            }
          >
            <option value="all">All roles</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="product">Product</option>
            <option value="other">Other</option>
          </Select>
          <Select
            label="Location"
            value={filters.locationType}
            onChange={(e) =>
              handleFilterChange("locationType", e.target.value as Filters["locationType"])
            }
          >
            <option value="all">Any location</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </Select>
          <Select
            label="Seniority"
            value={filters.seniority}
            onChange={(e) =>
              handleFilterChange("seniority", e.target.value as Filters["seniority"])
            }
          >
            <option value="all">Any level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
          </Select>
        </div>
      </GlassCard>

      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <GlassCard className="p-6 text-sm text-slate-600">
            No roles match these filters yet. Try broadening your search.
          </GlassCard>
        ) : (
          filteredJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="block focus-visible:outline-none">
              <GlassCard className="glass-hover p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                        {job.title}
                      </h2>
                      <span className="text-xs text-slate-500">•</span>
                      <p className="text-xs font-medium text-slate-700">
                        {job.companyName}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="capitalize">{job.locationType}</span>
                      <span>•</span>
                      <span className="capitalize">{job.seniority}-level</span>
                      {job.salaryRange ? (
                        <>
                          <span>•</span>
                          <span>
                            {job.salaryRange.currency}{" "}
                            {Math.round(job.salaryRange.min / 1000)}k–{Math.round(job.salaryRange.max / 1000)}k
                          </span>
                        </>
                      ) : null}
                    </div>
                    <p className="mt-1 max-w-2xl text-xs text-slate-600">
                      {job.shortDescription}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {job.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="subtle">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-3 sm:flex-col sm:items-end sm:justify-between">
                    <div className="text-right text-[11px] text-slate-500">
                      <p>AI fit scoring included</p>
                      <p>See your match before you apply.</p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/jobs/${job.id}`);
                      }}
                    >
                      View role
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

