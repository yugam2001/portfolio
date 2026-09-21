// Separate eye surfaces and iris layers in original artwork coordinates.
// The eye-opening clips never move: they preserve the original eyelids and face.
const eyes = [
  {
    opening: "M510 351 C508 326 523 310 545 309 C578 309 608 342 612 384 Q614 401 602 398 C572 393 539 387 520 375 Q510 366 510 351 Z",
    iris: { x: 539, y: 345, rx: 28, ry: 35, rotation: .30 },
    rest: { x: 556, y: 349 },
    range: { x: 20, y: 13 },
  },
  {
    opening: "M737 443 C750 417 770 399 795 399 C831 401 860 428 871 461 Q874 472 853 478 C822 484 789 470 764 459 L738 450 Q734 447 737 443 Z",
    iris: { x: 776, y: 435, rx: 32, ry: 34, rotation: .55 },
    rest: { x: 797, y: 439 },
    range: { x: 25, y: 13 },
  },
];

export function createEyeRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement, underlay: HTMLImageElement, closed?: HTMLImageElement) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Canvas rendering unavailable");
  const layers = eyes.map(eye => {
    const iris = document.createElement("canvas");
    iris.width = image.naturalWidth;
    iris.height = image.naturalHeight;
    const ctx = iris.getContext("2d");
    if (!ctx) throw new Error("Unable to prepare iris layer");
    ctx.beginPath();
    ctx.ellipse(eye.iris.x,eye.iris.y,eye.iris.rx,eye.iris.ry,eye.iris.rotation,0,Math.PI*2);
    ctx.clip();
    ctx.drawImage(image,0,0);
    const lid = document.createElement("canvas");
    lid.width=image.naturalWidth;lid.height=image.naturalHeight;
    const lidContext=lid.getContext("2d")!;
    if(closed){
      lidContext.drawImage(closed,0,0,image.naturalWidth,image.naturalHeight);
      lidContext.globalCompositeOperation="destination-in";
      lidContext.translate(eye.rest.x,eye.rest.y+8);
      lidContext.rotate(.32);
      lidContext.scale(eye.range.x===20?78:97,65);
      const feather=lidContext.createRadialGradient(0,0,.72,0,0,1);
      feather.addColorStop(0,"black");feather.addColorStop(1,"transparent");
      lidContext.fillStyle=feather;lidContext.fillRect(-1,-1,2,2);
    }
    return { ...eye, lid, clip: new Path2D(eye.opening), irisLayer: iris };
  });
  const open=document.createElement("canvas");
  open.width=image.naturalWidth;open.height=image.naturalHeight;
  const openContext=open.getContext("2d")!;
  return {
    draw(x: number,y: number, renderWidth?: number, blink=0) {
      const width=Math.min(image.naturalWidth,renderWidth ?? Math.round(canvas.clientWidth*Math.min(devicePixelRatio,2)));
      const height=Math.round(width*image.naturalHeight/image.naturalWidth);
      if(canvas.width!==width||canvas.height!==height) {canvas.width=width;canvas.height=height;}
      const scale=width/image.naturalWidth;
      context.setTransform(scale,0,0,scale,0,0);
      context.drawImage(image,0,0);
      for (const eye of layers) {
        context.save();
        context.clip(eye.clip);
        context.drawImage(underlay,0,0,image.naturalWidth,image.naturalHeight);
        // Clamp diagonal travel to an ellipse rather than pushing into corners.
        const length=Math.max(1,Math.hypot(x,y));
        const dx=eye.rest.x-eye.iris.x+(x/length)*eye.range.x;
        const dy=eye.rest.y-eye.iris.y+(y/length)*eye.range.y;
        // Use B’s painted iris at its native proportions without recoloring or stretching.
        context.translate(eye.iris.x + dx, eye.iris.y + dy);
        context.drawImage(eye.irisLayer,-eye.iris.x,-eye.iris.y);
        context.restore();
      }
      if(closed && blink>0){
        openContext.clearRect(0,0,open.width,open.height);
        openContext.drawImage(canvas,0,0,open.width,open.height);
        for(const eye of layers){
          context.save();
          context.globalAlpha=Math.min(1,blink*6);
          context.drawImage(eye.lid,0,0);
          context.restore();
          if(blink<.995){
            // Shrink only the visible aperture; the eyeball texture never scales.
            const pivotX=eye.rest.x, pivotY=eye.rest.y+23;
            const matrix=new DOMMatrix().translate(pivotX,pivotY).rotate(18).scale(1,1-blink).rotate(-18).translate(-pivotX,-pivotY);
            const aperture=new Path2D();aperture.addPath(eye.clip,matrix);
            context.save();context.clip(aperture);context.drawImage(open,0,0);context.restore();
          }
        }
      }
    },
    destroy() {open.width=0;open.height=0;layers.forEach(({irisLayer,lid})=>{irisLayer.width=0;irisLayer.height=0;lid.width=0;lid.height=0;});},
  };
}
