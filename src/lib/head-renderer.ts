import { createEyeRenderer } from "./eye-renderer";

// A restrained 2.5D head deformation. The lower neck and shoulders stay fixed.
// It does not invent geometry hidden in the source photograph.
export function createHeadRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement, underlay: HTMLImageElement) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
  if (!gl) throw new Error("Head preview requires WebGL");
  const eyeCanvas = document.createElement("canvas");
  const eyes = createEyeRenderer(eyeCanvas, image, underlay);
  const shaders: WebGLShader[] = [];
  const program=gl.createProgram(), buffer=gl.createBuffer(), texture=gl.createTexture();
  const destroy=()=> { eyes.destroy(); eyeCanvas.width=0;eyeCanvas.height=0;shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);gl.deleteBuffer(buffer);gl.deleteTexture(texture); };
  const compile=(type:number,source:string)=> {
    const shader=gl.createShader(type);
    if(!shader) throw new Error("Shader allocation failed");
    shaders.push(shader);gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error("Head shader compilation failed");
    return shader;
  };
  try {
    if(!program||!buffer||!texture) throw new Error("Head renderer allocation failed");
    gl.attachShader(program,compile(gl.VERTEX_SHADER,`
      attribute vec2 position; varying vec2 uv;
      void main(){uv=vec2((position.x+1.)*.5,(1.-position.y)*.5);gl_Position=vec4(position,0.,1.);}
    `));
    gl.attachShader(program,compile(gl.FRAGMENT_SHADER,`
      precision highp float;
      varying vec2 uv; uniform sampler2D artwork; uniform vec2 head;
      void main(){
        // Full head response above the jaw, smoothly anchored through the neck.
        float weight=1.-smoothstep(.62,.84,uv.y);
        float angle=head.x*.105*weight;
        vec2 pivot=vec2(.53,.75);
        vec2 p=(uv-pivot)*vec2(1.2,1.);
        float c=cos(angle),s=sin(angle);
        p=mat2(c,-s,s,c)*p;
        // Small yaw/pitch cues, deliberately much smaller than the lateral tilt.
        p.x=(p.x-head.x*.012*weight)/(1.-abs(head.x)*.025*weight);
        p.y=(p.y-head.y*.006*weight)/(1.-head.y*.025*weight);
        vec2 source=p/vec2(1.2,1.)+pivot;
        if(source.x<0.||source.x>1.||source.y<0.||source.y>1.) gl_FragColor=vec4(.012,.024,.035,1.);
        else gl_FragColor=texture2D(artwork,source);
      }
    `));
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error("Head shader linking failed");
    gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const position=gl.getAttribLocation(program,"position");gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program,"artwork"),0);
    const head=gl.getUniformLocation(program,"head");
    return {
      draw(x:number,y:number,hx=0,hy=0){
        const width=Math.min(1200,Math.round(canvas.clientWidth*Math.min(devicePixelRatio,1.5)));
        eyes.draw(x,y,width);
        if(canvas.width!==eyeCanvas.width||canvas.height!==eyeCanvas.height){canvas.width=eyeCanvas.width;canvas.height=eyeCanvas.height;}
        gl.viewport(0,0,canvas.width,canvas.height);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,eyeCanvas);
        gl.uniform2f(head,Math.max(-1,Math.min(1,hx)),Math.max(-1,Math.min(1,hy)));
        gl.drawArrays(gl.TRIANGLES,0,6);
      },destroy,
    };
  }catch(error){destroy();throw error;}
}
