"use client";

import Image from "next/image";
import {
  Briefcase,
  Users,
  Target,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion, type Variants } from "framer-motion";

type HeroSectionProps = {
  data?: {
    image?: string;
    meta?: {
      badge?: string;
      description?: string;
      headline?: {
        line1?: string;
        line2?: string;
      };
      highlights?: {
        icon?: string;
        text?: string;
      }[];
    };
  };
};

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Users,
  Target,
};

/* ---------------- ANIMATION VARIANTS (TS SAFE) ---------------- */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOut (TS-safe)
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) return null;

  const { meta = {}, image } = data;

  const getImageSrc = (img?: string) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;

    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
    return baseUrl ? `${baseUrl.replace(/\/$/, "")}/uploads/${img}` : null;
  };

  const heroImageSrc = getImageSrc(image);

  return (
    <section className="relative min-h-[95vh] overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-28 right-24 w-60 h-60 bg-emerald-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-24 left-24 w-72 h-72 bg-teal-400/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-20 pb-20 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 max-w-xl"
          >
            {/* Badge */}
            {meta.badge && (
              <motion.span
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm text-sm font-semibold text-emerald-600"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {meta.badge}
              </motion.span>
            )}

            {/* Heading */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-[44px] leading-tight lg:text-[40px] font-bold text-slate-900"
            >
              <span className="block">{meta.headline?.line1}</span>
              <span className="block text-emerald-600">
                {meta.headline?.line2}
              </span>
            </motion.h1>

            {/* Description */}
            {meta.description && (
              <motion.p
                variants={fadeUpVariants}
                className="text-lg text-slate-600 leading-relaxed"
              >
                {meta.description}
              </motion.p>
            )}

            {/* Highlights */}
            {meta.highlights && (
              <motion.ul
                variants={containerVariants}
                className="space-y-4 pt-2"
              >
                {meta.highlights.map((item, idx) => {
                  const Icon =
                    (item.icon && iconMap[item.icon]) || CheckCircle2;

                  return (
                    <motion.li
                      key={idx}
                      variants={fadeUpVariants}
                      className="flex items-center gap-4"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-500 text-white shadow-sm">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-slate-700 font-medium">
                        {item.text}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}

            {/* CTA */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap gap-4 pt-6"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-base shadow-md">
                <Briefcase className="w-4 h-4 mr-2" />
                Start Hiring Today
              </Button>

              <Button
                variant="outline"
                className="px-6 py-3 text-base bg-white border-slate-300 text-slate-700 hover:text-emerald-500"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut", // allowed here (not Variants)
              }}
              className="relative w-full max-w-[400px] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden"
            >
              {heroImageSrc && (
                <Image
                  src={heroImageSrc}
                  alt="Hero Image"
                  width={700}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
