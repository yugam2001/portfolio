"use client";

import { useEffect, useRef } from "react";

export function SectionEffects() {
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const play = (element: Element, frames: Keyframe[], delay = 0, duration = 1000) => {
      const animation = element.animate(frames, { duration, delay, fill: "backwards", easing: "cubic-bezier(.16,1,.3,1)" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        // Unobserve before playing: scrolling back never restarts a reveal.
        observer.unobserve(target);
        target.setAttribute("data-revealed", "true");
        if (preference.matches) return;
        const siblings = target.parentElement ? [...target.parentElement.children].filter(el => el.hasAttribute("data-reveal")) : [];
        const delay = Math.max(0, siblings.indexOf(target)) % 3 * 90;
        if (target.matches(".section-heading")) {
          [...target.children].forEach((part, i) => play(part, [
            { opacity: 0, transform: "translateY(48px)", clipPath: "inset(0 0 100% 0)" },
            { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0% 0)" },
          ], i * 120, 1200));
        } else {
          const lateral = target.matches(".experience-row, .journey-steps li");
          const card = target.matches(".toolkit-card, .principle-card, .project-feature, .altair-feature");
          play(target, [
            { opacity: 0, transform: lateral ? "translateX(36px)" : card ? "perspective(1200px) translateY(55px) rotateX(5deg) scale(.97)" : "translateY(35px)", filter: "blur(4px)" },
            { opacity: 1, transform: "translate(0) scale(1)", filter: "blur(0px)" },
          ], delay, 1100);
          target.querySelectorAll(".tech-tags li, .system-flow span, .contact-main-link").forEach((part, i) => play(part, [
            { opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" },
          ], delay + 200 + i * 65, 700));
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    const chapters = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.setAttribute("data-entered", "true");
        chapters.unobserve(target);
      });
    }, { threshold: .06 });
    document.querySelectorAll(".page-section:not(.hero-background)").forEach(el => chapters.observe(el));
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${distance > 0 ? scrollY / distance : 0})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    const cancel = () => { if (preference.matches) { animations.forEach(animation => animation.cancel()); animations.clear(); } };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    preference.addEventListener("change", cancel);
    return () => {
      observer.disconnect(); chapters.disconnect();
      animations.forEach(animation => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      preference.removeEventListener("change", cancel);
    };
  }, []);
  return <div className="reading-progress" ref={progressRef} aria-hidden="true" />;
}
