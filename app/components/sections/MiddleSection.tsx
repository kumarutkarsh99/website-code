"use client";

import Image from "next/image";
import * as Icons from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";

/* -------------------------------- TYPES -------------------------------- */

type Point = {
  icon?: string;
  text?: string;
};

type CTA = {
  icon?: string;
  link?: string;
  label?: string;
  variant?: "primary" | "outline";
};

interface MiddleSectionProps {
  data?: {
    image?: string;
    meta?: {
      badge?: string;
      heading?: {
        headingTitle?: string;
        headingsubtitle?: string;
      };
      points?: Point[];
      ctas?: CTA[];
      rightsectionbadge?: string;
      rightsectiontitle?: string;
      rightsectiondescription?: string;
    };
  };
}

/* ----------------------------- ICON HELPER ------------------------------ */

const getIcon = (icon?: string) => {
  if (!icon) return Icons.CheckCircle2;
  return (Icons as any)[icon] || Icons.CheckCircle2;
};

/* ------------------------------------------------------------------------ */

export default function MiddleSection({ data }: MiddleSectionProps) {
  if (!data?.meta) return null;

  const { meta, image } = data;

  const imageSrc = image
    ? `http://72.61.229.100:3001/uploads/clients/${image}`
    : null;

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* TOP HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-10"
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
            <p className="text-lg lg:text-xl text-slate-600">
              {meta.heading.headingsubtitle}
            </p>
          )}
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-200/60 blur-3xl" />

            {imageSrc && (
              <div className="relative w-[280px] rounded-2xl overflow-hidden shadow-xl bg-white">
                <Image
                  src={imageSrc}
                  alt="Middle Section"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            )}
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="space-y-4 max-w-xl"
          >
            {/* RIGHT BADGE */}
            {meta.rightsectionbadge && (
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="inline-flex px-4 py-1.5 rounded-full bg-white shadow text-sm font-semibold text-blue-600"
              >
                {meta.rightsectionbadge}
              </motion.span>
            )}

            {/* RIGHT TITLE */}
            {meta.rightsectiontitle && (
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-3xl lg:text-4xl font-bold text-slate-900"
              >
                {meta.rightsectiontitle}
              </motion.h3>
            )}

            {/* RIGHT DESCRIPTION */}
            {meta.rightsectiondescription && (
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-md text-slate-600"
              >
                {meta.rightsectiondescription}
              </motion.p>
            )}

            {/* BULLET POINTS */}
            {Array.isArray(meta.points) && meta.points.length > 0 ? (
              <motion.ul className="space-y-3 pt-2">
                {meta.points.map((item, idx) => {
                  const Icon = getIcon(item.icon);

                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: idx * 0.08,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                      <Icon className="w-6 h-6 text-blue-500" />
                      <span className="text-slate-700 font-medium">
                        {item.text}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            ) : null}

            {/* CTA */}
            {Array.isArray(meta.ctas) && meta.ctas.length > 0  && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                {meta.ctas.map((cta, idx) => {
                  const Icon = getIcon(cta.icon);

                  return (
                    <Button
                      key={idx}
                      asChild
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-base"
                    >
                      <a
                        href={cta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {cta.label}
                      </a>
                    </Button>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
