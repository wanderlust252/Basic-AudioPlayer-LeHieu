import React, { FunctionComponent, LegacyRef, MutableRefObject } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Dimensions, FlatListProps, Image } from 'react-native';
import { Animated, FlatList, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-easy-icon';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  route: {
    params: {
      id: any;
      isOwner: boolean;
      // isNotExecutable: boolean;
    };
  };
}
const IMAGE_SIZE = 80;
const SPACING = 10;
type Data = {
  id: number;
  image: any;
};
const data: Data[] = [
  { id: 1, image: require('@/assets/image/y1.jpg') },
  { id: 2, image: require('@/assets/image/y2.jpg') },
  { id: 3, image: require('@/assets/image/y3.jpg') },
  { id: 4, image: require('@/assets/image/y4.jpg') },
  { id: 5, image: require('@/assets/image/y5.jpg') },
  { id: 6, image: require('@/assets/image/y6.jpg') },
  { id: 7, image: require('@/assets/image/y7.jpg') },
  { id: 8, image: require('@/assets/image/y8.jpg') },
  { id: 9, image: require('@/assets/image/y9.jpg') },
  { id: 10, image: require('@/assets/image/y10.jpg') },
  { id: 11, image: require('@/assets/image/y11.jpg') },
  { id: 12, image: require('@/assets/image/y12.jpg') },
  { id: 13, image: require('@/assets/image/y13.jpg') },
  { id: 14, image: require('@/assets/image/y14.jpg') },
  { id: 15, image: require('@/assets/image/y15.jpg') },
];
const { height, width } = Dimensions.get('window');
const ImageCarousel: FunctionComponent<Props> = ({}) => {
  const topRef = useRef<any>();
  const thumpRef = useRef<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index);
    topRef.current.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumpRef.current.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumpRef.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <FlatList
        ref={topRef}
        data={data}
        keyExtractor={(item) => item.id + '_list'}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        onMomentumScrollEnd={(ev) => {
          scrollToActiveIndex(Math.round(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ height, width }}>
              <Image
                style={[StyleSheet.absoluteFillObject, { resizeMode: 'cover', height: height, width: width }]}
                source={item.image}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumpRef}
        data={data}
        keyExtractor={(item) => item.id + '_sublist'}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: 'absolute', bottom: IMAGE_SIZE - 40 }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToActiveIndex(index);
              }}>
              <Image
                style={[
                  {
                    height: IMAGE_SIZE,
                    width: IMAGE_SIZE,
                    borderRadius: 12,
                    marginRight: SPACING,
                    borderWidth: 2,
                    opacity: activeIndex === index ? 1 : 0.7,
                    borderColor: activeIndex === index ? 'white' : 'transparent',
                  },
                ]}
                source={item.image}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ImageCarousel;
const styles = StyleSheet.create({});
