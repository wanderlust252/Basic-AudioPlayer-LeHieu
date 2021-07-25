import React, { FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Vibration } from 'react-native';
import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export interface Props {
  route: {
    params: {
      id: any;
      isOwner: boolean;
      // isNotExecutable: boolean;
    };
  };
}
const { width, height } = Dimensions.get('window');

const FloatingActionButton: FunctionComponent<Props> = ({ route }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View>
          <Text>abc</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FloatingActionButton;
const styles = StyleSheet.create({
  container: { flex: 1 },
});
