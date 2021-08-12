import React, { FunctionComponent } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { ExampleWithDecayProps } from '@/navigation/types';
import { View } from 'react-native';
const ITEM_SIZE = 50;
// const { width } = Dimensions.get('window');
const ExamplePanResponder: FunctionComponent<ExampleWithDecayProps> = () => {
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startX: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
    },
    onEnd: (evt) => {
      x.value = withDecay({
        velocity: evt.velocityX,
        clamp: [0, 200], // optionally define boundaries for the animation
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    console.log('Running on the UI thread');
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 200 + ITEM_SIZE, height: ITEM_SIZE, backgroundColor: 'gray' }}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[{ backgroundColor: 'black', width: ITEM_SIZE, height: ITEM_SIZE, borderRadius: 50 }, animatedStyle]}
          />
        </PanGestureHandler>
      </View>
    </View>
  );
};
export default ExamplePanResponder;
