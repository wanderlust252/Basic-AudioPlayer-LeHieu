import React, { FunctionComponent, useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PermissionStatus, requestPermissionsAsync } from 'expo-camera';
import { Surface } from 'gl-react-expo';
import GLCamera from './GLCamera';
import Effects from './Effects';
import Field from './Field';

// type Prop = DrawerScreenProps<HomeStackParamList, 'AnimationExample'>;

const { width, height } = Dimensions.get('window');
const percentagePrint = (v: number) => (v * 100).toFixed(0) + '%';
const radiantPrint = (r: number) => ((180 * r) / Math.PI).toFixed(0) + '°';
const defaultImage = require('@/assets/image/magic-wand.png');
const initialEffectsState: {
  blur: number;
  saturation: number;
  contrast: number;
  brightness: number;
  negative: number;
  hue: number;
  sepia: number;
  flyeye: number;
  temperature: number;
  exposure: number;
  sharpen: number;
  scale: number;
} = {
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
  sharpen: 0,
  scale: 0,
};
const EXPOCameraFilter: FunctionComponent<any> = () => {
  const [permission, setPermission] = useState<PermissionStatus>();
  const [position, setPosition] = useState<'front' | 'back'>('front');
  const [applyFilter, setApplyFilter] = useState<number>(0);
  const [visibleEffectField, setVisibleEffectField] = useState(0);
  const [effects, setEffects] = useState<typeof initialEffectsState>(initialEffectsState);
  const fields = [
    { id: 'blur', name: 'Blur', min: 0, max: 6, step: 0.1, prettyPrint: (blur: number) => blur.toFixed(1) },
    { id: 'contrast', name: 'Contrast', min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
    {
      id: 'temperature',
      name: 'Temperature',
      min: 0,
      max: 4000,
      step: 1,
      prettyPrint: (temperature: number) => temperature,
    },
    {
      id: 'negative',
      name: 'Negative',
      min: -0.2,
      max: 0.2,
      step: 0.02,
      prettyPrint: (negative: number) => negative.toFixed(1),
    },
    {
      id: 'exposure',
      name: 'Exposure',
      min: -1,
      max: 2,
      step: 0.01,
      prettyPrint: (exposure: number) => exposure.toFixed(1),
    },
    { id: 'sepia', name: 'Sepia', min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
    { id: 'hue', name: 'Hue', min: 0, max: 2 * Math.PI, step: 0.1, prettyPrint: radiantPrint },
  ];
  useEffect(() => {
    requestPermissionsAsync().then(({ status }) => {
      setPermission(status);
    });
  }, []);
  const onSurfacePress = () => {
    setPosition(position === 'front' ? 'back' : 'front');
  };
  const onEffectChange = (value: any, id: any) => {
    setEffects({ ...effects, [id]: value });
    // this.setState(({ effects }) => ({
    //   effects: { ...effects, [id]: value },
    // }));
  };

  const onEffectReset = (id: string | number) => {
    setEffects({ ...effects, [id]: initialEffectsState[id] });
    // this.setState(({ effects }) => ({
    //   effects: { ...effects, [id]: initialEffectsState[id] },
    // }));
  };
  return (
    <View style={styles.root}>
      {permission ? (
        permission === 'granted' ? (
          <TouchableOpacity onPress={onSurfacePress}>
            <Surface style={{ width: width, height: height, alignSelf: 'center' }}>
              <Effects applyFilter={applyFilter} {...effects}>
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
      <View style={[StyleSheet.absoluteFill, {}]}>
        <View style={[styles.fields, { opacity: visibleEffectField }]}>
          {fields.map(({ id, ...props }) => (
            <Field {...props} key={id} id={id} value={effects[id]} onChange={onEffectChange} onReset={onEffectReset} />
          ))}
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={[{ maxHeight: 100 }]}
          contentContainerStyle={{}}
          horizontal>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setApplyFilter(0);
              setEffects({ ...initialEffectsState });
            }}>
            <Image source={defaultImage} style={styles.image} />
            <Text style={styles.text}>Bình thường</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setVisibleEffectField(visibleEffectField === 1 ? 0 : 1);
            }}>
            <Image source={defaultImage} style={styles.image} />
            <Text style={styles.text}>Bật/Tắt điều chỉnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setApplyFilter(1);
              setEffects({ ...initialEffectsState, blur: 0.5 });
            }}>
            <Image source={defaultImage} style={styles.image} />
            <Text style={styles.text}>Hiệu ứng 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setApplyFilter(0);
              setEffects({ ...initialEffectsState, blur: 0, exposure: 0.5, brightness: 1.2 });
            }}>
            <Image source={defaultImage} style={styles.image} />
            <Text style={styles.text}>Hiệu ứng 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setApplyFilter(2);
              setEffects({ ...initialEffectsState });
            }}>
            <Image source={defaultImage} style={styles.image} />
            <Text style={styles.text}>Hiệu ứng 3</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  image: { resizeMode: 'contain', width: '100%', height: 35 },
  surface: {
    width: width * 0.75,
    height: width,
    alignSelf: 'center',
  },
  item: {
    alignSelf: 'flex-end',
    backgroundColor: '#b3cde0',
    margin: 8,
    paddingTop: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: { color: '#03396c', padding: 5 },
  fields: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 40,
  },
});

export default EXPOCameraFilter;
