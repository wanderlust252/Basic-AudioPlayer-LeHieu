//@flow
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, View, Dimensions, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Surface } from 'gl-react-expo';
import GLCamera from './GLCamera';
import Effects from './Effects';
import Field from './Field';
const { width: windowWidth } = Dimensions.get('window');
const percentagePrint = (v) => (v * 100).toFixed(0) + '%';
const radiantPrint = (r) => ((180 * r) / Math.PI).toFixed(0) + '°';
// prettier-ignore
const fields = [
  { id: "blur", name: "Blur", min: 0, max: 6, step: 0.1, prettyPrint: blur => blur.toFixed(1) }, 
  { id: "contrast", name: "Contrast", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
  { id: "temperature", name: "Temperature", min: 0, max: 4000, step: 1, prettyPrint: temperature=>temperature },
  { id: "negative", name: "Negative", min: -.2, max: .2, step: 0.02, prettyPrint: negative=>negative.toFixed(1) },
  { id: "exposure", name: "Exposure", min: -10, max: 10, step: 0.01, prettyPrint: exposure=>exposure.toFixed(1) },
  { id: "sepia", name: "Sepia", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
  { id: "hue", name: "Hue", min: 0, max: 2 * Math.PI, step: 0.1, prettyPrint: radiantPrint },
];

const initialEffectsState = {
  blur: 0,
  saturation: 1,
  contrast: 1,
  brightness: 1,
  negative: 0,
  hue: 0,
  sepia: 0,
  flyeye: 0,
  temperature: 0,
  exposure: 0,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  surface: {
    width: windowWidth * 0.75,
    height: windowWidth,
    alignSelf: 'center',
  },
  fields: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: '#EEE',
  },
});

export default class App extends Component {
  state = {
    position: 'front',
    effects: initialEffectsState,
    permission: null,
    applyFilter: 1,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // const permission = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permission: status });
  }

  onSurfacePress = () => {
    this.setState(({ position }) => ({
      position: position === 'front' ? 'back' : 'front',
    }));
  };

  onEffectChange = (value, id) => {
    this.setState(({ effects }) => ({
      effects: { ...effects, [id]: value },
    }));
  };

  onEffectReset = (id) => {
    this.setState(({ effects }) => ({
      effects: { ...effects, [id]: initialEffectsState[id] },
    }));
  };

  render() {
    const { position, effects, permission } = this.state;
    return (
      <ScrollView bounces={false} style={styles.root}>
        {permission ? (
          permission === 'granted' ? (
            <TouchableOpacity onPress={this.onSurfacePress}>
              <Surface style={{ width: windowWidth * 0.75, height: windowWidth, alignSelf: 'center' }}>
                <Effects applyFilter={this.state.applyFilter} {...effects}>
                  <GLCamera position={position} />
                </Effects>
              </Surface>
            </TouchableOpacity>
          ) : (
            <Text style={{ padding: 100 }}>Camera permission denied</Text>
          )
        ) : (
          <Text style={{ padding: 100 }}>Loading...</Text>
        )}
        <TouchableOpacity
          style={{ padding: 10, alignSelf: 'center', marginTop: 10 }}
          onPress={() => {
            this.setState({ applyFilter: this.state.applyFilter !== 1 ? 1 : 0 });
          }}>
          <Text>Đổi filter</Text>
        </TouchableOpacity>
        {/* <View style={styles.fields}>
          {fields.map(({ id, ...props }) => (
            <Field
              {...props}
              key={id}
              id={id}
              value={effects[id]}
              onChange={this.onEffectChange}
              onReset={this.onEffectReset}
            />
          ))}
        </View> */}
      </ScrollView>
    );
  }
}
