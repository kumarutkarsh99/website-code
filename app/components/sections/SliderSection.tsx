"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CTA = {
  label: string;
  url: string;
  variant?: "solid" | "outline";
};

type SliderData = {
  title?: string;
  sub_title?: string;
  images?: string[];
  section_key?: string;
  meta?: {
    cta?: CTA[];
  };
};

export default function SliderSection({ data }: { data: SliderData }) {
  const { title, sub_title, images = [], section_key, meta } = data;

  const isSlider = section_key === "slider";

  // ❌ No images → nothing to render
  if (!images.length) return null;

  const [current, setCurrent] = useState(0);
  const total = images.length;

  // Auto slide
  useEffect(() => {
    if (!isSlider || total <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(timer);
  }, [isSlider, total]);

  // ✅ Safe env access (once)
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

  // ✅ Safe image URL builder
  const getImageSrc = (img?: string) => {
    if (!img) return "/placeholder.jpg";

    // Absolute URL already
    if (img.startsWith("http")) return img;

    // Env missing → fallback
    if (!BASE_URL) return "/placeholder.jpg";

    return `${BASE_URL}/uploads/sections/${img}`;
  };

  return (
    <section className="pt-24 pb-10 min-h-[95vh] relative overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        {(title || sub_title) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-4xl font-bold">{title}</h2>}
            {sub_title && <p className="text-gray-600 mt-3">{sub_title}</p>}
          </div>
        )}

        {/* Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[420px] overflow-hidden rounded-xl shadow-lg">
            {images.map((img, index) => {
              const imageSrc = getImageSrc(img);
              const isActive = !isSlider || index === current;

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive ? "opacity-100 z-10" : "opacity-0"
                  }`}
                >
                  {/* ✅ Guarded Image */}
                  <Image
                    src={imageSrc}
                    alt={`slide-${index}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />

                  {/* CTA Overlay */}
                  {meta?.cta?.length && isActive ? (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-center text-white space-y-6">
                        <div className="flex gap-4 justify-center flex-wrap">
                          {meta.cta.map((btn, i) => (
                            <Link
                              key={i}
                              href={btn.url}
                              className={`px-6 py-3 rounded-lg font-medium transition ${
                                btn.variant === "outline"
                                  ? "border border-white text-white hover:bg-white hover:text-black"
                                  : "bg-emerald-600 hover:bg-emerald-700"
                              }`}
                            >
                              {btn.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Controls */}
          {isSlider && total > 1 && (
            <>
              <button
                onClick={() => setCurrent((current - 1 + total) % total)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                aria-label="Previous slide"
              >
                ◀
              </button>

              <button
                onClick={() => setCurrent((current + 1) % total)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                aria-label="Next slide"
              >
                ▶
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-3 h-3 rounded-full transition ${
                      i === current ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
