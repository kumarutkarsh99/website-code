"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import DOMPurify from "dompurify";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSliderProps {
  data: {
    title?: string;
    sub_title?: string;
    images?: string[];
    meta?: {
      caption?: string;
      primary_cta?: {
        label?: string;
        link?: string;
      };
      secondary_cta?: {
        label?: string;
        link?: string;
      };
    };
  };
}

export default function HeroSlider({ data }: HeroSliderProps) {
  const images = data.images ?? [];
  if (!images.length) return null;

  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {images.map((image, index) => {
          const imageSrc = image
            ? `http://72.61.229.100:3001/uploads/sections/${image}`
            : null;

          if (!imageSrc) return null;

          return (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={imageSrc}
                  alt={`Hero Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-16">
                    <div className="max-w-3xl space-y-4">
                      {data.title && (
                        <h1
                          className="inline-block bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.title),
                          }}
                        />
                      )}

                      {data.sub_title && (
                        <h2
                          className="inline-block bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.sub_title),
                          }}
                        />
                      )}

                      {data.meta?.caption && (
                        <p className="text-gray-900 text-xl font-bold mt-4">
                          {data.meta.caption}
                        </p>
                      )}

                      {/* ✅ ONLY CHANGE: SUPPORT TWO BUTTONS */}
                      {(data.meta?.primary_cta || data.meta?.secondary_cta) && (
                        <div className="flex gap-4 mt-6">
                          {data.meta?.primary_cta?.label &&
                            data.meta?.primary_cta?.link && (
                              <a
                                href={data.meta.primary_cta.link}
                                className="bg-[#0F766E] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
                              >
                                {data.meta.primary_cta.label}
                              </a>
                            )}

                          {data.meta?.secondary_cta?.label &&
                            data.meta?.secondary_cta?.link && (
                              <a
                                href={data.meta.secondary_cta.link}
                                className="bg-white text-[#0F766E] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
                              >
                                {data.meta.secondary_cta.label}
                              </a>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
