"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/navigation";

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    for (const { id } of navigation) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="topbar">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="Yugam Kakkar — home">
          <svg className="brand-mark" viewBox="0 0 28 32" fill="none" aria-hidden="true">
            <path d="M1 3h8l6 10-4 7L1 3Z" fill="#AAB7FF" />
            <path d="M20 3h8L16 24l-1 7H7l2-10L20 3Z" fill="#899BFF" />
          </svg>
          <span>Yugam Kakkar</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          ref={menuButton}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d={menuOpen ? "m6 6 12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>

        <nav id="primary-navigation" className={`primary-navigation${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link"
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => {
                setMenuOpen(false);
                document.getElementById(id)?.focus({ preventScroll: true });
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <a className="connect-link" href="#contact" onClick={() => setMenuOpen(false)}>
          <span>Let&apos;s Connect</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" />
          </svg>
        </a>
      </div>
    </header>
  );
}
