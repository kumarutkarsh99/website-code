"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import * as Icons from "lucide-react";

/* ----------------------------------
   TYPES
---------------------------------- */
type UspItem = {
  key: string;
  label: string;
  icon_key: string;
  colors: string;
  description?: string;
  finalNumber?: number | null; // nullable
};

type StatsSectionProps = {
  data: {
    meta: {
      badge?: string;
      heading?: {
        headingTitle?: string;
        headingsubtitle?: string;
      };
      usp_items: UspItem[];
    };
  };
};

/* ----------------------------------
   ICON RESOLVER
---------------------------------- */
const getIcon = (iconName?: string) => {
  if (!iconName) return Icons.Activity;
  return (Icons as any)[iconName] || Icons.Activity;
};

export default function StatsSection({ data }: StatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const stats = useMemo(() => data.meta.usp_items ?? [], [data]);
  const [counts, setCounts] = useState<number[]>([]);

  /* ----------------------------------
     COUNT-UP (ONLY IF NUMBER EXISTS)
  ---------------------------------- */
  useEffect(() => {
    if (!isInView) return;

    setCounts(new Array(stats.length).fill(0));

    stats.forEach((stat, index) => {
      if (typeof stat.finalNumber !== "number") return; // ✅ IMPORTANT

      let current = 0;
      const increment = stat.finalNumber / 50;

      const timer = setInterval(() => {
        current += increment;

        if (current >= stat.finalNumber!) {
          current = stat.finalNumber!;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.floor(current);
          return updated;
        });
      }, 30);
    });
  }, [isInView, stats]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-emerald-50 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {data.meta.heading?.headingTitle && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {data.meta.heading.headingTitle}
            </h2>
          )}
          {data.meta.heading?.headingsubtitle && (
            <p className="text-lg text-slate-600">
              {data.meta.heading.headingsubtitle}
            </p>
          )}
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = getIcon(stat.icon_key);
            const hasNumber = typeof stat.finalNumber === "number";

            const isPercentage =
              hasNumber &&
              (stat.label.toLowerCase().includes("rate") ||
                stat.finalNumber! <= 100);

            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="bg-white/80 min-h-[280px] backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/50 flex flex-col items-center justify-center">
                  {/* ICON */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${stat.colors} rounded-xl mb-4`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* NUMBER — ONLY IF PRESENT */}
                  {/* NUMBER — SAFE RENDER */}
                  {typeof stat.finalNumber === "number" &&
                    typeof counts[index] === "number" && (
                      <div
                        className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.colors} bg-clip-text text-transparent mb-3`}
                      >
                        {isPercentage
                          ? `${counts[index]}%`
                          : `${counts[index].toLocaleString()}+`}
                      </div>
                    )}

                  {/* LABEL */}
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    {stat.label}
                  </div>

                  {/* DESCRIPTION */}
                  {stat.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
