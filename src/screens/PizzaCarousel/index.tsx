import React, { FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Image, SafeAreaView } from 'react-native';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import Description from './Description';
import Details from './Details';
import { colors, data, DURATION, IMAGE_SIZE } from './pizzaConst';
import { Easing, Transition, Transitioning } from 'react-native-reanimated';
import Title from './Title';
import { StatusBar } from 'react-native';
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
const transition = (
  <Transition.Together>
    <Transition.Out type={'slide-bottom'} durationMs={DURATION} interpolation="easeIn" />
    <Transition.Change />
    <Transition.In type={'slide-bottom'} durationMs={DURATION} interpolation="easeOut" />
  </Transition.Together>
);
const PizzaCarousel: FunctionComponent<Props> = ({}) => {
  const [index, setIndex] = React.useState(0); // for active slide
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkBg;
  const activeIndex = React.useRef(new Animated.Value(0)).current;
  const animaton = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef<any>(null);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(animaton, {
        toValue: activeIndex,
        duration: DURATION * 0.7,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();

    StatusBar.setBarStyle(index % 2 === 0 ? 'dark-content' : 'light-content', true);
  }, [activeIndex, animaton, index]);
  const setActiveIndex = useCallback(
    (newIndex) => {
      activeIndex.setValue(newIndex);
      ref.current.animateNextTransition();
      setIndex(newIndex);
    },
    [activeIndex],
  );
  const translateY = animaton.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });
  const spin = animaton.interpolate({
    inputRange: [-1, 0, 1],

    outputRange: ['180deg', '0deg', '360deg'],
  });
  const opacity = animaton.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 1, 1],
  });
  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}>
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: height * data.length,
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}>
            {data.map((_: any, i: number) => {
              return <View key={i} style={{ height, backgroundColor: i % 2 === 0 ? colors.lightBg : colors.darkBg }} />;
            })}
          </Animated.View>
          <View style={[styles.imageContainer, { borderColor: index % 2 === 0 ? colors.darkBg : colors.lightBg }]}>
            <Animated.Image
              key={'img1'}
              source={{ uri: data[index].image }}
              style={[
                styles.image,
                {
                  transform: [
                    {
                      rotate: spin,
                    },
                  ],
                },
              ]}
            />
          </View>
          <Transitioning.View
            ref={ref}
            transition={transition}
            removeClippedSubviews={true}
            style={{ padding: 20, flex: 1, justifyContent: 'space-evenly' }}>
            <Title color={headingColor} index={index} text={data[index].title} />
            <Details index={index} color={color} />
            <Description index={index} text={data[index].description} color={headingColor} />
          </Transitioning.View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default PizzaCarousel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    // backgroundColor: '#f00',
    position: 'absolute',
    top: height * 0.35,
    borderWidth: 1,
    borderRadius: IMAGE_SIZE / 2,
    right: -120,
    zIndex: 1,
  },
  image: {
    flex: 1,
    backgroundColor: '#ff0',
    borderRadius: IMAGE_SIZE / 2,
  },
});
