"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin, Clock, DollarSign, ChevronDown, Search } from "lucide-react";
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

/* ===========================
   COMPONENT
=========================== */

const JobListings: React.FC = () => {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔎 Search
  const [searchQuery, setSearchQuery] = useState("");

  // 🔽 Sort
  const [sortBy, setSortBy] = useState("recent");

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const jobsPerPage = 6;

  /* ===========================
     FETCH
  =========================== */

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://72.61.229.100:3001/jobs");
        const result: JobsResponse = await res.json();
        setAllJobs(result.data ?? []);
      } catch (err) {
        console.error(err);
        setAllJobs([]);
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
    let jobs = [...allJobs];

    // 🔍 Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company_name.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query),
      );
    }

    // 🔽 Sorting
    switch (sortBy) {
      case "recent":
        jobs.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;

      case "oldest":
        jobs.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;

      case "salary_high":
        jobs.sort((a, b) => (b.salary_max ?? 0) - (a.salary_max ?? 0));
        break;

      case "salary_low":
        jobs.sort((a, b) => (a.salary_min ?? 0) - (b.salary_min ?? 0));
        break;
    }

    return jobs;
  }, [allJobs, searchQuery, sortBy]);

  /* ===========================
     PAGINATION
  =========================== */

  const totalPages = Math.max(1, Math.ceil(processedJobs.length / jobsPerPage));

  const startIndex = (page - 1) * jobsPerPage;
  const currentJobs = processedJobs.slice(startIndex, startIndex + jobsPerPage);

  /* ===========================
     HELPERS
  =========================== */

  const formatSalary = (min?: number, max?: number, currency?: string) => {
    if (!min || !max) return "Not disclosed";
    return `${currency ?? ""} ${min}k - ${max}k`;
  };

  const formatDate = (date?: string) => {
    if (!date) return "";
    const created = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    const days = Math.floor(diff);
    if (days <= 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  /* ===========================
     RESET PAGE WHEN FILTERING
  =========================== */

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy]);

  /* ===========================
     RENDER
  =========================== */

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          {/* ================= HEADER ================= */}
          <div className="mb-10 space-y-6">
            {/* ROW 1 — Title + Sort */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Latest Job Openings
                </h2>

                {!loading && (
                  <p className="text-gray-500 text-sm mt-1">
                    Page {page} of {totalPages}
                  </p>
                )}
              </div>

              {/* PREMIUM SORT DROPDOWN */}
              <div className="relative w-56">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
          w-full
          appearance-none
          px-4 py-2.5
          rounded-xl
          border border-gray-200
          bg-white
          text-sm font-medium text-gray-700
          shadow-sm
          transition-all duration-200
          focus:outline-none
          focus:ring-2 focus:ring-emerald-500
          focus:border-emerald-500
          hover:border-gray-300
          cursor-pointer
        "
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                  <option value="salary_high">Salary: High to Low</option>
                  <option value="salary_low">Salary: Low to High</option>
                </select>

                {/* Custom Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* ROW 2 — PREMIUM SEARCH BAR */}
            <div className="relative flex justify-center">
              <input
                type="text"
                placeholder="Search by title, company, or location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="
                w-full
        lg:w-[60vw]
        pl-12 pr-4 py-4
        rounded-2xl
        border border-gray-200
        bg-white
        text-sm
        text-gray-700
        shadow-md
        transition-all duration-300
        focus:outline-none
        focus:ring-2 focus:ring-emerald-500
        focus:border-emerald-500
        hover:border-gray-300
        focus:text-gray-700
        
      "
              />
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-12 text-gray-500">
              Fetching jobs...
            </div>
          )}

          {/* EMPTY */}
          {!loading && currentJobs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No jobs found.
            </div>
          )}

          {/* JOB GRID */}
          {!loading && currentJobs.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`relative bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      job.is_featured
                        ? "border-emerald-200 ring-2 ring-emerald-100"
                        : "border-gray-200"
                    }`}
                  >
                    {job.is_featured && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-tr-lg rounded-bl-lg">
                        ⭐ Featured
                      </div>
                    )}

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {job.title}
                          </h3>
                          {job.work_mode === "remote" && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              Remote
                            </Badge>
                          )}
                        </div>
                        <p className="text-emerald-600 font-semibold">
                          {job.company_name}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-emerald-500" />
                          {job.location}
                        </div>

                        <div className="flex justify-between">
                          <div className="flex gap-2">
                            <Clock className="h-4 w-4 text-emerald-500" />
                            {job.employment_type}
                          </div>

                          <div className="flex gap-2">
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                            {formatSalary(
                              job.salary_min,
                              job.salary_max,
                              job.currency,
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-3">
                        {job.description}
                      </p>

                      <div className="pt-3 border-t flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {formatDate(job.created_at)}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link
                              href="/jobseekers"
                              className="text-emerald-600 bg-white"
                            >
                              Apply
                            </Link>
                          </Button>

                          <Button
                            size="sm"
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                            asChild
                          >
                            <Link href="/jobseekers">View</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-10">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
