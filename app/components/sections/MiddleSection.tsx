"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface MiddleSectionProps {
  data: {
    title: string;
    sub_title: string;
    meta: {
      image: string | null;
      heading: string;
      description: string;
      features: string[];
      ctaPrimary?: {
        url: string;
        label: string;
      };
    };
  };
}

export default function MiddleSection({ data }: MiddleSectionProps) {
  const { title, sub_title, meta } = data;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
            {title}
          </h2>

          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {sub_title}
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ================= LEFT VISUAL ================= */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-100 blur-2xl opacity-60" />

              {meta.image ? (
                <Image
                  src={meta.image}
                  alt={meta.heading}
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="relative z-10 w-24 h-24 rounded-xl bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold shadow-md">
                  &lt;/&gt;
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div>
            {/* Service heading */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {meta.heading}
            </h3>
            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {meta.description}
            </p>
            {/* Feature list */}
            {meta.features && meta.features.length > 0 && (
              <ul className="space-y-3 mb-6">
                {meta.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            {/* CTA */}
            {meta.ctaPrimary && (
              <Link href={meta.ctaPrimary.url}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm rounded-md">
                  {meta.ctaPrimary.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
