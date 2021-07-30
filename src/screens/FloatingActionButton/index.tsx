import React, { FunctionComponent } from 'react';
import { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-easy-icon';

export interface Props {
  route: {
    params: {
      id: any;
      isOwner: boolean;
      // isNotExecutable: boolean;
    };
  };
}

const FloatingActionButton: FunctionComponent<Props> = ({}) => {
  const animation = useRef(new Animated.Value(0)).current;
  let _open = false;
  const toggleOpen = () => {
    const toValue = _open ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    _open = !_open;
  };
  const firstItemStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
        }),
      },
    ],
  };
  const secondItemStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
  };
  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -90],
  });
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });
  const labelStyle = {
    opacity: opacityInterpolate,
    transform: [
      {
        translateX: labelPositionInterpolate,
      },
    ],
  };
  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });
  const bgStyle = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };
  const rotateAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
  const iconButtonStyle = {
    transform: [{ rotate: rotateAnim }],
  };
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center', marginBottom: 20 }}>
        <Text>Demo by HieuAnCom</Text>
      </View>
      <Animated.View style={[styles.background, bgStyle]} />
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, secondItemStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>Network</Animated.Text>
          <Icon type="material" name="network-check" color="#555" size={20} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, firstItemStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>List</Animated.Text>

          <Icon type="material" name="list" color="#555" size={20} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.button, { backgroundColor: '#323F4E' }]}>
          <Animated.Text style={[styles.label, labelStyle]}>Cancel</Animated.Text>
          <Animated.View style={[iconButtonStyle]}>
            <Icon type="material" name="arrow-circle-up" color="#FFF" size={20} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FloatingActionButton;
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'white' },
  text: { color: 'white' },
  background: {
    backgroundColor: 'rgba(0,0,0,.2)',
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30,
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  other: {
    backgroundColor: '#FFF',
  },
  pay: {},
  label: {
    color: '#FFF',
    position: 'absolute',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
