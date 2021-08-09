import { HomeStackParamList } from '@/navigation/home-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { FunctionComponent, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-easy-icon';
import { IconType } from 'react-native-easy-icon/src/Icon';
import { Easing } from 'react-native-reanimated';

type Prop = DrawerScreenProps<HomeStackParamList, 'AnimationExample'>;

const { width, height } = Dimensions.get('window');
const data: {
  icon: {
    type: IconType;
    name: string;
  };
  text: string;
}[] = [
  {
    icon: {
      type: 'material',
      name: 'add-circle-outline',
    },
    text: 'Đừng',
  },
  {
    icon: {
      type: 'material',
      name: 'filter',
    },
    text: 'Thấy',
  },
  {
    icon: {
      type: 'material',
      name: 'filter-hdr',
    },
    text: 'Hoa',
  },
  {
    icon: {
      type: 'material',
      name: 'format-list-numbered',
    },
    text: 'Nở',
  },
  {
    icon: {
      type: 'material',
      name: 'forum',
    },
    text: 'Mà',
  },
  {
    icon: {
      type: 'material',
      name: 'gps-not-fixed',
    },
    text: 'Ngỡ',
  },

  {
    icon: {
      type: 'material',
      name: 'flip-camera-android',
    },
    text: 'Xuân',
  },
  {
    icon: {
      type: 'material',
      name: 'home-work',
    },
    text: 'Về',
  },
];

const ITEM_SIZE = width / 4;
const ListSortedAnimation: FunctionComponent<Prop> = (props) => {
  let _open = false;
  const animation = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    const toValue = _open ? 0 : data.length + 2;
    Animated.timing(animation, {
      useNativeDriver: true,
      toValue: toValue,
      duration: 2000,
    }).start();
    _open = !_open;
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {data.map((item, index) => {
        const { icon } = item;
        const rowNums = Math.floor(index / 4);
        const rowOffset = index % 4;
        const x1 = width / 2 - ITEM_SIZE / 2; // vi tri ban dau
        const x2 = rowOffset * ITEM_SIZE; //vi tri dich'
        const y1 = height / 2 - ITEM_SIZE / 2; //vi tri ban dau
        const y2 = rowNums * ITEM_SIZE; //vi tri dich'

        const movingX = animation.interpolate({
          inputRange: [index - 0.5, index + 2],
          outputRange: [0, x2 - x1],
          extrapolateRight: 'clamp',
        });
        const movingY = animation.interpolate({
          inputRange: [index - 0.5, index + 2],
          outputRange: [0, y2 - y1],
          extrapolateRight: 'clamp',
        });
        const scale = animation.interpolate({
          inputRange: [index, index + 1],
          outputRange: [0.2, 1],
          extrapolate: 'clamp',
        });
        const transform = [
          {
            translateX: movingX,
          },
          {
            translateY: movingY,
          },
          {
            scale,
          },
        ];
        const opacity = animation.interpolate({
          inputRange: [index, index + 0.6, index + 1],
          outputRange: [0, 0, 1],
          extrapolateLeft: 'clamp',
        });

        return (
          <Animated.View
            key={index + '_item'}
            style={[
              {
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: x1,
                top: y1,
                // left: rowOffset * ITEM_SIZE,
                // top: rowNums * ITEM_SIZE,
              },
              { opacity },
              {
                transform,
              },
            ]}>
            <View
              style={{
                backgroundColor: '#F67280',
                width: '70%',
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: ITEM_SIZE * 0.35,
              }}>
              <Text style={{ fontSize: ITEM_SIZE * 0.2, color: '#2A363B' }}>{item.text}</Text>
              {/* <Icon color={'#2A363B'} size={ITEM_SIZE * 0.3} type={icon.type} name={icon.name} /> */}
            </View>
          </Animated.View>
        );
      })}
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View
          style={{
            width: ITEM_SIZE / 2,
            height: ITEM_SIZE / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F67280',
            position: 'absolute',
            alignSelf: 'center',
            borderColor: '#6C5B7B',
            borderRadius: ITEM_SIZE / 4,
            // left: rowOffset * ITEM_SIZE,
            // top: rowNums * ITEM_SIZE,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#355C7D', justifyContent: 'center' },

  button: { borderWidth: 1, padding: 10, margin: 10 },
});

export default ListSortedAnimation;
