"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
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
        {/* SLIDE 1 – Talent Hiring */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Image
              src="/a1-selector-next/slider1.jpg"
              alt="Recruitment Solutions"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-16">
                <div className="max-w-3xl space-y-4">
                  <h1 className="inline-block bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md">
                    Right Talent
                  </h1>

                  <h2 className="inline-block bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md">
                    For The Right Role
                  </h2>

                  <p className="text-gray-900 text-xl font-bold mt-4">
                    End-to-end recruitment solutions tailored to your business
                    needs
                  </p>

                  <button className="mt-6 bg-white text-[#0F766E] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition">
                    Hire Talent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 – IT & Non-IT Recruitment */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Image
              src="/a1-selector-next/slider2.jpg"
              alt="IT and Non IT Recruitment"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto p-16">
                <div className="max-w-3xl space-y-4">
                  <h1 className="inline-block bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md">
                    IT & Non-IT
                  </h1>

                  <h2 className="inline-block bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md">
                    Recruitment Experts
                  </h2>

                  <p className="text-gray-900 text-xl font-bold mt-4">
                    Connecting skilled professionals with growing organizations
                  </p>

                  <button className="mt-6 bg-white text-[#0F766E] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition">
                    Explore Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 – Career Growth */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <Image
              src="/a1-selector-next/slider3.jpg"
              alt="Career Opportunities"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto p-16">
                <div className="max-w-3xl space-y-4">
                  <h1 className="inline-block bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md">
                    Building Careers
                  </h1>

                  <h2 className="inline-block bg-[#0F766E] text-white text-5xl md:text-6xl font-bold px-6 py-3 rounded-md">
                    Empowering Businesses
                  </h2>

                  <p className="text-gray-900 text-xl font-bold mt-4">
                    Trusted recruitment partner for long-term success
                  </p>

                  <button className="mt-6 bg-white text-[#0F766E] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
