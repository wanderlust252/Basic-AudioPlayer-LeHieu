import React, { FunctionComponent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
export interface Props {
  style?: StyleProp<ViewStyle>;
}

const Item: FunctionComponent<Props> = ({ style, children }) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default Item;
