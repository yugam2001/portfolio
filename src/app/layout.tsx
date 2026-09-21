import type { Metadata } from "next";
import "./globals.css";
import "./sections.css";

const title = "Yugam Kakkar | Software Engineer";
const description = "Explore Yugam Kakkar’s software engineering portfolio, full-stack experience, ALTAIR project, and journey into artificial intelligence. Melbourne-based.";
export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-psi-teal-97.vercel.app"),
  title: { default: title, template: "%s | Yugam Kakkar" },
  description,
  authors: [{ name: "Yugam Kakkar" }],
  creator: "Yugam Kakkar",
  openGraph: { title, description, type: "website", locale: "en_AU", siteName: "Yugam Kakkar Portfolio" },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
