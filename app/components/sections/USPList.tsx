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
  icon_key?: string;
};

type USPSection = {
  title?: string;
  sub_title?: string;
  meta?: {
    usp_items?: USPItem[];
  };
};

/* ---------------- Animation Tokens ---------------- */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
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
    return controls.stop;
  }, [value, motionValue]);

  return (
    <motion.span
      className={`bg-gradient-to-r ${colors} bg-clip-text text-transparent`}
    >
      {rounded}
    </motion.span>
  );
}

/* ---------------- Component ---------------- */

export default function USPList() {
  const [uspSection, setUspSection] = useState<USPSection | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
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
      } catch (error) {
        console.error("USP fetch failed", error);
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
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />

      <div className="relative container mx-auto text-center">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {safeTitle && (
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
              dangerouslySetInnerHTML={{ __html: safeTitle }}
            />
          )}

          {uspSection.sub_title && (
            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {uspSection.sub_title}
            </motion.p>
          )}
        </motion.div>

        {/* USP CARDS */}
        {uspItems.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {uspItems.map((item, index) => {
              const gradient = item.colors ?? "from-emerald-500 to-teal-500";

              const Icon: React.ElementType =
                CLIENT_ICONS[item.icon_key as keyof typeof CLIENT_ICONS]
                  ?.icon || Award;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-md"
                >
                  {/* Icon Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    viewport={{ once: true }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2"
                  >
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    {item.finalNumber !== undefined && (
                      <p className="mt-3 text-4xl font-extrabold">
                        <AnimatedNumber
                          value={item.finalNumber}
                          colors={gradient}
                        />
                        <span
                          className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                        >
                          +
                        </span>
                      </p>
                    )}

                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.label}
                    </h3>

                    {item.description && (
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
