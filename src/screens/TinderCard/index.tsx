import { clamp } from '@/common';
import React, { FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const hieu = require('@/assets/image/hieu.png');
const hhieu = require('@/assets/image/hhieu1.jpeg');
const quang = require('@/assets/image/quang.png');
const phong = require('@/assets/image/phong.jpeg');
export interface Props {
  route: {
    params: {
      id: any;
      isOwner: boolean;
      // isNotExecutable: boolean;
    };
  };
}
const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

const TinderCard: FunctionComponent<Props> = ({ route }) => {
  const [items, setItems] = useState([
    {
      image: hieu,
      id: 1,
      text: 'Hiếu Ăn Cơm - Mobile Developer',
    },
    {
      image: hhieu,
      id: 2,
      text: 'Hoàng Minh Hiếu - IOT, Hardware System Senior',
    },
    {
      image: quang,
      id: 3,
      text: 'Phạm Văn Quang - Project Manager',
    },
    {
      image: phong,
      id: 4,
      text: 'Phong SV - IOT Developer Senior',
    },
  ]);
  const animation = useRef(new Animated.ValueXY()).current;
  const opacityRef = useRef(new Animated.Value(1)).current;
  const next = useRef(new Animated.Value(0.9)).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: animation.x, dy: animation.y }], { useNativeDriver: false }),
      onPanResponderRelease: (e, { dx, vx, vy }) => {
        let velocity: number;
        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(animation, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
            useNativeDriver: true,
          }).start(transitionNext);
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const deleteItem = () => {
    setItems((oldVal) => oldVal.slice(1));
    next.setValue(0.9);
    opacityRef.setValue(1);
    animation.setValue({ x: 0, y: 0 });
  };

  const transitionNext = () => {
    Animated.parallel([
      Animated.timing(opacityRef, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(next, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(deleteItem);
  };
  const handleNo = () => {
    Animated.timing(animation.x, {
      toValue: -SWIPE_THRESHOLD,
      useNativeDriver: true,
    }).start(transitionNext);
  };
  const handleYes = () => {
    Animated.timing(animation.x, {
      toValue: SWIPE_THRESHOLD,
      useNativeDriver: true,
    }).start(transitionNext);
  };

  const rotate = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });
  const opacity = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [-0.5, 1, 0.5],
  });
  const yesOpacity = animation.x.interpolate({ inputRange: [0, 150], outputRange: [0, 1] });
  const yesScale = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });
  const animatedYupStyles = {
    transform: [{ scale: yesScale }, { rotate: '-30deg' }],
    opacity: yesOpacity,
  };

  const noOpacity = animation.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0] });
  const noScale = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });
  const animatedNopeStyles = {
    transform: [{ scale: noScale }, { rotate: '30deg' }],
    opacity: noOpacity,
  };

  const animatedCardStyles = {
    transform: [{ rotate }, ...animation.getTranslateTransform()],
    opacity: opacityRef,
  };

  const animatedImageStyles = {
    opacity: opacity,
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.top}>
          {items
            .slice(0, 2)
            .reverse()
            .map(({ image, id, text }, index, itemArr) => {
              const isLastItem = index === itemArr.length - 1;
              const isSecondToLast = index === itemArr.length - 2;

              const panHandlers = isLastItem ? panResponder.panHandlers : {};
              const cardStyle = isLastItem ? animatedCardStyles : undefined;
              const imageStyle = isLastItem ? animatedImageStyles : undefined;
              const nextStyle = isSecondToLast ? { transform: [{ scale: next }] } : undefined;
              console.log('next', isSecondToLast, isLastItem, id);

              return (
                <Animated.View {...panHandlers} style={[styles.card, cardStyle, nextStyle]} key={id}>
                  <Animated.Image
                    source={image}
                    style={[
                      {
                        width: undefined,
                        height: undefined,
                        borderRadius: 2,
                        flex: 3,
                      },
                      imageStyle,
                    ]}
                    resizeMode="cover"
                  />
                  <View style={styles.lowerText}>
                    <Text>{text}</Text>
                  </View>
                  {isLastItem && (
                    <Animated.View style={[styles.nope, animatedNopeStyles]}>
                      <Text style={styles.nopeText}>Nope!</Text>
                    </Animated.View>
                  )}

                  {isLastItem && (
                    <Animated.View style={[styles.yup, animatedYupStyles]}>
                      <Text style={styles.yupText}>Yup!</Text>
                    </Animated.View>
                  )}
                </Animated.View>
              );
            })}
        </View>
      </View>
      <View style={styles.buttonBar}>
        <TouchableOpacity onPress={handleNo} style={[styles.button, styles.nopeButton]}>
          <Text style={styles.nopeText}>NO</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleYes} style={[styles.button, styles.yupButton]}>
          <Text style={styles.yupText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TinderCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
  yupButton: {
    shadowColor: 'green',
  },
  nopeButton: {
    shadowColor: 'red',
  },

  card: {
    width: 300,
    height: 300,
    position: 'absolute',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  lowerText: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 5,
  },
  image: {
    width: undefined,
    height: undefined,
    borderRadius: 2,
    flex: 3,
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: '#FFF',
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: '#FFF',
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  },
});
