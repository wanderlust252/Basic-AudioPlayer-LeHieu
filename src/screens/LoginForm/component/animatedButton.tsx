import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Animated } from 'react-native';

type IProps = {
  index?: number;
};

const Button: React.FC<IProps> = (props) => {
  const { children, index = 0 } = props;
  const animation = useRef(new Animated.Value(0)).current;
  const border = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 100),
      Animated.timing(animation, {
        duration: 200,
        useNativeDriver: true,
        toValue: 1,
      }),
    ]).start();
  }, [animation, border, index]);
  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  return <Animated.View style={[{ opacity }]}>{children}</Animated.View>;
};

export default Button;
