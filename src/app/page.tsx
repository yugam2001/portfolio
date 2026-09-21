import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About, Experience, Projects, Skills, AIJourney, Contact } from "@/components/portfolio-sections";
import { SectionEffects } from "@/components/section-effects";
import { navigation } from "@/lib/navigation";

export const metadata: Metadata = { alternates: { canonical: "/" }, openGraph: { url: "https://portfolio-psi-teal-97.vercel.app/", title: "Yugam Kakkar | Software Engineer", description: "Full-stack engineering, ALTAIR, and a journey into artificial intelligence.", type: "website", siteName: "Yugam Kakkar Portfolio", locale: "en_AU" } };

const sections = { home: Hero, about: About, experience: Experience, projects: Projects, skills: Skills, "ai-journey": AIJourney, contact: Contact };

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <SiteHeader />
      <SectionEffects />
      <main>
        {navigation.map(({ id, label }) => {
          const Content = sections[id];
          return (
          <section
            key={id}
            id={id}
            className={`page-section${id === "home" ? " hero-background" : ""}`}
            aria-label={label}
            tabIndex={-1}
          >
            <Content />
          </section>
          );
        })}
      </main>
    </>
  );
}
