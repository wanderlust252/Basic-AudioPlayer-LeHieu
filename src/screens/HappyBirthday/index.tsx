import { clamp } from '@/common';
import React, { FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import LottieView from 'lottie-react-native';
import TypingText from 'react-native-typical';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { hpbd } from '@/assets/imageLottie';
import { useEffect } from 'react';
import Icon from 'react-native-easy-icon';
const hieu = require('@/assets/image/meoho.jpg');
const hhieu = require('@/assets/image/yang1.jpg');
const quang = require('@/assets/image/yang2.jpg');
const phong = require('@/assets/gif/catLongMi.gif');
import { LogBox } from 'react-native';
import navigationService from '@/navigation/navigation-service';
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
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

const HappyBirthday: FunctionComponent<Props> = ({ route }) => {
  const [items, setItems] = useState([
    {
      image: hieu,
      id: 1,
      text: 'Bé Hổ nhà mình nè :3',
    },
    {
      image: hhieu,
      id: 2,
      text: '14/03 Valentine Trắng',
    },
    {
      image: quang,
      id: 3,
      text: '25/03 Đi AEON Hà Đông chụp được quả này :))',
    },
    {
      image: phong,
      id: 4,
      text: 'Bà trùm tỉa lông mi =))',
    },
  ]);
  const animation = useRef(new Animated.ValueXY()).current;
  const animationBackGround = useRef(new Animated.Value(0)).current;
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
  const navigation = useNavigation();
  useEffect(() => {
    if (items.length === 0) {
      Animated.sequence([
        Animated.timing(animationBackGround, {
          useNativeDriver: true,
          toValue: 0.2,
          easing: Easing.bounce,
        }),
        Animated.delay(400),
        Animated.timing(animationBackGround, {
          useNativeDriver: true,
          toValue: 1,
        }),
      ]).start();
    }
  }, [animationBackGround, items.length]);
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
  const scaleInterpolate = animationBackGround.interpolate({
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
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Animated.View
            style={[
              {
                backgroundColor: '#6497b1',
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: 30,
              },
              bgStyle,
            ]}
          />
          {items.length <= 0 && (
            <View>
              <LottieView source={hpbd} style={{ height: 200, width: 200 }} autoPlay loop speed={0.7} />

              <View style={{ alignSelf: 'center', position: 'absolute', bottom: 60, flexDirection: 'row' }}>
                <Text style={{ color: '#eec9d2', fontSize: 20, fontWeight: 'bold' }}>
                  Chúc <Text style={{ color: '#fe9c8f' }}>Giang</Text>{' '}
                </Text>
                <TypingText
                  steps={[
                    'sinh nhật vui vẻ',
                    1000,
                    'mãi trẻ và xinh đẹp',
                    1000,
                    'có sức khoẻ tốt',
                    1000,
                    'may mắn trong cuộc sống',
                    1000,
                    'may mắn trong công việc',
                    1000,
                  ]}
                  loop={10}
                  blinkCursor={true}
                  editDelay={80}
                  deleteDelay={10}
                  style={[
                    {
                      color: '#eec9d2',
                      fontSize: 20,
                      fontWeight: 'bold',
                    },
                  ]}
                />
              </View>
              <View style={{ alignSelf: 'center', height: 40, width: '100%' }} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ImageCarousel', {});
                }}
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  borderRadius: 8,
                  backgroundColor: '#011f4b',
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 20, color: 'white' }}>Let's go </Text>
                <Icon type={'material'} name={'east'} size={40} color={'white'} />
              </TouchableOpacity>
            </View>
          )}
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
                      <Text style={styles.nopeText}>Đẹp!</Text>
                    </Animated.View>
                  )}

                  {isLastItem && (
                    <Animated.View style={[styles.yup, animatedYupStyles]}>
                      <Text style={styles.yupText}>Siêu đẹp!</Text>
                    </Animated.View>
                  )}
                </Animated.View>
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default HappyBirthday;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3cde0',
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
    // flex: 1,
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
