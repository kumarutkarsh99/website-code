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

  const hasServices = Array.isArray(meta.services) && meta.services.length > 0;

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-white">
      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* ---------------------------- TOP HEADER ---------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-10"
        >
          {meta.badge && (
            <span className="inline-block mb-3 px-5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold">
              {meta.badge}
            </span>
          )}

          {meta.heading?.headingTitle && (
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 leading-tight">
              {meta.heading.headingTitle}
            </h2>
          )}

          {meta.heading?.headingsubtitle && (
            <p className="text-base lg:text-lg text-slate-600">
              {meta.heading.headingsubtitle}
            </p>
          )}
        </motion.div>

        {/* --------------------------- MAIN CONTENT --------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute w-[360px] h-[360px] rounded-full bg-blue-200/50 blur-3xl" />

            {imageSrc && (
              <div className="relative w-[320px] lg:w-[360px] rounded-2xl overflow-hidden shadow-xl bg-white">
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
            className="space-y-5 max-w-xl"
          >
            {/* ===================== SERVICES MODE ===================== */}
            {hasServices ? (
              meta.services!.map((service, sIdx) => (
                <motion.div
                  key={sIdx}
                  className="space-y-4 pb-6 border-b last:border-b-0"
                >
                  {service.badge && (
                    <span className="inline-flex px-4 py-1.5 rounded-full bg-white shadow text-sm font-semibold text-blue-600">
                      {service.badge}
                    </span>
                  )}

                  {service.title && (
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                      {service.title}
                    </h3>
                  )}

                  {Array.isArray(service.features) && (
                    <ul className="space-y-3 pt-1">
                      {service.features.map((item, idx) => {
                        const Icon = getIcon(item.icon);
                        return (
                          <li key={idx} className="flex gap-3">
                            <Icon className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <span className="text-slate-700 font-medium text-sm leading-relaxed">
                              {item.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {Array.isArray(service.ctas) && (
                    <div className="pt-5 flex gap-3 flex-wrap">
                      {service.ctas.map((cta, idx) => {
                        const Icon = getIcon(cta.icon);
                        return (
                          <Button key={idx} asChild>
                            <a
                              href={cta.link || "#"}
                              className="inline-flex items-center gap-2"
                            >
                              <Icon className="w-4 h-4" />
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
              /* ===================== LEGACY MODE ===================== */
              <>
                {meta.rightsectionbadge && (
                  <span className="inline-flex px-4 py-1.5 rounded-full bg-white shadow text-sm font-semibold text-blue-600">
                    {meta.rightsectionbadge}
                  </span>
                )}

                {meta.rightsectiontitle && (
                  <h3 className="text-2xl font-bold text-slate-900">
                    {meta.rightsectiontitle}
                  </h3>
                )}

                {meta.rightsectiondescription && (
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {meta.rightsectiondescription}
                  </p>
                )}

                {Array.isArray(meta.points) && (
                  <ul className="space-y-3 pt-1">
                    {meta.points.map((item, idx) => {
                      const Icon = getIcon(item.icon);
                      return (
                        <li key={idx} className="flex gap-3">
                          <Icon className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                          <span className="text-slate-700 font-medium text-sm">
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {Array.isArray(meta.ctas) && (
                  <div className="pt-5">
                    {meta.ctas.map((cta, idx) => {
                      const Icon = getIcon(cta.icon);
                      return (
                        <Button key={idx} asChild>
                          <a
                            href={cta.link}
                            className="inline-flex items-center gap-2 text-emerald-600 cursor-pointer"
                          >
                            <Icon className="w-4 h-4" />
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
