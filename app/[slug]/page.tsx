import { getPageData } from "@/app/lib/cms";
import { notFound } from "next/navigation";
import PageRenderer from "@/app/components/PageRenderer";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

// ✅ This controls browser title + meta tags
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
 const { slug } = await params;
  const pageData = await getPageData(slug);

  if (!pageData?.data?.result) {
    return {
      title: "Page Not Found",
      description: "Page not found",
    };
  }
  const page = pageData.data.result;
    return {
    title: page.meta_title || page.title || "Page",
    description: page.meta_description || "",
  };
  }

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Fetch page data dynamically from CMS
  const pageData = await getPageData(slug);

  // If no page found, render 404
  if (!pageData?.data?.result) notFound();

  const page = pageData.data.result;

  return <PageRenderer page={page} />;
}
