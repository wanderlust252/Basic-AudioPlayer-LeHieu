import React, { FunctionComponent } from 'react';
import { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-easy-icon';
import Svg, { Circle, G } from 'react-native-svg';

export interface Props {
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  textColor?: number;
  max?: number;
}

const DonutChart: FunctionComponent<Props> = ({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  delay = 0,
  textColor,
  max = 100,
}) => {
  const halfCircle = radius + strokeWidth;
  return (
    <View>
      <Svg height={radius * 2} width={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2} `}>
        <G>
          <Circle />
          <Circle />
        </G>
      </Svg>
    </View>
  );
};

export default DonutChart;
const styles = StyleSheet.create({});
