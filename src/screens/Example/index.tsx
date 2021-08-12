import { View, Button, Text } from 'react-native';
import React, { FunctionComponent, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ExampleProps } from '@/navigation/types';
const ITEM_SIZE = 80;
const Example: FunctionComponent<ExampleProps> = () => {
  const rnd = useSharedValue(0);
  const [text, setText] = useState(0);
  const config: Animated.WithTimingConfig = {
    duration: 500,
    // easing: Easing.elastic(2),
    // easing: Easing.bounce,
    // easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(rnd.value, config) }],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
      }}>
      <View style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <Animated.View
          style={[
            {
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
            },
            style,
          ]}>
          <Text style={{ color: 'white' }}>{text}</Text>
        </Animated.View>
      </View>
      <Button
        title="toggle"
        onPress={() => {
          const random = Math.floor(Math.random() * 200);
          setText(random);
          rnd.value = random;
        }}
      />
    </View>
  );
};
export default Example;
