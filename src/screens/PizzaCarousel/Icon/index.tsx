import React, { FunctionComponent } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export interface Props {
  type: string;
}

const Icon: FunctionComponent<Props> = ({ type }) => {
  return <MaterialIcons name={type} size={26} color="#A5A6AA" style={{ marginRight: 15, height: 26 }} />;
};

export default Icon;
