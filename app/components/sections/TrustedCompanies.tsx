"use client";

import React from "react";
import Image from "next/image";
import { ClientIcons } from "../client-icons";

interface ClientItem {
  logo?: string | null;
  name: string;
  colors?: string;
  icon_key?: string;
}

interface Props {
  data: {
    title?: string;
    meta?: {
      client_items?: ClientItem[];
    };
  };
}

/* ---------------- Icon Resolver ---------------- */

const getClientIcon = (key?: string) => {
  if (!key) return ClientIcons.startup;
  return ClientIcons[key as keyof typeof ClientIcons] ?? ClientIcons.startup;
};

/* ---------------- Component ---------------- */

const TrustedCompanies: React.FC<Props> = ({ data }) => {
  const companies = Array.isArray(data?.meta?.client_items)
    ? data.meta.client_items
    : [];

  if (!companies.length) return null;

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* -------- Title -------- */}
          {data?.title && (
            <h2
              className="text-center mb-12 text-4xl font-bold text-gray-900"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          )}

          {/* -------- Scroll Wrapper -------- */}
          <div className="relative overflow-hidden">
            {/* Fade overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
              {[...companies, ...companies].map((company, idx) => {
                const hasLogo =
                  typeof company.logo === "string" &&
                  company.logo.trim().length > 0;

                return (
                  <div
                    key={`${company.name}-${idx}`}
                    className="shrink-0 mx-5 my-3 group"
                  >
                    <div
                      className="
      relative flex items-center justify-center
      px-6 py-4 rounded-xl
      bg-white border border-gray-200
      shadow-sm hover:shadow-lg
      transition-all duration-300
      hover:scale-105
      min-w-[180px]
      h-[50px]
    "
                    >
                      {/* Hover Gradient */}
                      <div
                        className={`
        absolute inset-0 rounded-xl opacity-0
        group-hover:opacity-20
        bg-gradient-to-br
        ${company.colors || "from-gray-200 to-gray-300"}
        transition-opacity duration-300
      `}
                      />

                      {/* Logo OR Icon */}
                      <div className="relative z-10 flex items-center justify-center w-full h-full">
                        {typeof company.logo === "string" &&
                        company.logo.trim().length > 0 ? (
                          <Image
                            src={company.logo}
                            alt={company.name}
                            width={140}
                            height={60}
                            className="object-contain max-h-[30px] w-auto"
                            unoptimized
                          />
                        ) : (
                          getClientIcon(company.icon_key)
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* -------- Animation -------- */}
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
