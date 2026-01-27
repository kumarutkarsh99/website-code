"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { CheckCircle } from "lucide-react";

interface Props {
  data: {
    title?: string; // HTML
    sub_title?: string; // text
    image?: string | null;
    meta?: {
      image?: string | null;
      badge?: string; // optional (e.g. pricing / label)
      content?: string; // HTML
      ctaPrimary?: {
        url: string;
        label: string;
      };
    };
  };
}

export default function LeftImageRightContentSection({ data }: Props) {
  const { title, sub_title, meta, image } = data;
  const sectionImage = meta?.image || image;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* ================= LEFT IMAGE ================= */}
          {sectionImage && (
            <div className="relative flex justify-center">
              {/* soft halo */}
              <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-br from-purple-100 via-purple-50 to-white blur-2xl" />

              {/* image card */}
              <div className="relative z-10 w-[280px] h-[280px] rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={sectionImage}
                  alt="Section visual"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* ================= RIGHT CONTENT ================= */}
          <div>
            {meta?.badge && (
              <span className="inline-block mb-3 px-4 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
                {meta.badge}
              </span>
            )}

            {title && (
              <div
                className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}

            {sub_title && (
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                {sub_title}
              </p>
            )}

            {/* CMS content */}
            {meta?.content && (
              <div
                className="
                  prose max-w-none
                  prose-p:text-sm prose-p:text-gray-700
                  prose-h3:text-lg prose-h3:font-semibold prose-h3:text-gray-900
                "
                dangerouslySetInnerHTML={{ __html: meta.content }}
              />
            )}

            {/* CTA */}
            {meta?.ctaPrimary?.url &&
              meta.ctaPrimary.url !== "#" &&
              meta.ctaPrimary.url !== "@" && (
                <Link href={meta.ctaPrimary.url}>
                  <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-sm rounded-lg shadow-md">
                    {meta.ctaPrimary.label} →
                  </Button>
                </Link>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
