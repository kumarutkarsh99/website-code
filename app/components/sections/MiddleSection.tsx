"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Button } from "@/app/components/ui/button";

interface MiddleSectionProps {
  data: {
    title?: string;
    sub_title?: string;
    image?: string | null;
    meta?: {
      image?: string | null;
      content?: string;
      ctaPrimary?: {
        url: string;
        label: string;
      };
      ctaSecondary?: {
        url: string;
        label: string;
      };
    };
  };
}

export default function MiddleSection({ data }: MiddleSectionProps) {
  const { title, sub_title, meta, image } = data || {};

  const safeTitle = title ? DOMPurify.sanitize(title) : "";
  const safeContent = meta?.content
    ? DOMPurify.sanitize(meta.content)
    : "";

  const isValidImage = (img?: string | null): img is string =>
    typeof img === "string" && img.trim().length > 0;

  const sectionImage = isValidImage(meta?.image)
    ? meta.image
    : isValidImage(image)
    ? image
    : null;

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12">
            {safeTitle && (
              <div
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                dangerouslySetInnerHTML={{ __html: safeTitle }}
              />
            )}

            {sub_title && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {sub_title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* IMAGE */}
           {meta?.image && sectionImage && (
                      <div className="relative flex justify-center items-center">
                        {/* Soft circular glow (same as screenshot) */}
                        <div className="absolute h-[400px] w-[400px] rounded-full bg-emerald-200/50 blur-3xl" />
           
                        {/* Image card */}
                        <div className="relative h-[350px] w-[400px] object-contain rounded-lg shadow-lg">
                          <Image
                            src={sectionImage}
                            alt="Service image"
                            width={600}
                            height={600}
                            className="w-full h-full object-contain"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}

            {/* CONTENT */}
            <div className="space-y-5">
              {safeContent && (
                <div
                  className="prose prose-lg max-w-none prose-p:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: safeContent }}
                />
              )}

              <div className="flex gap-4 pt-4">
                {meta?.ctaPrimary?.url && (
                  <Link href={meta.ctaPrimary.url}>
                    <Button className="bg-blue-500 text-white px-6 py-3">
                      {meta.ctaPrimary.label} →
                    </Button>
                  </Link>
                )}

                {meta?.ctaSecondary?.url && (
                  <Link href={meta.ctaSecondary.url}>
                    <Button variant="outline" className="px-6 py-3">
                      {meta.ctaSecondary.label}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
