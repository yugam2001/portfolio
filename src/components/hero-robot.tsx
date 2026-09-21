"use client";

import Image from "next/image";
import { RobotOrbit } from "./robot-companion";
import { useEffect, useRef } from "react";
import { createRobotRenderer } from "@/lib/robot-renderer";

export function HeroRobot() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useEffect(()=> {
    const canvas=canvasRef.current;
    if(!canvas) return;
    const preference=matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: ReturnType<typeof createRobotRenderer> | undefined;
    let disposed=false, frame=0, x=-.85,y=-.3,tx=-.85,ty=-.3,last=0, smileStart=0, nextSmile=performance.now()+1200, visible=true;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const image=new window.Image();
    const underlay=new window.Image();
    const closed=new window.Image();
    let blinkStart=0,nextBlink=performance.now()+2200,doubleBlink=false;
    const draw=(now:number)=> {
      frame=0;
      const dt=last?Math.min((now-last)/1000,.05):.016;
      last=now;
      const blend=1-Math.exp(-14*dt);
      x+=(tx-x)*blend; y+=(ty-y)*blend;
      if(now>=nextSmile && !preference.matches) {smileStart=now;nextSmile=now+11000+Math.random()*7000;}
      const phase=smileStart?(now-smileStart)/3200:1;
      const smile=preference.matches||phase>=1?.3:.3+.7*Math.sin(Math.PI*phase)**2;
      if(now>=nextBlink&&!preference.matches){
        blinkStart=now;
        const repeat=!doubleBlink&&Math.random()<.12;
        doubleBlink=repeat;
        nextBlink=now+(repeat?480:3000+Math.random()*4000);
      }
      const elapsed=now-blinkStart;
      const ease=(v:number)=>v*v*(3-2*v);
      const blink=preference.matches||!blinkStart||elapsed>340?0:elapsed<95?ease(elapsed/95):elapsed<130?1:1-ease((elapsed-130)/210);
      renderer?.draw(x,y,smile,blink);
      if(visible&&!document.hidden&&!preference.matches) frame=requestAnimationFrame(draw);
    };
    const aim=(a:number,b:number)=> {
      tx=preference.matches?-.85:a;ty=preference.matches?-.3:b;
      if(renderer&&!frame&&!document.hidden&&visible) {last=0;frame=requestAnimationFrame(draw);}
    };
    const move=(event:PointerEvent)=> {
      if(preference.matches||event.pointerType === "touch") return;
      clearTimeout(idleTimer);
      idleTimer=setTimeout(()=>aim(-.85,-.3),2400);
      const rect=canvas.getBoundingClientRect();
      if(rect.bottom<0||rect.top>innerHeight) return;
      const clamp=(v:number)=>Math.max(-1,Math.min(1,v));
      aim(clamp((event.clientX-(rect.left+rect.width*.5))/(rect.width*.5)),clamp((event.clientY-(rect.top+rect.height*.35))/(rect.height*.5)));
    };
    const reset=()=>{clearTimeout(idleTimer);aim(-.85,-.3);};
    const out=(event:PointerEvent)=> {if(!event.relatedTarget) reset();};
    const visibility=()=> {if(document.hidden){cancelAnimationFrame(frame);frame=0;}else reset();};
    const reduced=()=> {reset();};
    const lost=()=> {cancelAnimationFrame(frame);frame=0;canvas.style.opacity="0";};
    const load=()=> {
      if(disposed || !image.complete || !image.naturalWidth || !underlay.complete || !underlay.naturalWidth || !closed.complete || !closed.naturalWidth || renderer) return;
      try {renderer=createRobotRenderer(canvas,image,underlay,closed);renderer.draw(-.85,-.3,.3);canvas.style.opacity="1";reduced();}
      catch {canvas.style.opacity="0";}
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)reset();else{cancelAnimationFrame(frame);frame=0;} });
    observer.observe(canvas);
    image.onload=load;
    underlay.onload=load;
    closed.onload=load;
    image.onerror=underlay.onerror=closed.onerror=()=> {if(!disposed)canvas.style.opacity="0";};
    image.src="/images/hero-android-b.png";
    underlay.src="/images/robot-eye-underlay-b.png";
    closed.src="/images/robot-closed-eyes-b.png";
    window.addEventListener("pointermove",move,{passive:true});
    window.addEventListener("pointerout",out);
    window.addEventListener("blur",reset);
    window.addEventListener("resize",reset);
    document.addEventListener("visibilitychange",visibility);
    preference.addEventListener("change",reduced);
    canvas.addEventListener("webglcontextlost",lost);
    return ()=> {
      disposed=true;clearTimeout(idleTimer);observer.disconnect();cancelAnimationFrame(frame);renderer?.destroy();
      image.onload=null;image.onerror=null;underlay.onload=null;underlay.onerror=null;closed.onload=null;closed.onerror=null;
      window.removeEventListener("pointermove",move);window.removeEventListener("pointerout",out);
      window.removeEventListener("blur",reset);window.removeEventListener("resize",reset);
      document.removeEventListener("visibilitychange",visibility);preference.removeEventListener("change",reduced);
      canvas.removeEventListener("webglcontextlost",lost);
    };
  },[]);
  return <>
    <div className="hero-robot-art">
      <Image src="/images/hero-android-b.png" alt="Silver android with blue eyes" width={1374} height={1145} preload sizes="(max-width: 900px) 100vw, 900px" />
      <canvas ref={canvasRef} aria-hidden="true" />
      <RobotOrbit />
    </div>
  </>;
}
