"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const UPLOAD_BASE_URL = "http://72.61.229.100:3001/uploads/sections/";

export default function RightImageLeftContentSection({ data }: any) {
  const { title, sub_title, meta, image } = data;
const isValidImage = (img?: string | null) =>
  typeof img === "string" && img.trim().length > 0;

const sectionImage = isValidImage(meta?.image)
  ? meta?.image
  : isValidImage(image)
  ? image
  : null;
  

  return (
    <section className="p-12 bg-white relative overflow-hidden scroll-reveal">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-6">
            {/* PRICE BADGE (static for now, CMS later if needed) */}
         

            {/* TITLE (HTML FROM CMS) */}
            {title && (
              <div
                className="text-3xl md:text-4xl font-bold text-gray-900"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}

            {/* DESCRIPTION */}
            {sub_title && (
              <p className="text-lg text-gray-600 max-w-xl">{sub_title}</p>
            )}

            {/* BULLET POINTS (from meta.content HTML) */}
            {meta?.content && (
              <div className="space-y-3 pt-2">
                {meta.content
                  .replace(/<\/?p>|<br\s*\/?>/g, "")
                  .split("</span>")
                  .filter(Boolean)
                  .map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 bg-emerald-500 text-white rounded-full p-1 mt-1" />
                      <span
                        className="text-gray-700 text-sm mt-1"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    </div>
                  ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
                {meta?.ctaPrimary?.url && (
                   
                    <Link href={meta.ctaPrimary.url}>
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 shadow-lg transition-all">
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

          {/* ================= RIGHT IMAGE ================= */}
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
        </div>
      </div>
    </section>
  );
}