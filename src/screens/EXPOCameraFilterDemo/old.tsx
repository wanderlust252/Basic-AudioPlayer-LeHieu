import { Camera } from 'expo-camera';
import * as GL from 'expo-gl';
import { GLView } from 'expo-gl';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const vertShaderSource = `#version 300 es
precision highp float;

in vec2 position;
out vec2 uv;

void main() {
  uv = position;
  gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
}`;

const fragShaderSource = `#version 300 es
precision highp float;
uniform sampler2D cameraTexture;
in vec2 uv;
out vec4 fragColor;

void main() {

  fragColor = vec4(texture(cameraTexture, uv).rgb, 1.0);
}`;
const fragShaderSourceWarm = `#version 300 es
precision highp float;
uniform sampler2D cameraTexture;
in vec2 uv;
out vec4 fragColor;
void modifyColor(vec4 color){
  color.r=max(min(color.r,1.0),0.0);
  color.g=max(min(color.g,1.0),0.0);
  color.b=max(min(color.b,1.0),0.0);
  color.a=max(min(color.a,1.0),0.0);
}
void main() {
  vec4 color = texture(cameraTexture, uv);
  vec4 deltaColor = color + vec4(0.1, 0.1, 0.0, 0.0); // warm colors
  modifyColor(deltaColor);
  fragColor=deltaColor;
  // fragColor = vec4(texture(cameraTexture, uv).rgb+0.5, 1.0);
}`;
interface State {
  zoom: number;
  type: any;
  warm: boolean;
  key0: number;
}

// See: https://github.com/expo/expo/pull/10229#discussion_r490961694
// eslint-disable-next-line @typescript-eslint/ban-types
let a = false;
class GLCameraScreen extends React.Component<{}, State> {
  static title = 'Expo.Camera integration';

  readonly state: State = {
    zoom: 0,
    type: Camera.Constants.Type.back,
    warm: false,
    key0: 0,
  };

  _rafID?: number;
  camera?: Camera;
  glView?: GL.GLView;
  texture?: any;
  contextRef?: GL.ExpoWebGLRenderingContext;

  componentWillUnmount() {
    if (this._rafID !== undefined) {
      cancelAnimationFrame(this._rafID);
    }
  }

  async createCameraTexture(): Promise<any> {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    return this.glView!.createCameraTextureAsync(this.camera!);
  }
  toggleFilter = () => {
    a = !a;
    // this.setState({ warm: !this.state.warm }, () => {
    //   this.setState({ key0: this.state.key0 + 1 });
    // });
  };
  onContextCreate = async (gl: GL.ExpoWebGLRenderingContext) => {
    // Create texture asynchronously
    this.texture = await this.createCameraTexture();
    const cameraTexture = this.texture;
    this.contextRef = gl;

    // Compile vertex and fragment shaders
    const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertShader, vertShaderSource);
    gl.compileShader(vertShader);

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragShader, fragShaderSource);
    gl.compileShader(fragShader);

    // Link, use program, save and enable attributes
    const program = gl.createProgram()!;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.validateProgram(program);

    gl.useProgram(program);

    const positionAttrib = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionAttrib);

    // Create, bind, fill buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const verts = new Float32Array([-2, 0, 0, -2, 2, 2]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    // Bind 'position' attribute

    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

    // Set 'cameraTexture' uniform
    gl.uniform1i(gl.getUniformLocation(program, 'cameraTexture'), 0);

    // Activate unit 0
    gl.activeTexture(gl.TEXTURE0);

    // Render loop
    const loop = () => {
      this._rafID = requestAnimationFrame(loop);
      // console.log('a', a);
      if (a) {
        console.log('if a ', a);

        // Compile vertex and fragment shaders
        const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertShader, vertShaderSource);
        gl.compileShader(vertShader);

        const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragShader, fragShaderSourceWarm);
        gl.compileShader(fragShader);

        // Link, use program, save and enable attributes
        const program = gl.createProgram()!;

        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        gl.validateProgram(program);

        gl.useProgram(program);

        const positionAttrib = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionAttrib);

        // Create, bind, fill buffer
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const verts = new Float32Array([-2, 0, 0, -2, 2, 2]);
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

        // Bind 'position' attribute

        gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

        // Set 'cameraTexture' uniform
        gl.uniform1i(gl.getUniformLocation(program, 'cameraTexture'), 0);

        // Activate unit 0
        gl.activeTexture(gl.TEXTURE0);
        a = false;
      }
      // Clear
      gl.clearColor(0, 0, 1, 1);
      // tslint:disable-next-line: no-bitwise
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Bind texture if created
      gl.bindTexture(gl.TEXTURE_2D, cameraTexture);

      // Draw!
      gl.drawArrays(gl.TRIANGLES, 0, verts.length / 2);

      // Submit frame
      gl.endFrameEXP();
    };
    loop();
  };

  toggleFacing = () => {
    this.setState((state) => ({
      type: state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
    }));
  };

  zoomOut = () => {
    this.setState((state) => ({
      zoom: state.zoom - 0.1 < 0 ? 0 : state.zoom - 0.1,
    }));
  };

  zoomIn = () => {
    this.setState((state) => ({
      zoom: state.zoom + 0.1 > 1 ? 1 : state.zoom + 0.1,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          // style={{ height: 300, width: 300 }}
          style={StyleSheet.absoluteFill}
          type={this.state.type}
          zoom={this.state.zoom}
          ref={(ref) => (this.camera = ref!)}
        />
        <GLView
          key={this.state.key0}
          // style={{ height: 500, width: 300 }}
          style={StyleSheet.absoluteFill}
          onContextCreate={this.onContextCreate}
          ref={(ref) => (this.glView = ref!)}
        />

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={this.toggleFacing}>
            <Text>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.zoomIn}>
            <Text>Zoom in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.toggleFilter}>
            <Text>Zoom out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  buttons: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    height: 40,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GLCameraScreen;
