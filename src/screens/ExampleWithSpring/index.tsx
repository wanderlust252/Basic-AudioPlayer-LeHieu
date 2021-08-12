import { View, Button, Text } from 'react-native';
import React, { FunctionComponent, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ExampleWithSpringProps } from '@/navigation/types';
const ITEM_SIZE = 80;
const ExampleWithSpring: FunctionComponent<ExampleWithSpringProps> = () => {
  const rnd = useSharedValue(10);
  const [text, setText] = useState(0);

  const config: Animated.WithSpringConfig = {
    velocity: 10,
  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(rnd.value, config) }],
      // width: withTiming(rnd.value, config),
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
export default ExampleWithSpring;
