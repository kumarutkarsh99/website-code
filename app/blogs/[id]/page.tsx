"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import DOMPurify from "dompurify";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/footer";
import { Calendar, User } from "lucide-react";

const API_BASE = "http://72.61.229.100:3001";

interface Blog {
  id: number;
  title: string;
  author: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  plain_description: string;
  badge: string | null;
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE}/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 pt-32 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-2xl mb-8" />
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found.
      </div>
    );
  }

  const imageSrc = blog.image_url
    ? `${API_BASE}${blog.image_url}`
    : "/a1-selector-next/blog1.png";

  const safeHTML = DOMPurify.sanitize(blog.plain_description);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Gradient blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-teal-300/20 rounded-full blur-3xl" />
      </div>

      <div>
        <Navigation />

        {/* HERO */}
        <section className="relative pt-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative h-[460px] rounded-3xl overflow-hidden shadow-xl group">
              <Image
                src={imageSrc}
                alt={blog.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Hero Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block bg-emerald-500/90 text-sm px-4 py-1.5 rounded-full mb-4 shadow">
                  {blog.badge ?? "General"}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold leading-tight max-w-3xl">
                  {blog.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 mt-5 text-sm text-white/90">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-semibold">
                      {blog.author.charAt(0)}
                    </div>
                    <span>{blog.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <span className="opacity-80">
                    {Math.max(
                      1,
                      Math.ceil(
                        blog.plain_description
                          .replace(/<[^>]+>/g, "")
                          .split(" ").length / 200,
                      ),
                    )}{" "}
                    min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-4xl mx-auto px-6 mt-14 pb-24">
          <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-8 md:p-12">
            {/* Divider */}
            <div className="h-1 w-20 bg-emerald-500 rounded-full mb-8" />

            <p className="text-lg text-gray-700 leading-relaxed">
              {blog.plain_description}
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
