"use client";

import React from "react";
import { ClientIcons } from "../client-icons";
import DOMPurify from "dompurify"
interface ClientItem {
  logo?: string | null;
  name: string;
  colors: string;
  icon_key: string;
}

interface Props {
  data: {
    title?: string;
    meta?: {
      client_items?: ClientItem[];
    };
  };
}

const TrustedCompanies: React.FC<Props> = ({ data }) => {
  const companies = Array.isArray(data?.meta?.client_items)
    ? data.meta.client_items
    : [];
     const { title} = data;
 const safeTitle = DOMPurify.sanitize(title || '');
  if (!companies.length) return null;

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Title from CMS */}
          {title && (
              <div
                className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3"
                dangerouslySetInnerHTML={{ __html: safeTitle }}
              />
            )}

            {/* {sub_title && (
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                {sub_title}
              </p>
            )} */}

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10" />

            <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
              {[...companies, ...companies].map((company, idx) => (
                <div key={`${company.name}-${idx}`} className="shrink-0 mx-6 my-3 group">
                  <div
                    className="
                      relative flex items-center gap-3 px-4 py-2 rounded-2xl
                      bg-white/80 border border-gray-200 shadow-sm
                      hover:shadow-xl transition-all duration-500
                      hover:scale-110 hover:-translate-y-1
                    "
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0
                      group-hover:opacity-20 bg-gradient-to-br ${company.colors}`}
                    />

                    <div className="relative z-10 transform group-hover:rotate-12 transition-transform">
                      {ClientIcons[company.icon_key] ?? ClientIcons.startup}
                    </div>

                    <span
                      className={`text-sm font-bold bg-gradient-to-r ${company.colors}
                      bg-clip-text text-transparent whitespace-nowrap relative z-10`}
                    >
                      {company.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedCompanies;
