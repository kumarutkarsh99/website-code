"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Users, Trophy, Building2, TrendingUp } from "lucide-react";

/* ----------------------------------
   ICON MAP (CMS → React)
---------------------------------- */
const iconMap: Record<string, any> = {
  marketing: Users,
  services: Trophy,
  cloud: Building2,
  logistics: TrendingUp,
};

/* ----------------------------------
   PROPS TYPE (matches backend)
---------------------------------- */
type StatsSectionProps = {
  data: {
    title: string; // HTML string
    sub_title: string;
    meta: {
      usp_items: {
        key: string;
        label: string;
        icon_key: string;
        description: string;
        finalNumber: number;
      }[];
    };
  };
};

/* ----------------------------------
   COMPONENT
---------------------------------- */
const StatsSection = ({ data }: StatsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [counts, setCounts] = useState<number[]>([]);

  const stats = useMemo(() => data.meta.usp_items, [data]);

  /* ----------------------------------
     COUNT-UP ANIMATION
  ---------------------------------- */
  useEffect(() => {
    if (!isInView) return;

    setCounts(new Array(stats.length).fill(0));

    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.finalNumber / 50;

      const timer = setInterval(() => {
        current += increment;

        if (current >= stat.finalNumber) {
          current = stat.finalNumber;
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
      className="py-12 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-200/30 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Title from CMS (HTML) */}
            <div
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.sub_title}
            </p>
          </motion.div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon_key];

              const isPercentage =
                stat.label.toLowerCase().includes("rate") ||
                stat.finalNumber <= 100;

              return (
                <motion.div
                  key={stat.key}
                  initial={{ y: 50, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="bg-white/80 min-h-[280px] backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300">
                    {/* ICON */}
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {Icon && <Icon className="w-8 h-8 text-white" />}
                    </motion.div>

                    {/* NUMBER */}
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                      {isPercentage
                        ? `${counts[index] ?? 0}%`
                        : `${(counts[index] ?? 0).toLocaleString()}+`}
                    </div>

                    {/* LABEL */}
                    <div className="text-xl font-semibold text-gray-800 mb-3">
                      {stat.label}
                    </div>

                    {/* DESCRIPTION */}
                    <div className="text-gray-600 leading-relaxed">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
