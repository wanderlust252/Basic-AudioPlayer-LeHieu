import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { FunctionComponent, useCallback, useContext } from 'react';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SoundPlayer from 'react-native-sound-player';
import MusicInfo from 'expo-music-info';
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer from 'react-native-track-player';
import { TracksContext } from '@/context/tracksContext';
import Animated, {
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';

type Props = any;
const Thumb: FunctionComponent<Props> = ({}) => {
  const { addTracks, tracks, currentIndex, setTrackIndex, forward, previous } = useContext(TracksContext);
  const spinAnim = useSharedValue(0);
  const pickFile = useCallback(() => {
    const pickingAsync = async () => {
      const tmpTracks = [];
      // Pick a single file
      try {
        const res = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.audio],
          mode: 'open',
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
        spinAnim.value = withRepeat(
          withTiming(1, {
            duration: 10000,
          }),
          -1,
          false,
        );
      } catch (err) {}
    };
    pickingAsync();
  }, [addTracks, setTrackIndex, spinAnim]);
  const hasMusic = tracks.length > 0;
  const title = hasMusic ? tracks[currentIndex].title : 'Unknown';
  const artist = hasMusic ? tracks[currentIndex].artist : 'Unknown';
  // useEffect(() => {

  // }, [spinAnim]);
  const styleImageAnim = useAnimatedStyle(() => {
    const rotate = interpolate(spinAnim.value, [-1, 0, 1], [-360, 0, 360]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });
  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          console.log('LEFT');
          spinAnim.value = withSequence(
            withSpring(0, {}, () => {
              runOnJS(forward)();
            }),
            withRepeat(
              withTiming(1, {
                duration: 10000,
              }),
              -1,
              false,
            ),
          );
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            console.log('RIGHT');
            spinAnim.value = withSequence(
              withSpring(0, {}, () => {
                runOnJS(previous)();
              }),
              withRepeat(
                withTiming(1, {
                  duration: 10000,
                }),
                -1,
                false,
              ),
            );
          }
        }}>
        <View style={[styles.container]}>
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
