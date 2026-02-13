"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin, Clock, DollarSign, ChevronDown } from "lucide-react";

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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(6);
  const [total, setTotal] = useState<number>(0);

  const totalPages = Math.ceil(total / limit);

  /* ===========================
     FETCH DATA
  =========================== */

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://72.61.229.100:3001/jobs?page=${page}&limit=${limit}`,
        );

        const data: JobsResponse = await res.json();

        setJobs(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, limit]);

  /* ===========================
     HELPERS
  =========================== */

  const formatSalary = (min: number, max: number, currency: string): string => {
    if (!min || !max) return "Not disclosed";
    return `${currency} ${min}k - ${max}k`;
  };

  const formatDate = (date: string): string => {
    const created = new Date(date);
    const now = new Date();

    const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

    const days = Math.floor(diff);

    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  /* ===========================
     RENDER
  =========================== */

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Latest Job Openings
              </h2>
              <p className="text-gray-600">
                {loading
                  ? "Loading..."
                  : `Showing page ${page} of ${totalPages}`}
              </p>
            </div>

            <Button variant="outline">
              Sort by: Most Recent
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12 text-gray-500">
              Fetching jobs...
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`relative bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      job.is_featured
                        ? "border-emerald-200 ring-2 ring-emerald-100"
                        : "border-gray-200"
                    }`}
                  >
                    {job.is_featured && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
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

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-emerald-500" />
                            {job.employment_type}
                          </div>

                          <div className="flex items-center gap-2">
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
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Apply
                          </Button>

                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* ===========================
                 PAGINATION CONTROLS
              =========================== */}

              <div className="flex justify-center items-center gap-4 mt-10">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <span className="text-sm font-medium">
                  Page {page} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
