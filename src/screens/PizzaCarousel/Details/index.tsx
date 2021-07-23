import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import Icon from '../Icon';
import Item from '../Item';
import { data, detailsList, iconsByType, SPACING } from '../pizzaConst';
export interface Props {
  index: number;
  color: string;
}

const Details: FunctionComponent<Props> = ({ index, color }) => {
  return (
    <View style={{ marginVertical: SPACING }}>
      {detailsList.map((key) => {
        return (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Icon type={iconsByType[key]} />
            <Item style={{ flex: 1, height: 26, justifyContent: 'center' }}>
              <Text key={`${key}_${index}`} style={{ fontSize: 16, color, fontWeight: '700' }}>
                {data[index][key]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

export default Details;
