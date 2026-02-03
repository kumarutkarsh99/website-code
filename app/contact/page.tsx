"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/footer";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  message: string;
  source: string;
};

const API_BASE_URL = "http://72.61.229.100:3001";

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
    source: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
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
          source: "Website – Contact Page",
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
        source: "",
      });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3fbf8]">
      <Navigation />

      <div className="min-h-[90vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 p-10 md:p-14">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                Start Your Hiring Journey
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Get in touch with our expert recruitment team. Tell us about
                your needs, and we'll find the perfect match.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Names */}
              <div className="grid md:grid-cols-2 gap-8">
                <InputField
                  id="firstName"
                  label="First Name"
                  placeholder="Jane"
                  icon={<User size={18} />}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputField
                  id="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  icon={<User size={18} />}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Email / Phone */}
              <div className="grid md:grid-cols-2 gap-8">
                <InputField
                  id="email"
                  label="Email Address"
                  placeholder="jane@company.com"
                  icon={<Mail size={18} />}
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
                <InputField
                  id="phone"
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  icon={<Phone size={18} />}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Company / Role */}
              <div className="grid md:grid-cols-2 gap-8">
                <InputField
                  id="company"
                  label="Company Name"
                  placeholder="Your Company Ltd."
                  icon={<Building2 size={18} />}
                  value={formData.company}
                  onChange={handleChange}
                />
                <InputField
                  id="role"
                  label="Role to Hire"
                  placeholder="e.g. Senior Software Engineer"
                  icon={<FileText size={18} />}
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div>
                <Label className="text-slate-700 mb-2 block">
                  Additional Requirements
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Describe specific skills, experience levels, or cultural fit requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="rounded-lg bg-white text-slate-500 border-slate-300 focus:border-slate-400 focus:ring-slate-400"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="
  w-full h-auto text-base font-medium
  bg-gradient-to-r from-emerald-600 to-teal-600
  hover:from-emerald-700 hover:to-teal-700
  text-white rounded-lg
  transition-colors cursor-pointer
"
              >
                {loading ? "Submitting..." : "Submit Request"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              {/* Status */}
              {status === "success" && (
                <Status
                  icon={<CheckCircle size={18} />}
                  text="Request received! We'll be in touch soon."
                  type="success"
                />
              )}

              {status === "error" && (
                <Status
                  icon={<AlertCircle size={18} />}
                  text="Something went wrong. Please try again."
                  type="error"
                />
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ---------- Components ---------- */

function InputField({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: any) {
  return (
    <div>
      <Label htmlFor={id} className="text-slate-700 mb-2 block">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <Input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required
          className="
    h-12 pl-10 rounded-lg
    bg-white text-slate-900
    border border-slate-300
    placeholder:text-slate-400
    focus:border-slate-400
    focus:ring-0
  "
        />
      </div>
    </div>
  );
}

function Status({ icon, text, type }: any) {
  return (
    <div
      className={`flex items-center justify-center gap-2 p-4 rounded-lg ${
        type === "success"
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {icon}
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
