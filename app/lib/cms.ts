// src/lib/cms.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}
export interface WebsiteSettings {
  site_name?: string;
  meta_description?: string;
  contact_number?: string;
  email?: string;
  address?: string;
  social_facebook?:string;
  social_instagram?:string;
  social_linkedin?:string;



}

export interface WebsiteSettingsResponse {
  status: boolean;
  message: string;
  result: WebsiteSettings;
}

type FetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

async function fetchFromCMS<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { cache = "no-store", revalidate } = options;

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    cache,
  };

  if (revalidate !== undefined) {
    fetchOptions.next = { revalidate };
  }
  const res = await fetch(`${API_URL}${endpoint}`, fetchOptions);

  if (!res.ok) {
    throw new Error(
      `CMS request failed: ${endpoint} (${res.status} ${res.statusText})`
    );
  }

  return res.json();
}

/* ===============================
   Public CMS APIs
================================ */

/**
 * Fetch website menus
 */
export function fetchMenu() {
  return fetchFromCMS<{ result: any[] }>(
    "/menus/findAllWebsiteMenu",
    { cache: "no-store" }
  );
}

/**
 * Fetch service/page by slug (ISR enabled)
 */
export function getServiceBySlug(slug: string) {
  return fetchFromCMS<any>(
    `/pages/slug/${slug}`,
    { revalidate: 60 }
  ).catch(() => null); // graceful failure for dynamic routes
}

/**
 * Fetch page data (fully dynamic)
 */
export function getPageData(slug: string) {
  return fetchFromCMS<any>(
    `/pages/slug/${slug}`,
    { cache: "no-store" }
  );

}
export async function fetchwebsiteSetting(): Promise<WebsiteSettingsResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website-settings`, {
      cache: "no-store", // prevents caching
    });
    if (!response.ok) {
      throw new Error("Failed to fetch website settings");
    }
    return await response.json();

  } catch (error) {
    console.error("fetchwebsiteSetting error:", error);

    return {
      status: false,
      message: "Error fetching settings",
      result: {},
    };
  }
}
