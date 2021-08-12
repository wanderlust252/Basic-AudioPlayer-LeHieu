import React, { FunctionComponent } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ExampleWithSpringProps } from '@/navigation/types';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
const startingPosition = 0;
const { width } = Dimensions.get('window');
const ITEM_SIZE = 50;
const ExamplePanResponder: FunctionComponent<ExampleWithSpringProps> = () => {
  const pressed = useSharedValue(false);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startX: number;
      startY: number;
    }
  >({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      pressed.value = false;
      if (event.absoluteX <= width / 2) {
        x.value = withSpring(0);
      } else {
        x.value = withSpring(width - ITEM_SIZE);
      }
      y.value = event.absoluteY - ITEM_SIZE / 2;
    },
  });
  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: '#001972',
      transform: [{ scale: 1 }, { translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[{ width: ITEM_SIZE, height: ITEM_SIZE, borderRadius: 50 }, uas]} />
    </PanGestureHandler>
  );
};
export default ExamplePanResponder;
