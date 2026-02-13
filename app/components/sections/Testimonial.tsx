"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import DOMPurify from "dompurify";

/* ---------------- Types ---------------- */

interface TestimonialType {
  id: number;
  message: string;
  author_name: string;
  author_designation: string;
  company?: string;
  avatar?: string;
}

interface TestimonialSection {
  title?: string;
  sub_title?: string;
  colors?: string;
}

interface Props {
  data: TestimonialSection;
}

/* ---------------- Component ---------------- */

const Testimonial: React.FC<Props> = ({ data }) => {
  const { title, sub_title, colors = "from-emerald-500 to-teal-500" } = data;

  const safeTitle = title ? DOMPurify.sanitize(title) : "";

  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const sectionRef = useRef<HTMLElement>(null);

  /* ---------------- Fetch ---------------- */

  useEffect(() => {
    fetch("http://72.61.229.100:3001/testimonials")
      .then((res) => res.json())
      .then(setTestimonials)
      .catch(console.error);
  }, []);

  /* ---------------- Auto Scroll ---------------- */

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    const timer = setInterval(() => handleNext(), 5000);
    return () => clearInterval(timer);
  }, [activeIndex, isAutoPlaying, testimonials.length]);

  /* ---------------- Helpers ---------------- */

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  /* ---------------- Handlers ---------------- */

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((p) => (p + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  if (!testimonials.length) return null;

  /* ---------------- JSX ---------------- */

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 bg-gradient-to-br via-white overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          {safeTitle && (
            <div
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              dangerouslySetInnerHTML={{ __html: safeTitle }}
            />
          )}
          {sub_title && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {sub_title}
            </p>
          )}
        </div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Arrows */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10
              bg-white hover:bg-gradient-to-r hover:${colors}
              text-gray-700 hover:text-white rounded-full p-3 shadow-lg`}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={handleNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-10
              bg-white hover:bg-gradient-to-r hover:${colors}
              text-gray-700 hover:text-white rounded-full p-3 shadow-lg`}
          >
            <ChevronRight />
          </button>

          {/* Cards */}
          <div className="relative h-[320px]">
            {testimonials.map((t, i) => {
              const active = i === activeIndex;

              return (
                <div
                  key={t.id}
                  className={`absolute inset-0 transition-all duration-700
                    ${active ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    {/* Quote */}
                    <div
                      className={`mx-auto mb-4 w-14 h-14 rounded-full
                        bg-gradient-to-r ${colors}
                        flex items-center justify-center`}
                    >
                      <Quote className="text-white" />
                    </div>

                    <p className="text-lg italic text-gray-700 mb-6">
                      “{t.message}”
                    </p>

                    {/* Author */}
                    <div className="flex flex-col items-center gap-2">
                      {t.avatar && !imageError[t.id] ? (
                        <img
                          src={t.avatar}
                          alt={t.author_name}
                          onError={() =>
                            setImageError((prev) => ({
                              ...prev,
                              [t.id]: true,
                            }))
                          }
                          className="w-14 h-14 rounded-full border-4 border-white shadow object-cover"
                        />
                      ) : (
                        <div
                          className={`w-14 h-14 rounded-full border-4 border-white shadow
                            bg-gradient-to-r ${colors}
                            flex items-center justify-center text-white font-semibold`}
                        >
                          {getInitials(t.author_name)}
                        </div>
                      )}

                      <p className="font-semibold text-gray-900">
                        {t.author_name}
                      </p>

                      <p className="text-sm text-gray-600">
                        {t.author_designation}
                        {t.company && (
                          <span className="text-teal-600 font-medium">
                            {" "}
                            @ {t.company}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === i
                    ? `w-8 bg-gradient-to-r ${colors}`
                    : "w-2.5 bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Progress */}
          {isAutoPlaying && (
            <div className="mt-4 max-w-sm mx-auto">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${colors} animate-progress`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
