import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { FunctionComponent, useCallback, useContext, useEffect, useRef } from 'react';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SoundPlayer from 'react-native-sound-player';
import MusicInfo from 'expo-music-info';
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer from 'react-native-track-player';
import { TracksContext } from '@/context/tracksContext';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';

type Props = any;
const Thumb: FunctionComponent<Props> = ({}) => {
  const { addTracks, tracks, currentIndex, setTrackIndex, isNotFirst, isNotLast } = useContext(TracksContext);
  const spinAnim = useSharedValue(0);
  const pickFile = useCallback(() => {
    const pickingAsync = async () => {
      const tmpTracks = [];
      // Pick a single file
      try {
        const res = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.audio],
          mode: 'import',
          copyTo: 'cachesDirectory',
        });
        for (const iterator of res) {
          const metadata = await MusicInfo.getMusicInfoAsync(iterator.uri, {
            title: true,
            artist: true,
            picture: true,
          });
          if (!metadata) return;
          SoundPlayer.loadUrl(iterator.uri);
          const getInfo = await SoundPlayer.getInfo();
          tmpTracks.push({
            url: iterator.uri,
            title: metadata.title,
            artist: metadata.artist,
            thumbBase64: metadata?.picture?.pictureData,
            duration: getInfo.duration,
          });
        }
        await TrackPlayer.add(tmpTracks);

        await TrackPlayer.setupPlayer({});
        addTracks(tmpTracks);
        setTrackIndex(0);
      } catch (err) {}
    };
    pickingAsync();
  }, [addTracks, setTrackIndex]);
  const hasMusic = tracks.length > 0;
  const title = hasMusic ? tracks[currentIndex].title : 'Unknown';
  const artist = hasMusic ? tracks[currentIndex].artist : 'Unknown';
  useEffect(() => {
    spinAnim.value = withRepeat(
      withTiming(1, {
        duration: 10000,
      }),
      -1,
      false,
    );
  }, [spinAnim]);
  const styleImageAnim = useAnimatedStyle(() => {
    const rotate = interpolate(spinAnim.value, [-1, 0, 1], [-360, 0, 360]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });
  const forward = useCallback(() => {
    const forwardAsync = async () => {
      try {
        await TrackPlayer.skipToNext();
        const a = await TrackPlayer.getCurrentTrack();
        setTrackIndex(a);
      } catch (err) {
        console.log(err);
      }
    };
    if (isNotLast) forwardAsync();
  }, [isNotLast, setTrackIndex]);
  const previous = useCallback(() => {
    const previousAsync = async () => {
      try {
        await TrackPlayer.play();
        await TrackPlayer.skipToPrevious();
        const a = await TrackPlayer.getCurrentTrack();
        setTrackIndex(a);
      } catch (err) {
        console.log(err);
      }
    };
    if (isNotFirst) previousAsync();
  }, [isNotFirst, setTrackIndex]);
  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          console.log('LEFT');
          forward();
          // if (index === data.length - 1) {
          //   return;
          // }
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            console.log('RIGHT');
            previous();
            // if (index === data.length - 1) {
            //   return;
            // }
          }
        }}>
        <View style={styles.container}>
          <Animated.View style={[styles.shadowImage]}>
            {hasMusic ? (
              <Animated.View style={[{}, styleImageAnim]}>
                <Image style={[styles.image]} source={{ uri: tracks[currentIndex].thumbBase64 }} />
              </Animated.View>
            ) : (
              <TouchableOpacity onPress={pickFile} style={styles.image}>
                <FontAwesome5 name={'plus'} size={30} />
                <Text style={styles.textPicker}>Chọn bài</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};
export default Thumb;
