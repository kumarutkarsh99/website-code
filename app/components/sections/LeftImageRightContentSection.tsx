"use client";

import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Button } from "@/app/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface LeftImageRightContentSectionProps {
  data?: {
    title?: string;
    sub_title?: string;
    image?: string | null;
    meta: {
      image?: string;
      badge?: string;
      content?: string;
      ctaPrimary?: {
        url: string;
        label: string;
      };
      ctaSecondary?: {
        url: string;
        label: string;
      };
    };
  };
}

const isValidHref = (href?: string) =>
  typeof href === "string" && href.trim().length > 0;

export default function LeftImageRightContentSection({
  data,
}: LeftImageRightContentSectionProps) {
  if (!data) return null;

  const { title, sub_title, meta, image } = data;

  const safeTitle = title ? DOMPurify.sanitize(title) : "";

  // Parse CMS content (client-side, safe)
  const temp = document.createElement("div");
  temp.innerHTML = meta?.content || "";

  const description = temp.querySelector("p")?.textContent || "";

  const bullets = Array.from(temp.querySelectorAll("span")).map(
    (el) => el.textContent || "",
  );

  const imageUrl = meta.image
    ? meta.image
    : image && image.trim()
      ? `http://72.61.229.100:3001/uploads/sections/${image}`
      : null;

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT IMAGE */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              {/* Glow */}
              <div className="absolute w-[420px] h-[420px] rounded-xl bg-emerald-200/50 blur-3xl" />

              {/* Image card */}
              <div className="relative w-[360px] h-[360px] rounded-xl bg-white shadow-xl overflow-hidden">
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

          {/* RIGHT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="space-y-4 max-w-xl"
          >
            {/* BADGE */}
            {meta?.badge && (
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="inline-flex px-4 py-1.5 rounded-full bg-white shadow text-sm font-semibold text-emerald-600"
              >
                {meta.badge}
              </motion.span>
            )}

            {/* TITLE */}
            {safeTitle && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-3xl lg:text-4xl font-bold text-slate-900"
                dangerouslySetInnerHTML={{ __html: safeTitle }}
              />
            )}

            {/* SUBTITLE */}
            {sub_title && (
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-lg text-slate-600"
              >
                {sub_title}
              </motion.p>
            )}

            {/* DESCRIPTION */}
            {description && (
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-md text-slate-600"
              >
                {description}
              </motion.p>
            )}

            {/* BULLETS */}
            <motion.ul className="space-y-2 pt-2">
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
                  className="flex items-start gap-4"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <span className="text-slate-700 text-sm font-medium mt-1">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            {isValidHref(meta?.ctaPrimary?.url) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={meta!.ctaPrimary!.url}>
                  <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 shadow-md">
                    {meta!.ctaPrimary!.label} →
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
