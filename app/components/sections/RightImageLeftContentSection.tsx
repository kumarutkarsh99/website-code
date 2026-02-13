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

interface RightImageLeftContentSectionProps {
  data?: {
    image?: string | null;
    meta?: {
      badge?: string;
      heading?: {
        headingTitle?: string;
        headingsubtitle?: string;
      };
      rightsectiondescription?: string;
      points?: Point[];
      ctas?: CTA[];
      image: string;
    };
  };
}

/* ----------------------------- ICON HELPER ------------------------------ */

const getIcon = (icon?: string) => {
  if (!icon) return Icons.CheckCircle;
  return (Icons as any)[icon] || Icons.CheckCircle;
};

/* ------------------------------------------------------------------------ */

export default function RightImageLeftContentSection({
  data,
}: RightImageLeftContentSectionProps) {
  if (!data?.meta) return null;

  const { meta, image } = data;
  const imageUrl = image ? `${meta.image}` : null;

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="space-y-5 max-w-xl"
          >
            {/* BADGE */}
            {meta.badge && (
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="inline-flex px-4 py-1.5 rounded-full bg-white shadow text-sm font-semibold text-emerald-600"
              >
                {meta.badge}
              </motion.span>
            )}

            {/* TITLE */}
            {meta.heading?.headingTitle && (
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              >
                {meta.heading.headingTitle}
              </motion.h3>
            )}

            {/* SUBTITLE */}
            {meta.heading?.headingsubtitle && (
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-base lg:text-lg text-slate-600"
              >
                {meta.heading.headingsubtitle}
              </motion.p>
            )}

            {/* EXTRA DESCRIPTION */}
            {meta.rightsectiondescription && (
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-sm lg:text-base text-slate-600 leading-relaxed"
              >
                {meta.rightsectiondescription}
              </motion.p>
            )}

            {/* BULLETS */}
            {Array.isArray(meta.points) && meta.points.length > 0 && (
              <motion.ul className="space-y-3 pt-1">
                {meta.points.map((item, idx) => {
                  const Icon = getIcon(item.icon);

                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: idx * 0.08,
                      }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white mt-1 shrink-0">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-slate-700 text-md font-medium leading-relaxed">
                        {item.text}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}

            {/* CTA */}
            {Array.isArray(meta.ctas) && meta.ctas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                {meta.ctas.map((cta, idx) => {
                  const Icon = getIcon(cta.icon);

                  return (
                    <Button
                      key={idx}
                      asChild
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 shadow-md"
                    >
                      <a
                        href={cta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {cta.label}
                      </a>
                    </Button>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT IMAGE */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              {/* Glow */}
              <div className="absolute w-[360px] h-[360px] rounded-xl bg-emerald-200/60 blur-3xl" />

              {/* Image card */}
              <div className="relative w-[320px] h-[320px] lg:w-[360px] lg:h-[360px] rounded-xl bg-white shadow-xl overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Section image"
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
