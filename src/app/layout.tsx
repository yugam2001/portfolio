import type { Metadata } from "next";
import "./globals.css";
import "./sections.css";

export const metadata: Metadata = {
  title: "Yugam Kakkar | Portfolio",
  description: "Yugam Kakkar’s software engineering and artificial intelligence portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
