import { Shaders, Node, GLSL } from 'gl-react';
import React from 'react';
import ndarray from 'ndarray';
const shaders = Shaders.create({
  CustomFilter: {
    frag: GLSL` 
      precision highp float;

      varying vec2 uv;
      uniform int check;
      uniform sampler2D t;
      // uniform float u_texture_1_samplingScale;
      void modifyColor(vec4 color){
        color.r=max(min(color.r,1.0),0.0);
        color.g=max(min(color.g,1.0),0.0);
        color.b=max(min(color.b,1.0),0.0);
        color.a=max(min(color.a,1.0),0.0);
      }
      void main() {
        vec4 original = texture2D(t, uv);
        
        if(check == 2){
          vec4 deltaColor = original + vec4(0.1, 0.1, 0.0, 0.0); // warm colors
          modifyColor(deltaColor);
          gl_FragColor=deltaColor;
        } else{
          gl_FragColor=texture2D(t, vec2( uv.x, uv.y));
        }
      }
    `,
  },
});

// export const colorScale = ndarray(
//   new Float64Array([
//     1.0, 0.97, 0.98, 0.93, 0.91, 0.95, 0.82, 0.82, 0.9, 0.65, 0.74, 0.86, 0.45, 0.66, 0.81, 0.21, 0.56, 0.75, 0.02,
//     0.44, 0.69, 0.02, 0.35, 0.55, 0.01, 0.22, 0.35,
//   ]),
//   [9, 1, 3],
// ).step(-1, 1, 1);
export default function CustomFilter({ active = 0, children: t, scale = 1.0 }) {
  console.log('active', active);
  return (
    <Node
      shader={shaders.CustomFilter}
      uniforms={{
        // u_texture_1_samplingScale: scale,
        check: active === 2 ? 2 : 0,
        t,
      }}
    />
  );
}
