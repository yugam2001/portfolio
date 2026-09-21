"use client";

import { useEffect, useRef } from "react";

export function SectionEffects() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<Element, Animation[]>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        animations.get(target)?.forEach(animation => animation.cancel());
        animations.delete(target);
        if (!isIntersecting || preference.matches) return;

        const parts = target.matches(".section-heading") ? [...target.children] : [target];
        const siblings = target.parentElement ? [...target.parentElement.children].filter(el => el.hasAttribute("data-reveal")) : [];
        const stagger = Math.max(0, siblings.indexOf(target)) % 3 * 100;
        animations.set(target, parts.map((part, index) => part.animate(
          [
            { opacity: 0, transform: "translateY(64px) scale(.97)", filter: "blur(5px)" },
            { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0px)" },
          ],
          { duration: 1150, delay: stagger + index * 130, fill: "backwards", easing: "cubic-bezier(.2,.7,.2,1)" },
        )));
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    const motionObserver = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        target.setAttribute("data-in-view", String(isIntersecting));
      });
    });
    document.querySelectorAll(".page-section").forEach(el => motionObserver.observe(el));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${distance > 0 ? scrollY / distance : 0})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    const cancel = () => {
      if (preference.matches) animations.forEach(group => group.forEach(animation => animation.cancel()));
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    preference.addEventListener("change", cancel);
    return () => {
      observer.disconnect();
      motionObserver.disconnect();
      animations.forEach(group => group.forEach(animation => animation.cancel()));
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      preference.removeEventListener("change", cancel);
    };
  }, []);
  return <div className="reading-progress" ref={progressRef} aria-hidden="true" />;
}
