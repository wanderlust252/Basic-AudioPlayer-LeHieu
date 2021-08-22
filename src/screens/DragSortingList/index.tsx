import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import React, { FunctionComponent, useRef, useState } from 'react';
import Animated, {
  cancelAnimation,
  Extrapolate,
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ExampleProps } from '@/navigation/types';
import shuffle from 'lodash/shuffle';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
type SongItem = {
  id: number;
  title: string;
  artist: string;
  cover: string;
};
const correctLottie = require('@/assets/lottieJSON/correct.json');
function listToObject(list: SongItem[]) {
  const values = Object.values(list);
  const object: { [key: string]: number } = {};
  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }
  return object;
}
function clamp(value: number, lowerBound: number, upperBound: number) {
  'worklet';
  return Math.max(lowerBound, Math.min(value, upperBound));
}
function objectMove(object: { [x: string]: any }, from: any, to: number) {
  'worklet';
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}
function Song({ cover, title }: { artist: any; cover: any; title: any }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: SONG_HEIGHT,
        padding: 10,
      }}>
      <Image source={{ uri: cover }} style={{ height: 50, width: 50, borderRadius: 4 }} />

      <View
        style={{
          marginLeft: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4,
          }}>
          {title}
        </Text>

        {/* <Text style={{ fontSize: 12, color: 'gray' }}>{artist}</Text> */}
      </View>
    </View>
  );
}
function MovableSong({
  id,
  artist,
  cover,
  title,
  positions,
  scrollY,
  songsCount,
}: {
  id: any;
  artist: any;
  cover: any;
  title: any;
  positions: any;
  scrollY: any;
  songsCount: any;
}) {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT);

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT);
        }
      }
    },
    [moving],
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);

      if (Platform.OS === 'ios') {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value - HEADER_HEIGHT;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Scroll up
        scrollY.value = withTiming(0, { duration: 1500 });
      } else if (positionY >= scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD) {
        // Scroll down
        const contentHeight = songsCount * SONG_HEIGHT;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = withTiming(maxScroll, { duration: 1500 });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(Math.floor(positionY / SONG_HEIGHT), 0, songsCount - 1);

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(positions.value, positions.value[id], newPosition);

        if (Platform.OS === 'ios') {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    },
    onFinish() {
      top.value = positions.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <BlurView intensity={moving ? 100 : 0} tint="light">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={{ maxWidth: '80%' }}>
            <Song artist={artist} cover={cover} title={title} />
          </Animated.View>
        </PanGestureHandler>
      </BlurView>
    </Animated.View>
  );
}
const ALBUM_COVERS = {
  HUANROSE: 'https://tudiendanchoi.com/wp-content/uploads/2020/04/hu.png',
  DISCOVERY: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg',
  HUMAN_AFTER_ALL: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Humanafterall.jpg',
  HOMEWORK: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.jpg',
  RANDOM_ACCESS_MEMORIES: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg',
};

const DAFT_PUNK = 'Daft Punk';
const SONGS: SongItem[] = shuffle([
  {
    id: 0,
    title: 'Sống trên đời',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUANROSE,
  },
  {
    id: 1,
    title: 'Chỉ có làm',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUANROSE,
  },
  {
    id: 2,
    title: 'Thì mới có ăn',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUANROSE,
  },
  {
    id: 3,
    title: 'Cái loại không làm',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUANROSE,
  },
  {
    id: 4,
    title: 'Mà đòi có ăn',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUANROSE,
  },
  {
    id: 5,
    title: 'Thì ăn',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUANROSE,
  },
  {
    id: 6,
    title: 'Đồng bằng',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUANROSE,
  },
  {
    id: 7,
    title: 'Ăn cát',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUANROSE,
  },
  // {
  //   id: 'revolution-909',
  //   title: 'Revolution 909',
  //   artist: DAFT_PUNK,
  //   cover: ALBUM_COVERS.HOMEWORK,
  // },
  // {
  //   id: 'around-the-world',
  //   title: 'Around the World',
  //   artist: DAFT_PUNK,
  //   cover: ALBUM_COVERS.HOMEWORK,
  // },
  // {
  //   id: 'within',
  //   title: 'Within',
  //   artist: DAFT_PUNK,
  //   cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  // },
  // {
  //   id: 'touch',
  //   title: 'Touch (feat. Paul Williams)',
  //   artist: DAFT_PUNK,
  //   cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  // },
  // {
  //   id: 'beyond',
  //   title: 'Beyond',
  //   artist: DAFT_PUNK,
  //   cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  // },
  // {
  //   id: 'motherboard',
  //   title: 'Motherboard',
  //   artist: DAFT_PUNK,
  //   cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  // },
]);

