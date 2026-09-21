"use client";

import { useEffect, useRef, useState } from "react";

const thoughts = [
  { title: "Hey there!", text: "Move your cursor. You’ve caught my attention." },
  { title: "Meet ALTAIR", text: "Curious about AI? Explore Yugam’s featured project." },
  { title: "Behind the build", text: "React, Node.js and TypeScript are part of Yugam’s toolkit." },
  { title: "A little backstory", text: "Nearly four years spent building web products. See the journey." },
  { title: "Ideas welcome", text: "Have a project in mind? Say hello to Yugam." },
  { title: "What’s next?", text: "Follow Yugam’s journey into artificial intelligence." },
];

export function RobotCompanion() {
  const bubble = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const rect=bubble.current?.getBoundingClientRect();
      if(document.hidden||matchMedia("(prefers-reduced-motion: reduce)").matches||!rect||rect.bottom<0||rect.top>innerHeight||bubble.current?.matches(":hover, :focus-within")) return;
      setIndex(current => (current+1+Math.floor(Math.random()*(thoughts.length-1)))%thoughts.length);
    }, 8500);
    return ()=>clearInterval(timer);
  }, []);
  const thought=thoughts[index];
  return <>
    <aside ref={bubble} className="robot-greeting" aria-label="Robot thoughts">
      <div key={index} className="robot-thought"><p>{thought.title}</p><span>{thought.text}</span></div>
      <svg viewBox="0 0 200 32" fill="none" aria-hidden="true"><path d="M0 20h18l7-5 6 7 5-13 7 19 7-8 7 2 7-5 9 3h24l5-3 6 4 7-1h18l4-4 5 7 7-3h51" stroke="currentColor" /></svg>
    </aside>
  </>;
}

// The foreground silhouette masks both orbit strokes, so they can never cross the face.
export function RobotOrbit() {
  const orbit = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = orbit.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let angle = 0, target = 0, frame = 0, last = 0;
    const draw = (now: number) => {
      const dt = last ? Math.min((now-last)/1000,.05) : .016;
      last = now;
      const delta = Math.atan2(Math.sin(target-angle), Math.cos(target-angle));
      angle += delta * (1-Math.exp(-8*dt));
      element.style.setProperty("--orbit-angle", `${angle}rad`);
      frame = Math.abs(delta) > .001 ? requestAnimationFrame(draw) : 0;
    };
    const move = (event: PointerEvent) => {
      if (preference.matches || event.pointerType === "touch") return;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const x = event.clientX-rect.left-rect.width*(775/1374);
      const y = event.clientY-rect.top-rect.height*(520/1145);
      if (Math.hypot(x,y)<12) return;
      // The arc starts at twelve o’clock and faces away from the pointer.
      target = Math.atan2(y,x)-Math.PI/2;
      if (!frame) {last=0;frame=requestAnimationFrame(draw);}
    };
    const reset=()=>{cancelAnimationFrame(frame);frame=0;angle=target=0;element.style.setProperty("--orbit-angle","0rad");};
    window.addEventListener("pointermove",move,{passive:true});
    window.addEventListener("blur",reset);
    preference.addEventListener("change",reset);
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener("pointermove",move);window.removeEventListener("blur",reset);preference.removeEventListener("change",reset);};
  }, []);
  return <div ref={orbit} className="robot-orbit" aria-hidden="true">
    <svg viewBox="0 0 1374 1145" fill="none">
      <defs><mask id="robot-orbit-occlusion"><rect width="1374" height="1145" fill="white" />
        <path d="M0 1145V1060Q130 942 370 893L491 831L507 754Q443 707 432 587Q415 506 443 398Q443 335 490 270Q521 145 668 76Q809 2 942 25Q1124 30 1173 172Q1225 286 1153 424Q1112 510 1050 608L960 766L1000 842Q1227 873 1374 1020V1145Z" fill="black" />
      </mask></defs>
      <g mask="url(#robot-orbit-occlusion)">
        <ellipse cx="775" cy="520" rx="500" ry="490" stroke="#617a95" strokeOpacity=".18" />
        <circle cx="775" cy="520" r="510" stroke="#7c9ab2" strokeOpacity=".22" />
        <g className="robot-orbit-highlight"><path d="M520 78.33 A510 510 0 0 1 1030 78.33" stroke="#9bb9d2" strokeOpacity=".65" strokeWidth="1.2" /></g>
      </g>
    </svg>
  </div>;
}
