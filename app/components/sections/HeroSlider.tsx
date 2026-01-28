"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import DOMPurify from "dompurify";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSliderSectionProps {
  data: {
    title?: string; // HTML
    sub_title?: string; // HTML
    meta?: {
      images?: string[];
      caption?: string;
      cta?: {
        url?: string;
        label?: string;
      };
    };
  };
}

export default function HeroSlider({ data }: HeroSliderSectionProps) {
  const images = data.meta?.images ?? [];

  if (!images.length) return null;

  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <Image
                src={img}
                alt={`Hero Slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-16">
                  {/* FIXED CONTENT COLUMN */}
                  <div className="max-w-3xl flex flex-col items-start gap-4">
                    {/* TITLE */}
                    {data.title && (
                      <h1
                        className="bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md inline-block w-auto max-w-full break-words"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(data.title),
                        }}
                      />
                    )}

                    {/* SUB TITLE */}
                    {data.sub_title && (
                      <h2
                        className="bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md inline-block w-auto max-w-full break-words"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(data.sub_title),
                        }}
                      />
                    )}

                    {/* CAPTION */}
                    {data.meta?.caption && (
                      <p className="text-gray-900 text-xl font-bold mt-2 max-w-xl">
                        {data.meta.caption}
                      </p>
                    )}

                    {/* CTA BUTTON */}
                    {data.meta?.cta?.label && data.meta?.cta?.url && (
                      <a
                        href={data.meta.cta.url}
                        className="mt-6 bg-white text-[#0F766E] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition self-start"
                      >
                        {data.meta.cta.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
