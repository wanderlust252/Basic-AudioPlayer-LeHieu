import { Shaders, Node, GLSL } from 'gl-react';
import React from 'react';

const shaders = Shaders.create({
  temperature: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float red;
    void main() {
      gl_FragColor = vec4(red, uv.y,  uv.z, 1.0);
    }
    `,
  },
});

export default function CustomFilter({ red = 0.5, children: t }) {
  return (
    <Node
      shader={shaders.temperature}
      uniforms={{
        red,
        t,
      }}
    />
  );
}