const SONG_HEIGHT = 70;
const HEADER_HEIGHT = 60;
const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT;
const DragSortingList: FunctionComponent<ExampleProps> = () => {
  const positions = useSharedValue(listToObject(SONGS));
  const scrollY = useSharedValue(0);
  const animationNopBai = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();
  const lottieRef = useRef<LottieView>();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(true);
  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false),
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const onSubmit = () => {
    let flag = true;
    for (const key in positions.value) {
      console.log('key', key, typeof key, typeof positions.value[key], positions.value[key]);
      if (key !== positions.value[key] + '') {
        flag = false;
        break;
      }
    }
    if (flag) {
      // neu dung
      // opacity 0 => show lottie
      lottieRef.current?.play();
    } else {
      // neu sai
      setIsAnswerCorrect(false);
      animationNopBai.value = withSequence(
        withRepeat(withSequence(withTiming(-1, { duration: 10 }), withTiming(1, { duration: 10 })), 10, true),
        withTiming(0, { duration: 10 }, (finished) => {
          if (finished) {
            runOnJS(setIsAnswerCorrect)(true);
          }
        }),
      );
    }
  };
  const styleNopBaiContainer = useAnimatedStyle(() => {
    const rotate = interpolate(animationNopBai.value, [-1, 0, 1], [-10, 0, 10], Extrapolate.CLAMP);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sắp xếp lại thành câu có nghĩa</Text>
          </View>
          <Animated.ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{
              flex: 1,
              position: 'relative',
            }}
            contentContainerStyle={{
              height: SONGS.length * SONG_HEIGHT,
            }}>
            <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}>
              <LottieView
                ref={lottieRef}
                source={correctLottie}
                style={[{ height: 200, width: 200 }]}
                loop={false}
                onAnimationFinish={() => {
                  Alert.alert('Thông báo', 'Finish animation! Now we can navigate to next screen!');
                }}
                speed={0.7}
              />
            </View>
            {SONGS.map((song) => (
              <MovableSong
                key={song.id}
                id={song.id}
                artist={song.artist}
                cover={song.cover}
                title={song.title}
                positions={positions}
                scrollY={scrollY}
                songsCount={SONGS.length}
              />
            ))}
          </Animated.ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.footerButton,
                {
                  backgroundColor: '#ffcc5c',
                },
              ]}>
              <MaterialIcons size={24} name={'undo'} color={'white'} />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={onSubmit}>
              <Animated.View
                style={[
                  styles.footerButton,
                  {
                    borderColor: isAnswerCorrect ? '#88d8b0' : '#ff6f69',
                    borderWidth: 3,
                  },
                  styleNopBaiContainer,
                ]}>
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: isAnswerCorrect ? '#88d8b0' : '#ff6f69', fontWeight: 'bold' },
                  ]}>
                  Nộp bài
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  header: { alignItems: 'center', justifyContent: 'center', height: HEADER_HEIGHT },
  footer: { flexDirection: 'row', justifyContent: 'space-around' },
  footerButton: {
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: { fontSize: 16, color: 'white' },
});
export default DragSortingList;
