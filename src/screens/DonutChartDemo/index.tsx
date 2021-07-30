import React, { FunctionComponent } from 'react';
import { useRef } from 'react';
import { Animated, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-easy-icon';
import DonutChart from './component';

export interface Props {
  route: {
    params: {
      id: any;
      isOwner: boolean;
      // isNotExecutable: boolean;
    };
  };
}

const DonutChartDemo: FunctionComponent<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <DonutChart />
      <View style={{ alignSelf: 'center', marginBottom: 20 }}>
        <Text>Demo by HieuAnCom</Text>
      </View>
    </View>
  );
};

export default DonutChartDemo;
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'white' },
});
