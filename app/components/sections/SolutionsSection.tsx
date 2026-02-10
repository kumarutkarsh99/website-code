"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Code,
  DollarSign,
  Users,
  Heart,
  Briefcase,
  Workflow,
  Handshake,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

/* ----------------------------------
   ICON MAP (CMS → React)
---------------------------------- */
const iconMap: Record<string, any> = {
  code: Code,
  dollarSign: DollarSign,
  users: Users,
  heart: Heart,

  briefcase: Briefcase,
  workflow: Workflow,
  handshake: Handshake,
};

/* ----------------------------------
   PROPS TYPE (matches backend)
---------------------------------- */
type SolutionsSectionProps = {
  data: {
    meta: {
      header: {
        badge: string;
        title: string;
        subtitle: string;
      };
      specializations: {
        icon: string;
        title: string;
        description: string;
        count: string;
        link?: string;
      }[];
      solutions: {
        icon: string;
        title: string;
        description: string;
      }[];
    };
  };
};

/* ----------------------------------
   COMPONENT
---------------------------------- */
const SolutionsSection = ({ data }: SolutionsSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const { header, specializations, solutions } = data.meta;

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className="text-sm font-semibold tracking-wide uppercase text-teal-600">
                {header.badge}
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {header.title}
            </h2>

            <p className="text-gray-600 mb-10 text-lg">{header.subtitle}</p>

            {/* SPECIALIZATIONS */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {specializations.map((spec, i) => {
                const Icon = iconMap[spec.icon];
                return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { y: 30, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                  >
                    <Card className="p-5 bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all rounded-2xl">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                            {Icon && (
                              <Icon className="w-6 h-6 text-emerald-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-gray-900">
                              {spec.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {spec.description}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm font-bold text-emerald-700 px-2 py-1 rounded-lg bg-emerald-50">
                          {spec.count}
                        </span>
                      </div>

                      {spec.link && (
                        <a
                          href={spec.link}
                          className="text-emerald-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          View Roles
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-lg font-semibold shadow-md flex items-center gap-2">
              View All Industries
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* RIGHT SIDE – SOLUTIONS ACCORDION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 mt-2"
          >
            {solutions.map((solution, index) => {
              const Icon = iconMap[solution.icon];
              const isOpen = openAccordion === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-50/70 border border-gray-200/80 shadow-sm rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full p-5 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-indigo-100 rounded-lg flex items-center justify-center">
                          {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                          {solution.title}
                        </span>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 transition-transform text-black cursor-pointer ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pl-14 text-gray-600">
                        {solution.description}
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}

            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold shadow-lg mt-5"
            >
              Schedule a Free Consultation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
