// lib/clientIcons.ts
import {
  Building2,
  Rocket,
  Globe,
  Cpu,
  Palette,
  Cloud,
  BarChart3,
  Briefcase,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  Factory,
  ShieldCheck,
  Banknote,
  Phone,
  Megaphone,
  Truck,
  Hotel,
  Plane,
  Monitor,
  Wrench,
  Cuboid,
   
  AlarmPlus,
  Building,
  Accessibility
} from "lucide-react";

export const CLIENT_ICONS: Record<string, { label: string; icon: React.ElementType }> =
{
  techcorp: { label: "Tech / Corporate", icon: Cpu },
  startup: { label: "Startup", icon: Rocket },
  enterprise: { label: "Enterprise", icon: Building2 },
  design: { label: "Design Studio", icon: Palette },
  cloud: { label: "Cloud / SaaS", icon: Cloud },
  analytics: { label: "Data / Analytics", icon: BarChart3 },

  business: { label: "Business Services", icon: Briefcase },
  ecommerce: { label: "E-Commerce", icon: ShoppingCart },
  healthcare: { label: "Healthcare", icon: HeartPulse },
  education: { label: "Education", icon: GraduationCap },
  manufacturing: { label: "Manufacturing", icon: Factory },
  security: { label: "Security", icon: ShieldCheck },
  finance: { label: "Finance / Banking", icon: Banknote },
  telecom: { label: "Telecom", icon: Phone },
  marketing: { label: "Marketing / Ads", icon: Megaphone },
  logistics: { label: "Logistics", icon: Truck },
  hospitality: { label: "Hospitality", icon: Hotel },
  travel: { label: "Travel", icon: Plane },
  software: { label: "Software Product", icon: Monitor },
  services: { label: "Professional Services", icon: Wrench },
    // ✅ USP icons (match API icon_key EXACTLY)
  CuboidIcon: { label: "Successful Placements", icon: Cuboid },
  BuildingIcon: { label: "Partner Companies", icon: Building },
  AccessibilityIcon: { label: "Satisfaction Rate", icon: Accessibility },
  AlarmPlusIcon: { label: "Years Experience", icon: AlarmPlus },
};
