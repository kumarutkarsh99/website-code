"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/app/components/footer";
import Navigation from "@/app/components/Navigation";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import JourneySection from "./sections/JourneySection";
import ValuesSection from "./sections/ValuesSection";
import LeadershipSection from "./sections/LeadershipSection";
import LeftImageRightContentSection from "./sections/LeftImageRightContentSection";
import RightImageLeftContentSectionn from "./sections/RightImageLeftContentSection";
import SliderSection from "./sections/SliderSection";
import USPList from "./sections/USPList";
import HeroSlider from "./sections/HeroSlider";
import TrustedCompanies from "./sections/TrustedCompanies";
import Testimonial from "./sections/Testimonial";
import FaqSection from "./sections/FaqSection";
import { useMemo } from "react";
import MiddleSection from "./sections/MiddleSection";
import WhyChooseUs from "./sections/WhyChooseUs";
import Solutions from "./sections/SolutionsSection";
import JobListings from "./sections/JobsListings";

interface PageRendererProps {
  page: {
    title: string;
    sections: any[];
  };
}
const PageRenderer: React.FC<PageRendererProps> = ({ page }) => {
  const [isVisible, setIsVisible] = useState<{ [key: number]: boolean }>({});
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".scroll-reveal").forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
          setIsVisible((prev) => ({ ...prev, [i]: true }));
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const renderedSections = useMemo(() => {
    if (!page?.sections || !Array.isArray(page.sections)) return [];

    // 1️⃣ Remove duplicates (same section_key + sort_order + title)
    const uniqueMap = new Map<string, any>();

    page.sections.forEach((section) => {
      const uniqueKey = `${section.section_key}-${section.sort_order}-${section.title}`;
      if (!uniqueMap.has(uniqueKey)) {
        uniqueMap.set(uniqueKey, section);
      }
    });

    // 2️⃣ Sort by sort_order → id
    return Array.from(uniqueMap.values()).sort((a, b) => {
      if (a.sort_order === b.sort_order) {
        return a.id - b.id;
      }
      return a.sort_order - b.sort_order;
    });
  }, [page?.sections]);

  if (!page?.sections?.length) return null;

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      {renderedSections.map((section) => {
        console.log(section, "section");

        switch (section.section_key) {
          case "hero":
            return <HeroSection key={section.id} data={section} />;
          case "leftImageRightContent":
            return (
              <LeftImageRightContentSection key={section.id} data={section} />
            );
          case "middleContent":
            return <MiddleSection key={section.id} data={section} />;
          case "rightImageLeftContent":
            return (
              <RightImageLeftContentSectionn key={section.id} data={section} />
            );
          case "stats":
            return <StatsSection key={section.id} data={section} />;
          case "timeline":
            return <JourneySection key={section.id} data={section} />;
          case "values":
            return <ValuesSection key={section.id} data={section} />;
          case "leadership":
            return <LeadershipSection key={section.id} data={section} />;
          case "slider":
            // return <SliderSection key={section.id} data={section} />;
            return <HeroSlider key={section.id} data={section} />;
          case "usp_items":
            return <USPList key={section.id} data={section} />;
          case "clientsLogoSlider":
            return <TrustedCompanies key={section.id} data={section} />;
          case "testimonials":
            return <Testimonial key={section.id} data={section} />;
          case "why_choose":
            return <WhyChooseUs key={section.id} data={section} />;
          case "solutions":
            return <Solutions key={section.id} data={section} />;
          case "faq":
            // Map API structure to FaqSection props
            const faqData = {
              faq_title: section.meta.faq_title || section.title,
              sub_title: section.sub_title || null,
              faq_items: section.meta.faq_items || [],
            };
            return <FaqSection key={section.id} data={faqData} />;

             case "jobs":
            return <JobListings  key={section.id}  data={section}   />;

          default:
            console.warn("Unhandled section:", section.section_key);
            return null;
        }
      })}

      {/* Animation Styles */}
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .scroll-reveal { 
          opacity: 0; 
          transform: translateY(50px); 
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .scroll-reveal.visible { 
          opacity: 1; 
          transform: translateY(0); 
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default PageRenderer;
