import React, { FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Vibration } from 'react-native';
import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};
const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const TimerAnimation: FunctionComponent<Props> = ({ route }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const timerAnimation = useRef(new Animated.Value(height)).current;
  const textInputAnimation = useRef(new Animated.Value(timers[0])).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    const textInputListener = textInputAnimation.addListener(({ value }) => {
      inputRef.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });
    return () => {
      textInputAnimation.removeListener(textInputListener);
      textInputAnimation.removeAllListeners();
    };
  }, [textInputAnimation]);
  const [duration, setDuration] = useState(timers[0]);
  const animation = useCallback(() => {
    textInputAnimation.setValue(duration);
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }),

      Animated.parallel([
        Animated.timing(textInputAnimation, {
          toValue: 0,
          useNativeDriver: true,
          duration: duration * 1000,
        }),
        Animated.timing(timerAnimation, {
          toValue: height,
          useNativeDriver: true,
          duration: duration * 1000,
        }),
      ]),
      Animated.delay(400),
    ]).start(() => {
      // buttonAnimation.setValue(0);
      Vibration.cancel();
      Vibration.vibrate();
      textInputAnimation.setValue(duration);
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [buttonAnimation, duration, textInputAnimation, timerAnimation]);
  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });
  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height,
            width,
            backgroundColor: colors.red,
            transform: [{ translateY: timerAnimation }],
          },
        ]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 100,
            opacity,
            transform: [{ translateY }],
          },
        ]}>
        <TouchableOpacity onPress={animation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          top: height / 3,
          left: 0,
          right: 0,
          flex: 1,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            width,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: textOpacity,
          }}>
          <TextInput ref={inputRef} style={styles.text} defaultValue={duration.toString()} />
        </Animated.View>
        <Animated.FlatList
          data={timers}
          keyExtractor={(i) => i.toString()}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, opacity }}
          snapToInterval={ITEM_SIZE}
          decelerationRate={'fast'}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
            setDuration(timers[index]);
          }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
          renderItem={({ item, index }) => {
            const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE];
            const opacity1 = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            return (
              <View style={{ width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.Text
                  style={[
                    styles.text,
                    {
                      opacity: opacity1,
                      transform: [
                        {
                          scale,
                        },
                      ],
                    },
                  ]}>
                  {item}
                </Animated.Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default TimerAnimation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  },
});
