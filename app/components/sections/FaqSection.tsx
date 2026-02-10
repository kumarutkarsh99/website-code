"use client";

import { useState } from "react";
import DOMPurify from "dompurify";
import {
  ChevronDown,
  Sparkles,
  Clock,
  Award,
  DollarSign,
  Briefcase,
} from "lucide-react";

/* ----------------------------------
   TYPES (MATCH BACKEND)
---------------------------------- */
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  data: {
    faq_title: string; // HTML
    sub_title?: string | null;
    faq_items: FaqItem[];
  };
}

/* ----------------------------------
   ICON + COLOR MAP (UI CONCERN)
---------------------------------- */
const ICONS = [Clock, Briefcase, Award, DollarSign];
const COLORS = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
];

/* ----------------------------------
   COMPONENT
---------------------------------- */
export default function FaqSection({ data }: FaqSectionProps) {
  const { faq_title, sub_title, faq_items } = data;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const safeTitle = faq_title ? DOMPurify.sanitize(faq_title) : "";

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">
              Got Questions?
            </span>
          </div>

          {safeTitle && (
            <div
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              dangerouslySetInnerHTML={{ __html: safeTitle }}
            />
          )}

          {sub_title && (
            <p className="text-gray-600 text-sm mt-2 max-w-2xl mx-auto">
              {sub_title}
            </p>
          )}
        </div>

        {/* FAQ LIST */}
        <div className="space-y-3">
          {faq_items.map((faq, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const color = COLORS[idx % COLORS.length];
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`group relative bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-gray-300 shadow-xl"
                    : "border-gray-100 hover:border-gray-200 shadow-lg"
                }`}
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity`}
                />

                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-start gap-3 relative z-10"
                  aria-expanded={isOpen}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow ${
                      isOpen ? "scale-110" : "group-hover:scale-105"
                    } transition-transform`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  {/* Question */}
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mt-2">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Chevron */}
                  <div
                    className={`w-7 h-7 mt-1 rounded-lg bg-gray-100 flex items-center justify-center transition-transform ${
                      isOpen ? "rotate-180 bg-gray-200" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-4 sm:px-5 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed pl-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
