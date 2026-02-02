"use client";

import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Button } from "@/app/components/ui/button";
type HeroSectionProps = {
  data?: {
    title?: string;
    sub_title?: string;
    image?: string;
    meta?: {
      badge?: string;
      description?: string;
      video?: string;

      /* ✅ ADD THESE */
      image?: string;
      headline?: {
        line1?: string;
        line2?: string;
      };
      highlights?: {
        icon?: string;
        text?: string;
      }[];

      ctaPrimary?: {
        label?: string;
        url?: string;
      };
      ctaSecondary?: {
        label?: string;
        url?: string;
      };
    };
  };
};

export default function HeroSection({ data }: HeroSectionProps) {
  // 🛡️ SAFETY: Prevent prerender crash
  if (!data) return null;

  const {
    title = "",
    sub_title = "",
    meta = {},
    image = null,
  } = data;

const safeTitle = title ? DOMPurify.sanitize(title) : "";
  return (
    <section className="p-10 min-h-[95vh] relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
   <div className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-br from-emerald-400/20 to-teal-400/15 rounded-full blur-3xl animate-pulse" />
  <div
          className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-tl from-teal-400/15 to-cyan-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
</div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex items-center">
         {/* <div className="max-w-7xl mx-auto w-full"></div> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            {meta.badge && (
              <span className="inline-block px-4 py-2 rounded-full bg-white shadow text-sm font-semibold text-emerald-600">
                {meta.badge}
              </span>
            )}

            {safeTitle && (
              <div
                className="mt-4 text-5xl font-bold leading-tight"
                dangerouslySetInnerHTML={{ __html: safeTitle }}
              />
            )}

            {sub_title && (
              <p className="text-lg text-gray-600 max-w-xl">
                {sub_title}
              </p>
            )}

            {meta.description && (
              <p className="text-lg text-gray-600 max-w-xl">
                {meta.description}
              </p>
            )}

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">
              {meta.ctaPrimary?.url && meta.ctaPrimary?.label && (
                <Link href={meta.ctaPrimary.url}>
                  <Button className="px-6 py-3">
                    {meta.ctaPrimary.label}
                  </Button>
                </Link>
              )}

              {meta.ctaSecondary?.url && meta.ctaSecondary?.label && (
                <Link href={meta.ctaSecondary.url}>
                  <Button variant="outline" className="px-6 py-3">
                    {meta.ctaSecondary.label}
                  </Button>
                </Link>
              )}
            </div>

          </div>

          {/* RIGHT IMAGE / VIDEO */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[650px] rounded-2xl overflow-hidden shadow-xl border border-white bg-white">

              {meta.video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                >
                  <source src={meta.video} type="video/mp4" />
                </video>
              ) : (
                image && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/clients/${image}`}
                    alt="Hero Image"
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                )
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}