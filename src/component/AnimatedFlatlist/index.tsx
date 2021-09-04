import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

const FlatListWithEventThrottle = forwardRef((props, ref) => (
  <FlatList
    {...props}
    scrollEventThrottle={0.0001}
    // @ts-ignore
    ref={ref}
  />
));

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
