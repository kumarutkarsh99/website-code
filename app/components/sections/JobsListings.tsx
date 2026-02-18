"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin, Clock, DollarSign, ChevronDown } from "lucide-react";
import Link from "next/link";

/* ===========================
   TYPES
=========================== */

interface Job {
  id: number;
  title: string;
  company_name: string;
  location: string;
  employment_type: string;
  work_mode: string;
  description: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  is_featured: boolean;
  skills: string[] | null;
  created_at: string;
  updated_at: string;
}

interface JobsResponse {
  data: Job[];
  total: number;
  page: number;
  limit: number;
}

interface JobSectionProps {
  data?: unknown;
}

/* ===========================
   COMPONENT
=========================== */

const JobListings: React.FC<JobSectionProps> = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const [page, setPage] = useState(1);
  const jobsPerPage = 6;

  /* ===========================
     FETCH JOBS
  =========================== */

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://72.61.229.100:3001/jobs");

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const result: JobsResponse = await res.json();

        setJobs(result.data ?? []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ===========================
     FILTER + SORT
  =========================== */

  const processedJobs = useMemo(() => {
    let filtered = [...jobs];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company_name.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query),
      );
    }

    // Sort
    switch (sortBy) {
      case "recent":
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;

      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;

      case "salary_high":
        filtered.sort((a, b) => (b.salary_max ?? 0) - (a.salary_max ?? 0));
        break;

      case "salary_low":
        filtered.sort((a, b) => (a.salary_min ?? 0) - (b.salary_min ?? 0));
        break;
    }

    return filtered;
  }, [jobs, searchQuery, sortBy]);

  /* ===========================
     PAGINATION
  =========================== */

  const totalPages = Math.ceil(processedJobs.length / jobsPerPage) || 1;

  const currentJobs = processedJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage,
  );

  /* ===========================
     HELPERS
  =========================== */

  const formatSalary = (
    min?: number,
    max?: number,
    currency?: string,
  ): string => {
    if (!min || !max) return "Not disclosed";
    return `${currency ?? ""} ${min}k - ${max}k`;
  };

  const formatDate = (date?: string): string => {
    if (!date) return "";

    const created = new Date(date);
    const now = new Date();

    const diffDays = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";

    return `${diffDays} days ago`;
  };

  /* Reset page on filter change */

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy]);

  /* ===========================
     UI
  =========================== */

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-10 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-700">
                  Latest Job Openings
                </h2>

                {!loading && (
                  <p className="text-gray-500 text-sm mt-1">
                    Page {page} of {totalPages}
                  </p>
                )}
              </div>

              {/* SORT */}
              <div className="relative w-56">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
      w-full
      appearance-none
      px-4 pr-10 py-2.5
      rounded-xl
      border border-gray-300
      bg-white
      text-sm font-medium text-gray-700
      shadow-sm
      transition-all duration-200
      hover:border-gray-400
      focus:outline-none
      focus:ring-2 focus:ring-blue-500/20
      focus:border-blue-500
      cursor-pointer
    "
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                  <option value="salary_high">Salary High → Low</option>
                  <option value="salary_low">Salary Low → High</option>
                </select>

                <ChevronDown className="absolute right-3 top-1/2 -translate-y-4/5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl text-gray-700"
            />
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-10 text-gray-700">
              Loading jobs...
            </div>
          )}

          {/* EMPTY */}
          {!loading && currentJobs.length === 0 && (
            <div className="text-center py-10 text-gray-700">No jobs found</div>
          )}

          {/* JOB LIST */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <Card
                key={job.id}
                className={`group relative rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  job.is_featured
                    ? "border-emerald-300 bg-emerald-50/40"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* Featured Badge */}
                {job.is_featured && (
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-sm px-4 py-1 rounded-full flex items-center gap-1">
                    ⭐ Featured
                  </div>
                )}

                <CardContent className="p-6 space-y-4">
                  {/* Title + Remote */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition">
                        {job.title}
                      </h3>

                      <p className="text-emerald-600 font-semibold mt-1">
                        {job.company_name}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    {job.location}
                  </div>

                  {/* Employment + Salary */}
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      {job.employment_type}
                    </div>

                    <div className="flex items-center gap-2 font-medium text-emerald-700">
                      <DollarSign className="w-4 h-4" />
                      {formatSalary(
                        job.salary_min,
                        job.salary_max,
                        job.currency,
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {job.description}
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xs text-gray-500">
                      {formatDate(job.created_at)}
                    </span>

                    <div className="flex gap-3">
                      <Link href={`/jobseekers`}>
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-lg shadow cursor-pointer"
                        >
                          Apply Now
                        </Button>
                      </Link>

                      <Link href={`/jobs/${job.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-emerald-600 text-emerald-600 bg-emerald-50 hover:bg-white px-5 rounded-lg cursor-pointer"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
