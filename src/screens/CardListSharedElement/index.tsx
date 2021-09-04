import { Dimensions, Image, StatusBar, Text, View } from 'react-native';
import React, { FunctionComponent, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { CardListSharedElementProps, CardListStackParamList } from '@/navigation/types';
import {
  Directions,
  FlingGestureHandler,
  FlingGestureHandlerEventPayload,
  HandlerStateChangeEvent,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import DATA, { Data } from './data';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('window');
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;
///
const CardListSharedElement: FunctionComponent<CardListSharedElementProps> = () => {
  const [data, setData] = useState(DATA);
  const scrollXAnimated = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const setActiveIndex = (activeIndex: number) => {
    scrollXAnimated.value = withTiming(activeIndex, { duration: 400, easing: Easing.linear });
    setIndex(activeIndex);
  };
  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      console.log('useEffect');

      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  }, [data, index]);
  const onFlingLeft: (event: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>) => void = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (index === data.length - 1) {
        return;
      }
      setActiveIndex(index + 1);
    }
  };
  const onFlingRight: (event: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>) => void = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (index === 0) {
        return;
      }
      setActiveIndex(index - 1);
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaProvider>
        <FlingGestureHandler key="left" direction={Directions.LEFT} onHandlerStateChange={onFlingLeft}>
          <FlingGestureHandler key="right" direction={Directions.RIGHT} onHandlerStateChange={onFlingRight}>
            <SafeAreaView style={[styles.container, {}]}>
              <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: SPACING * 2,
                  marginTop: 50,
                }}>
                {data.map((item, indexItem) => {
                  const newStyle = [{ zIndex: data.length - indexItem }];
                  return (
                    <View key={indexItem + '_1'} style={newStyle}>
                      <ImageItem item={item} indexItem={indexItem} scrollXAnimated={scrollXAnimated} />
                    </View>
                  );
                })}
              </View>
            </SafeAreaView>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </SafeAreaProvider>
    </>
  );
};
const OverflowItems: FunctionComponent<{ scrollXAnimated: any; data: Data[] }> = ({ scrollXAnimated, data }) => {
  const inputRange = [-1, 0, 1];
  const styleAnim = useAnimatedStyle(() => {
    const translateY = interpolate(scrollXAnimated.value, inputRange, [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]);
    return {
      transform: [{ translateY }],
    };
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={styleAnim}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text numberOfLines={1} style={[styles.subTitle]}>
                  {/* <EvilIcons
                    name='subTitle'
                    size={16}
                    color='black'
                    style={{ marginRight: 5 }}
                  /> */}
                  {item.subTitle}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};
const ImageItem: FunctionComponent<{ item: Data; indexItem: number; scrollXAnimated: any }> = ({
  item,
  indexItem,
  scrollXAnimated,
}) => {
  const navigation = useNavigation();
  const inputRange = [indexItem - 1, indexItem, indexItem + 1];
  const styleAnim = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollXAnimated.value,
      [indexItem - 1, indexItem, indexItem + 0.9, indexItem + 1],
      [50, 0, -100, -500],
    );
    const scale = interpolate(scrollXAnimated.value, inputRange, [0.9, 1, 1.3]);
    const opacity = interpolate(scrollXAnimated.value, inputRange, [1 - 1 / VISIBLE_ITEMS, 1, 0]);
    return {
      opacity,
      transform: [{ scale }, { translateX }],
      shadowColor: '#E50914',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: interpolate(scrollXAnimated.value, inputRange, [0, 0.7, 0]),
      shadowRadius: 20,

      elevation: 5,
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: -ITEM_WIDTH / 2,
        },
        styleAnim,
      ]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('CardListStackParamList', {
            screen: 'CardDetail',
            params: item,
          });
        }}>
        <SharedElement id={item.date}>
          <Image
            source={item.poster}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              borderRadius: 14,
            }}
          />
        </SharedElement>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardListSharedElement;
