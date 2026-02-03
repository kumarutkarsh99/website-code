"use client";

import DOMPurify from "dompurify";
import { CheckCircle2, Code } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";

interface MiddleSectionProps {
  data?: {
    title?: string;
    sub_title?: string;
    meta?: {
      content?: string;
      ctaPrimary?: {
        url: string;
        label: string;
      };
    };
  };
}

export default function MiddleSection({ data }: MiddleSectionProps) {
  if (!data) return null;

  const { title, sub_title, meta } = data;

  // Parse CMS HTML safely (client-only)
  const temp = document.createElement("div");
  temp.innerHTML = meta?.content || "";

  const sectionHeading = temp.querySelector("h3")?.textContent || "";
  const description = temp.querySelector("p")?.textContent || "";
  const bullets = Array.from(temp.querySelectorAll("span")).map(
    (el) => el.textContent || "",
  );

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
          {title && (
            <h2
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(title),
              }}
            />
          )}

          {sub_title && (
            <p className="text-lg lg:text-xl text-slate-600">{sub_title}</p>
          )}
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-200/60 blur-3xl" />

            <div className="relative w-36 h-36 rounded-2xl bg-blue-500 shadow-xl flex items-center justify-center">
              <Code className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="space-y-4 max-w-xl"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className="inline-flex px-4 py-1.5 rounded-full bg-white shadow text-sm font-semibold text-blue-600"
            >
              Custom Quote
            </motion.span>

            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl lg:text-4xl font-bold text-slate-900"
            >
              {sectionHeading}
            </motion.h3>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-md text-slate-600"
            >
              {description}
            </motion.p>

            {/* BULLETS */}
            <motion.ul className="space-y-3 pt-2">
              {bullets.map((item, idx) => (
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
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            {meta?.ctaPrimary && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-base">
                  {meta.ctaPrimary.label} →
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
