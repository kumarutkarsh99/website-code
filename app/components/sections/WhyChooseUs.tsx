"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Clock,
  Globe,
  Users,
  Target,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/* ----------------------------------
   ICON MAP (CMS → React)
---------------------------------- */
const iconMap: Record<string, any> = {
  shield: Shield,
  clock: Clock,
  globe: Globe,
  users: Users,
  target: Target,
  award: Award,
};

/* ----------------------------------
   THEME MAP (CMS → Tailwind)
---------------------------------- */
const themeMap: Record<string, { color: string; bgColor: string }> = {
  emerald: {
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
  },
  teal: {
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
  },
  green: {
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
};

/* ----------------------------------
   PROPS TYPE
---------------------------------- */
type WhyChooseTalentBridgeProps = {
  data: {
    meta: {
      header: {
        header: {
          badge: string;
          title: {
            prefix: string;
            highlight: string;
            suffix: string;
          };
          subtitle: string;
        };
        stats: {
          icon: string;
          label: string;
          value: string;
        }[];
        features: {
          icon: string;
          theme: string;
          title: string;
          description: string;
        }[];
        cta: {
          label: string;
          link: string;
        };
      };
    };
  };
};

/* ----------------------------------
   COMPONENT
---------------------------------- */
const WhyChooseUs = ({ data }: WhyChooseTalentBridgeProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { header, stats, features, cta } = data.meta.header;

  return (
    <section
      ref={sectionRef}
      className="relative py-12 bg-gradient-to-br from-white to-emerald-50 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-12">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {header.badge}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {header.title.prefix}
              <span className="text-emerald-600">{header.title.highlight}</span>
              <br />
              {header.title.suffix}
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {header.subtitle}
            </p>
          </motion.div>

          {/* STATS */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {stats.map((stat, i) => {
              const Icon = iconMap[stat.icon];
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-emerald-100/50"
                >
                  <div className="inline-flex w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg mb-2 items-center justify-center">
                    {Icon && <Icon className="w-5 h-5 text-white" />}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* FEATURES */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              const theme = themeMap[feature.theme] ?? themeMap.emerald;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`relative group ${theme.bgColor} rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-xl transition-all`}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${theme.color} rounded-xl mb-4 flex items-center justify-center`}
                  >
                    {Icon && <Icon className="w-6 h-6 text-white" />}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={() => (window.location.href = cta.link)}
              className="inline-flex items-center px-6 py-3 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
            >
              <span className="mr-2">{cta.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
