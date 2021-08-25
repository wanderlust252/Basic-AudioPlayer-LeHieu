import { Dimensions, Text, View } from 'react-native';
import React, { FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from './styles';
import { str_pad_left } from '@/common';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, { Event, State, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { TracksContext } from '@/context/tracksContext';

type Props = any;
const { height } = Dimensions.get('window');
const controllerHeight = height / 10;
const iconHeight = controllerHeight * 0.65;
const playHeight = controllerHeight * 0.9;
let sliding = false;
const events = [Event.PlaybackState, Event.PlaybackError, Event.RemoteNext, Event.PlaybackQueueEnded];
const AudioController: FunctionComponent<Props> = ({}) => {
  const { tracks, currentIndex, setTrackIndex, isNotLast, isNotFirst } = useContext(TracksContext);

  const [playerState, setPlayerState] = useState<State>();
  const progress = useProgress();
  const valueSlider = useMemo(() => {
    return sliding ? undefined : progress.position;
  }, [progress.position]);
  const duration = currentIndex >= 0 ? tracks[currentIndex].duration || 0 : 0;
  const playing = playerState === State.Playing;
  const isEnded = progress.position + 1 >= progress.duration;
  useEffect(() => {
    if (isEnded) {
      const pauseAsync = async () => {
        try {
          TrackPlayer.pause();
        } catch (err) {
          console.log(err);
        }
      };
      pauseAsync();
    }
  }, [isEnded]);
  useTrackPlayerEvents(events, (event) => {
    console.log('event', event);
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });
  const pause = useCallback(() => {
    const pauseAsync = async () => {
      try {
        TrackPlayer.pause();
      } catch (err) {
        console.log(err);
      }
    };
    pauseAsync();
  }, []);
  const replay = useCallback(() => {
    const replayAsync = async () => {
      try {
        await TrackPlayer.seekTo(0);
        await TrackPlayer.play();
      } catch (err) {
        console.log(err);
      }
    };
    replayAsync();
  }, []);
  const play = useCallback(() => {
    const playAsync = async () => {
      try {
        const state = await TrackPlayer.getState();
        console.log('state', state !== State.Playing);

        if (state !== State.Playing) {
          await TrackPlayer.play();
        }
      } catch (err) {
        console.log(err);
      }
    };
    playAsync();
  }, []);
  const seek = useCallback((time) => {
    const seekAsync = async () => {
      try {
        TrackPlayer.seekTo(time);
      } catch (err) {
        console.log(err);
      }
    };
    seekAsync();
  }, []);
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
    <View style={styles.container}>
      <Slider
        value={valueSlider}
        onSlidingStart={() => {
          sliding = true;
        }}
        onSlidingComplete={(val) => {
          sliding = false;
          seek(val);
        }}
        style={[styles.slider, styles.sliderShadow]}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor="#0F3460"
        minimumTrackTintColor="#0F3460"
        maximumTrackTintColor="#16213E"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.text}>0</Text>
        <Text style={styles.text}>
          {str_pad_left(Math.floor(duration / 60) + '', '0', 2) +
            ':' +
            str_pad_left(Math.floor(duration % 60) + '', '0', 2)}
        </Text>
      </View>
      <View
        style={[
          styles.controller,
          {
            height: controllerHeight,
          },
        ]}>
        <Ionicons
          onPress={previous}
          style={{ opacity: isNotFirst ? 1 : 0.2 }}
          color={'#E94560'}
          size={iconHeight}
          name={'md-play-skip-back-outline'}
        />
        <View style={{}}>
          {playing ? (
            <Ionicons onPress={pause} color={'#E94560'} size={playHeight} name={'md-pause-circle'} />
          ) : isEnded ? (
            <Ionicons onPress={replay} color={'#E94560'} size={playHeight} name={'refresh-circle-sharp'} />
          ) : (
            <Ionicons onPress={play} color={'#E94560'} size={playHeight} name={'md-play-circle'} />
          )}
        </View>
        <Ionicons
          style={{ opacity: isNotLast ? 1 : 0.2 }}
          onPress={forward}
          color={'#E94560'}
          size={iconHeight}
          name={'md-play-skip-forward-outline'}
        />
      </View>
    </View>
  );
};
export default AudioController;
