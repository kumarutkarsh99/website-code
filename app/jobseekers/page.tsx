"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { User, Mail, Phone, Building2, FileText } from "lucide-react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/footer";

const API_BASE_URL = "http://72.61.229.100:3001";

export default function JobSeekers() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${API_BASE_URL}/leads/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.company,
          role_to_hire: formData.role,
          requirements: formData.message,
          source: "Website – jobseekers Page",
        }),
      });

      if (!response.ok) throw new Error("API Error");

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        message: "",
      });
    } catch (err) {
      console.error("Lead submit error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <Navigation />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-6 pb-16 pt-24">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Ready to Get Started?
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Upload your CV and let us match you with your perfect job
            opportunity.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white text-gray-900 border border-gray-300
                               placeholder:text-gray-400
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white text-gray-900 border border-gray-300
                               placeholder:text-gray-400
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white text-gray-900 border border-gray-300
                               placeholder:text-gray-400
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white text-gray-900 border border-gray-300
                               placeholder:text-gray-400
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Company & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company" className="text-gray-700">Current Company</Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="company"
                    placeholder="Your Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10 bg-white text-gray-900 border border-gray-300
                               placeholder:text-gray-400
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="role" className="text-gray-700">Target Role</Label>
                <div className="relative mt-1">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="role"
                    placeholder="Software Engineer, HR Manager..."
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white text-gray-900 border border-gray-300
                               placeholder:text-gray-400
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-gray-700">Additional Details</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Describe your experience, skills, and expectations..."
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-white text-gray-900 border border-gray-300
                           placeholder:text-gray-400
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-lg"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </Button>

            {status === "success" && (
              <p className="text-green-600 text-center mt-2 font-medium">
                Your request has been sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className="text-red-600 text-center mt-2 font-medium">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
