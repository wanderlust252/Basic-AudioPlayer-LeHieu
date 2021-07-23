import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import Item from '../Item';
export interface Props {
  index: number;
  text: string;
  color: string;
}

const Description: FunctionComponent<Props> = ({ index, color, text }) => {
  return (
    <Item>
      <Text key={`description_${index}`} style={{ fontFamily: 'Verdana', fontSize: 16, color }}>
        {text}
      </Text>
    </Item>
  );
};

export default Description;
