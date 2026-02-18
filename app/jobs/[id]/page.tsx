"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { MapPin, Clock, DollarSign, Briefcase } from "lucide-react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/footer";

/* ===========================
   30 REALISTIC JOBS
=========================== */

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechNova Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "USD 120k – 150k",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Insight Analytics",
    location: "New York, NY",
    type: "Full-time",
    salary: "USD 110k – 140k",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "PixelCraft Studio",
    location: "Austin, TX",
    type: "Contract",
    salary: "USD 80k – 100k",
  },
  {
    id: 4,
    title: "Backend Engineer (Node.js)",
    company: "CloudBridge",
    location: "Remote",
    type: "Full-time",
    salary: "USD 115k – 145k",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "InfraCore Systems",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "USD 125k – 155k",
  },
  {
    id: 6,
    title: "Product Manager",
    company: "BrightPath Technologies",
    location: "Boston, MA",
    type: "Full-time",
    salary: "USD 105k – 135k",
  },
  {
    id: 7,
    title: "Mobile App Developer",
    company: "Appify Labs",
    location: "Remote",
    type: "Full-time",
    salary: "USD 100k – 130k",
  },
  {
    id: 8,
    title: "Cybersecurity Analyst",
    company: "SecureWave",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "USD 95k – 120k",
  },
  {
    id: 9,
    title: "AI/ML Engineer",
    company: "DeepLogic AI",
    location: "San Jose, CA",
    type: "Full-time",
    salary: "USD 130k – 170k",
  },
  {
    id: 10,
    title: "Full Stack Developer",
    company: "NextGen Software",
    location: "Denver, CO",
    type: "Full-time",
    salary: "USD 100k – 130k",
  },
  {
    id: 11,
    title: "HR Business Partner",
    company: "PeopleFirst Corp",
    location: "Atlanta, GA",
    type: "Full-time",
    salary: "USD 85k – 110k",
  },
  {
    id: 12,
    title: "Cloud Architect",
    company: "SkyHigh Cloud",
    location: "Remote",
    type: "Full-time",
    salary: "USD 140k – 180k",
  },
  {
    id: 13,
    title: "QA Automation Engineer",
    company: "TestSphere",
    location: "Phoenix, AZ",
    type: "Full-time",
    salary: "USD 90k – 115k",
  },
  {
    id: 14,
    title: "Business Analyst",
    company: "StratEdge Consulting",
    location: "Dallas, TX",
    type: "Full-time",
    salary: "USD 85k – 105k",
  },
  {
    id: 15,
    title: "Graphic Designer",
    company: "CreativeHive",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "USD 70k – 90k",
  },
  {
    id: 16,
    title: "Technical Writer",
    company: "DocuPro",
    location: "Remote",
    type: "Part-time",
    salary: "USD 60k – 80k",
  },
  {
    id: 17,
    title: "IT Support Specialist",
    company: "NetAssist",
    location: "Miami, FL",
    type: "Full-time",
    salary: "USD 55k – 75k",
  },
  {
    id: 18,
    title: "Blockchain Developer",
    company: "CryptoChain Labs",
    location: "Remote",
    type: "Full-time",
    salary: "USD 130k – 165k",
  },
  {
    id: 19,
    title: "Digital Marketing Manager",
    company: "GrowthSphere",
    location: "San Diego, CA",
    type: "Full-time",
    salary: "USD 90k – 120k",
  },
  {
    id: 20,
    title: "Systems Administrator",
    company: "CoreTech IT",
    location: "Houston, TX",
    type: "Full-time",
    salary: "USD 80k – 105k",
  },
  {
    id: 21,
    title: "Sales Executive",
    company: "PrimeSales Inc",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "USD 75k – 110k",
  },
  {
    id: 22,
    title: "Content Strategist",
    company: "BrandWave",
    location: "Remote",
    type: "Full-time",
    salary: "USD 70k – 95k",
  },
  {
    id: 23,
    title: "Machine Learning Researcher",
    company: "Quantum AI Labs",
    location: "Palo Alto, CA",
    type: "Full-time",
    salary: "USD 150k – 190k",
  },
  {
    id: 24,
    title: "Database Administrator",
    company: "DataSecure Systems",
    location: "Charlotte, NC",
    type: "Full-time",
    salary: "USD 95k – 120k",
  },
  {
    id: 25,
    title: "Financial Analyst",
    company: "CapitalBridge",
    location: "New York, NY",
    type: "Full-time",
    salary: "USD 85k – 110k",
  },
  {
    id: 26,
    title: "Operations Manager",
    company: "LogiCore",
    location: "Dallas, TX",
    type: "Full-time",
    salary: "USD 100k – 130k",
  },
  {
    id: 27,
    title: "React Developer",
    company: "Frontend Forge",
    location: "Remote",
    type: "Full-time",
    salary: "USD 105k – 135k",
  },
  {
    id: 28,
    title: "Customer Success Manager",
    company: "ClientFirst Solutions",
    location: "Boston, MA",
    type: "Full-time",
    salary: "USD 80k – 100k",
  },
  {
    id: 29,
    title: "Data Engineer",
    company: "Pipeline Labs",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "USD 120k – 150k",
  },
  {
    id: 30,
    title: "Technical Project Manager",
    company: "AgileWorks",
    location: "Remote",
    type: "Full-time",
    salary: "USD 110k – 140k",
  },
];

export default function JobsPremiumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* HERO */}
      <div className="pt-32 pb-16 text-center bg-white text-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%)]" />
        <h1 className="text-4xl md:text-5xl font-bold relative z-10">
          Explore Career Opportunities
        </h1>
        <p className="mt-4 text-emerald-600 relative z-10">
          Find the role that matches your ambition and skills.
        </p>
      </div>

      {/* JOB GRID */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="group bg-white/70 backdrop-blur-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl"
            >
              <CardContent className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{job.company}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                    <Briefcase className="w-3 h-3" />
                    {job.type}
                  </span>

                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                </div>

                {/* Salary */}
                <div className="flex items-center text-gray-700 text-sm">
                  <DollarSign className="w-4 h-4 mr-1 text-emerald-500" />
                  {job.salary}
                </div>

                {/* Button */}
                {/* <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                  View Details
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
