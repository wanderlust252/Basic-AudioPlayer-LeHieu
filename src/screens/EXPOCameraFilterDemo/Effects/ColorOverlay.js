import { Shaders, Node, GLSL } from 'gl-react';
import React from 'react';

import * as ShadersFunctions from '../utils/shaders-functions';

const shaders = Shaders.create({
  ColorOverlay: {
    frag: GLSL` 
      precision highp float;

      varying vec2 uv;
      uniform sampler2D t;
      uniform int check;
      vec4 overlay(vec4 a, vec4 b)
      {
        vec4 x = vec4(2.0) * a * b;
        vec4 y = vec4(1.0) - vec4(2.0) * (vec4(1.0)-a) * (vec4(1.0)-b);
        vec4 result;
        result.r = mix(x.r, y.r, float(a.r > 0.5));
        result.g = mix(x.g, y.g, float(a.g > 0.5));
        result.b = mix(x.b, y.b, float(a.b > 0.5));
        result.a = mix(x.a, y.a, float(a.a > 0.5));
        return result;
      }
      vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
        vec4 color = vec4(0.0);
        vec2 off1 = vec2(1.3846153846) * direction;
        vec2 off2 = vec2(3.2307692308) * direction;
        color += texture2D(image, uv) * 0.2270270270;
        color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
        color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
        color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
        color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
        return color;
      }
      void main() {
        vec4 c = texture2D(t, uv);
        if(check == 1){
          // vec4 blur = blur9(t, uv, resolution, direction);
          gl_FragColor = overlay(c,c);
        } else{
          gl_FragColor=texture2D(t, vec2( uv.x, uv.y));
        }
       
      }
    `,
  },
});

export const DefaultValue = [0.0, 0.0, 0.0, 0.0];

export default function ColorOverlay({ active = 0, children: t }) {
  console.log('active', active);
  return (
    <Node
      shader={shaders.ColorOverlay}
      uniforms={{
        check: active === 1 ? 1 : 0,
        t,
      }}
    />
  );
}
