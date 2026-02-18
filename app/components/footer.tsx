"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { MapPin, Phone, Mail, Facebook,
  Instagram,
  Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchwebsiteSetting, WebsiteSettings } from "@/app/lib/cms";
export default function Footer() {
  const [settings, setSettings] = useState<WebsiteSettings>({});
  useEffect(() => {
    loadSettings();
  }, []);
  const loadSettings = async () => {
    try {
      const res = await fetchwebsiteSetting();
      if (res?.status && res?.result) {
        setSettings(res.result);
      }
      console.log("Website settings:", res);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  return (
    <footer className="bg-slate-800 text-white py-16 px-4">

      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Company Info */}
          <div>

            <h3 className="text-2xl font-bold mb-4 text-teal-400">
              {settings.site_name || "TalentConnect"}
            </h3>

            <p className="text-slate-300 mb-6">
              {settings.meta_description || "Connecting exceptional talent with outstanding opportunities."}
            </p>



            <div className="space-y-2">

              <div className="flex items-center text-slate-300">
                <Phone className="h-4 w-4 mr-2 text-teal-400" />
                {settings.contact_number || "+1 (555) 123-4567"}
              </div>

              <div className="flex items-center text-slate-300">
                <Mail className="h-4 w-4 mr-2 text-teal-400" />
                {settings.email || "hello@talentconnect.com"}
              </div>

              <div className="flex items-center text-slate-300">
                <MapPin className="h-4 w-4 mr-2 text-teal-400" />
                {settings.address || "123 Business Ave, Suite 100"}
              </div>

            </div>
              {/* Social Icons */}
  <div className="flex gap-4 mt-4">

    {settings.social_facebook && (
      <a href={`https://${settings.social_facebook}`} target="_blank">
        <Facebook className="h-5 w-5 hover:text-teal-400" />
      </a>
    )}

    {settings.social_instagram && (
      <a href={`https://${settings.social_instagram}`} target="_blank">
        <Instagram className="h-5 w-5 hover:text-teal-400" />
      </a>
    )}

    {settings.social_linkedin && (
      <a href={`https://${settings.social_linkedin}`} target="_blank">
        <Linkedin className="h-5 w-5 hover:text-teal-400" />
      </a>
    )}

  </div>

          </div>

          {/* Employers */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Post a Job</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Browse CVs</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Job Seekers</h4>
             <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Upload CV</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Salary Guide</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-slate-300 mb-4">Get the latest job market insights and career tips.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
              <Button className="bg-teal-600 hover:bg-teal-700">Subscribe</Button>
            </div>

            {/* <div className="flex gap-2">
              <Input placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </div> */}

          </div>

        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>© 2026 {settings.site_name || "TalentConnect"}. All rights reserved.</p>
        </div>

      </div>

    </footer>
  );
}