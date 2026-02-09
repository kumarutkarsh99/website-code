"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type Variants,
} from "framer-motion";
import { Award } from "lucide-react";
import { useParams } from "next/navigation";
import { CLIENT_ICONS } from "../../lib/clientIcons";

/* ---------------- Types ---------------- */

type USPItem = {
  key: string;
  label: string;
  description?: string;
  finalNumber?: number;
  colors?: string;
  icon_key?: keyof typeof CLIENT_ICONS;
};

type USPSection = {
  title?: string;
  sub_title?: string;
  meta?: {
    usp_items?: USPItem[];
  };
};

interface UspSectionProps {
  data?: {
    image?: string;
    meta?: {
      badge?: string;
      heading?: {
        headingTitle?: string;
        headingsubtitle?: string;
      };
    };
  };
}

/* ---------------- Animation ---------------- */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/* ---------------- Animated Number ---------------- */

function AnimatedNumber({
  value,
  colors = "from-emerald-500 to-teal-500",
}: {
  value: number;
  colors?: string;
}) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.floor(latest).toLocaleString(),
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [value]);

  return (
    <motion.span
      className={`bg-gradient-to-r ${colors} bg-clip-text text-transparent`}
    >
      {rounded}
    </motion.span>
  );
}

/* ---------------- Component ---------------- */

export default function USPList({ data }: UspSectionProps) {
  const [uspSection, setUspSection] = useState<USPSection | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  if (!data?.meta) return null;
  const { meta } = data;

  useEffect(() => {
    if (!slug) return;

    const fetchUSP = async () => {
      try {
        const res = await fetch(
          `http://72.61.229.100:3001/pages/slug/${slug}`,
          { cache: "no-store" },
        );
        const json = await res.json();

        const sections = json?.data?.result?.sections ?? [];
        const usp = sections.find(
          (sec: any) => sec.section_key === "usp_items",
        );

        setUspSection(usp ?? null);
      } catch (err) {
        console.error("USP fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUSP();
  }, [slug]);

  if (loading || !uspSection) return null;

  const safeTitle = uspSection.title
    ? DOMPurify.sanitize(uspSection.title)
    : "";

  const uspItems = uspSection.meta?.usp_items ?? [];
  if (!safeTitle && uspItems.length === 0) return null;

  return (
    <section className="relative p-12 bg-white overflow-hidden">
      <div className="relative container mx-auto text-center">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {meta.badge && (
            <span className="inline-block mb-4 px-5 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold">
              {meta.badge}
            </span>
          )}

          {meta.heading?.headingTitle && (
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {meta.heading.headingTitle}
            </h2>
          )}

          {meta.heading?.headingsubtitle && (
            <p className="text-lg text-slate-600">
              {meta.heading.headingsubtitle}
            </p>
          )}
        </motion.div>

        {/* USP CARDS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {uspItems.map((item) => {
            const gradient =
              item.colors ?? "from-emerald-500 to-teal-500";

            const Icon =
              (item.icon_key &&
                CLIENT_ICONS[item.icon_key]?.icon) ||
              Award;

            return (
              <motion.div
                key={item.key}
                variants={itemVariants}
                className="relative bg-white border rounded-2xl p-8 shadow-md"
              >
                {/* Icon */}
                <div
                  className={`absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-4 mt-6">
                  {item.finalNumber !== undefined && (
                    <p className="text-4xl font-extrabold">
                      <AnimatedNumber
                        value={item.finalNumber}
                        colors={gradient}
                      />
                      <span className="ml-1">+</span>
                    </p>
                  )}

                  <h3 className="text-xl font-semibold">
                    {item.label}
                  </h3>

                  {item.description && (
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}