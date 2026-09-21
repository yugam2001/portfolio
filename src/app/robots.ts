import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://portfolio-psi-teal-97.vercel.app/sitemap.xml" };
}
