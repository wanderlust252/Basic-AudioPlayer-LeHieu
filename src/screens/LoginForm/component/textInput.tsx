import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type IProps = {
  iconName?: string;
  title?: string;
  index?: number;
};

const Input: React.FC<IProps> = (props) => {
  const { iconName, title, children, index = 0 } = props;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log(index);

    Animated.sequence([
      Animated.delay(index * 100),
      Animated.spring(animation, {
        friction: 8,
        tension: 200,
        useNativeDriver: true,
        toValue: 1,
      }),
    ]).start();
  }, [animation, index]);
  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  return (
    <Animated.View style={[{ marginTop: 25, opacity }, { transform: [{ scale }] }]}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Icon name={iconName || 'person'} size={20} color="#000" />
        <Text
          style={{
            marginLeft: 16,
            fontSize: 16,
          }}>
          {title}
        </Text>
      </View>
      {children}
    </Animated.View>
  );
};

export default Input;
