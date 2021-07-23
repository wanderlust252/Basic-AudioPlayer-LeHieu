import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import Item from '../Item';
import { TITLE_SIZE } from '../pizzaConst';
export interface Props {
  index: number;
  text: string;
  color: string;
}

const Title: FunctionComponent<Props> = ({ text, index, color }) => {
  return (
    <Item style={{ height: TITLE_SIZE * 3, justifyContent: 'flex-end' }}>
      <Text
        key={`title_${index}`}
        style={{ fontSize: TITLE_SIZE, fontFamily: 'Times New Roman', fontWeight: '900', color }}>
        {text}
      </Text>
    </Item>
  );
};

export default Title;
