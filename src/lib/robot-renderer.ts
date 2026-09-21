import { createEyeRenderer } from "./eye-renderer";

// Composite approved eye layers with a localized, subtle mouth-corner lift.
export function createRobotRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement, underlay: HTMLImageElement, closed?: HTMLImageElement) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
  if (!gl) throw new Error("Head preview requires WebGL");
  const eyeCanvas = document.createElement("canvas");
  const eyes = createEyeRenderer(eyeCanvas, image, underlay, closed);
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
      varying vec2 uv; uniform sampler2D artwork; uniform float smile;
      void main(){
        vec2 pixel=uv*vec2(1374.,1145.);
        vec2 left=(pixel-vec2(518.,601.))/vec2(57.,43.);
        vec2 right=(pixel-vec2(665.,651.))/vec2(60.,44.);
        float lift=exp(-dot(left,left)*2.)+exp(-dot(right,right)*2.);
        // Lift both corners along the face’s tilted vertical axis.
        vec2 source=uv+smile*lift*vec2(-5./1374.,15./1145.);
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
    const smile=gl.getUniformLocation(program,"smile");
    return {
      draw(x:number,y:number,expression=0,blink=0){
        const width=Math.min(1200,Math.round(canvas.clientWidth*Math.min(devicePixelRatio,1.5)));
        eyes.draw(x,y,width,blink);
        if(canvas.width!==eyeCanvas.width||canvas.height!==eyeCanvas.height){canvas.width=eyeCanvas.width;canvas.height=eyeCanvas.height;}
        gl.viewport(0,0,canvas.width,canvas.height);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,eyeCanvas);
        gl.uniform1f(smile,expression);
        gl.drawArrays(gl.TRIANGLES,0,6);
      },destroy,
    };
  }catch(error){destroy();throw error;}
}
