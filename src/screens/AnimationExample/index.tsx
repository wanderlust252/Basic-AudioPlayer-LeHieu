import { HomeStackParamList } from '@/navigation/home-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { FunctionComponent, useRef } from 'react';
import { Animated, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Prop = DrawerScreenProps<HomeStackParamList, 'AnimationExample'>;

// const { width } = Dimensions.get('window');
let defaultAnimVal = 0;
const AnimationExample: FunctionComponent<Prop> = () => {
  const animation = useRef(new Animated.Value(defaultAnimVal)).current;
  const onLeft = () => {
    Animated.timing(animation, {
      //value
      toValue: --defaultAnimVal,
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      // animation.setValue(0);
    });
  };
  const onRight = () => {
    Animated.loop(
      Animated.spring(animation, {
        toValue: ++defaultAnimVal,
        friction: 200,
        velocity: 10,
        useNativeDriver: true,
      }),
    ).start();

    Animated.spring(animation, {
      toValue: ++defaultAnimVal,
      friction: 200,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };
  const translateX = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-30, 0, 30], // 40 20 30
  });
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={{ flexDirection: 'row' }}>
        <TouchableWithoutFeedback onPress={onLeft}>
          <View style={styles.button}>
            <Text>Left</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onRight}>
          <View style={styles.button}>
            <Text>Right</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Animated.View
        style={[
          { height: 50, width: 50, backgroundColor: '#fe4a49' },
          {
            // position: 'absolute',
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },

  button: { borderWidth: 1, padding: 10, margin: 10 },
});

export default AnimationExample;
