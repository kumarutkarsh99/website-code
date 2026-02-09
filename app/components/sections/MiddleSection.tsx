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

type Service = {
  badge?: string;
  title?: string;
  features?: Point[];
  ctas?: CTA[];
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
      services?: Service[];

      /* legacy support */
      rightsectionbadge?: string;
      rightsectiontitle?: string;
      rightsectiondescription?: string;
      points?: Point[];
      ctas?: CTA[];
    };
  };
}

/* ----------------------------- ICON HELPER ------------------------------ */

const getIcon = (icon?: string) => {
  if (!icon) return Icons.CheckCircle2;
  return (Icons as Record<string, any>)[icon] || Icons.CheckCircle2;
};

/* ------------------------------------------------------------------------ */

export default function MiddleSection({ data }: MiddleSectionProps) {
  if (!data?.meta) return null;

  const { meta, image } = data;

  const imageSrc = image
    ? `http://72.61.229.100:3001/uploads/clients/${image}`
    : null;

  const hasServices =
    Array.isArray(meta.services) && meta.services.length > 0;

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-6xl">

        {/* ---------------------------- TOP HEADER ---------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-12"
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

        {/* --------------------------- MAIN CONTENT --------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
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
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-6 max-w-xl"
          >

            {/* ===================== NEW SERVICES LOGIC ===================== */}
            {hasServices ? (
              meta.services!.map((service, sIdx) => (
                <motion.div
                  key={sIdx}
                  className="space-y-4 pb-8 border-b last:border-b-0"
                >
                  {service.badge && (
                    <span className="inline-flex px-4 py-1.5 rounded-full bg-white shadow text-sm font-semibold text-blue-600">
                      {service.badge}
                    </span>
                  )}

                  {service.title && (
                    <h3 className="text-3xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                  )}

                  {Array.isArray(service.features) && (
                    <ul className="space-y-3 pt-2">
                      {service.features.map((item, idx) => {
                        const Icon = getIcon(item.icon);
                        return (
                          <li key={idx} className="flex gap-4">
                            <Icon className="w-6 h-6 text-blue-500" />
                            <span className="text-slate-700 font-medium">
                              {item.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {Array.isArray(service.ctas) && (
                    <div className="pt-4 flex gap-3 flex-wrap">
                      {service.ctas.map((cta, idx) => {
                        const Icon = getIcon(cta.icon);
                        return (
                          <Button key={idx} asChild>
                            <a href={cta.link || "#"}>
                              <Icon className="w-4 h-4 mr-2" />
                              {cta.label}
                            </a>
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              /* ===================== LEGACY LOGIC ===================== */
              <>
                {meta.rightsectionbadge && (
                  <span className="inline-flex px-4 py-1.5 rounded-full bg-white shadow text-sm font-semibold text-blue-600">
                    {meta.rightsectionbadge}
                  </span>
                )}

                {meta.rightsectiontitle && (
                  <h3 className="text-3xl font-bold text-slate-900">
                    {meta.rightsectiontitle}
                  </h3>
                )}

                {meta.rightsectiondescription && (
                  <p className="text-slate-600">
                    {meta.rightsectiondescription}
                  </p>
                )}

                {Array.isArray(meta.points) && (
                  <ul className="space-y-3 pt-2">
                    {meta.points.map((item, idx) => {
                      const Icon = getIcon(item.icon);
                      return (
                        <li key={idx} className="flex gap-4">
                          <Icon className="w-6 h-6 text-blue-500" />
                          <span className="text-slate-700 font-medium">
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {Array.isArray(meta.ctas) && (
                  <div className="pt-4">
                    {meta.ctas.map((cta, idx) => {
                      const Icon = getIcon(cta.icon);
                      return (
                        <Button key={idx} asChild>
                          <a href={cta.link}>
                            <Icon className="w-4 h-4 mr-2" />
                            {cta.label}
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}