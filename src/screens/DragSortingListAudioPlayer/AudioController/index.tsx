import { Dimensions, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { FunctionComponent, useMemo, useRef, useState } from 'react';
import styles from './styles';
import { str_pad_left } from '@/common';
import Slider, { SliderRef } from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useProgress } from 'react-native-track-player';

type Props = {
  onPlay: () => void;
  onPause: () => void;
  onSeek: (toSecond: number) => void;
  duration: number;
};
const { height } = Dimensions.get('window');
const controllerHeight = height / 10;
const iconHeight = controllerHeight * 0.65;
const playHeight = controllerHeight * 0.9;
const AudioController: FunctionComponent<Props> = ({ duration, onPlay, onPause, onSeek }) => {
  const [playing, setPlaying] = useState(false);
  const [sliding, setSliding] = useState(false);
  const progress = useProgress();
  const sliderRef = useRef<SliderRef>();
  const valueSlider = useMemo(() => {
    return sliding ? undefined : progress.position;
  }, [progress.position, sliding]);
  const onPlaying = () => {
    if (playing) {
      onPause();
    } else {
      onPlay();
    }
    setPlaying(!playing);
  };
  return (
    <View style={styles.container}>
      <Slider
        ref={sliderRef}
        value={valueSlider}
        onSlidingStart={() => {
          setSliding(true);
        }}
        onSlidingComplete={(val) => {
          onSeek(val);
          setSliding(false);
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
          {str_pad_left(Math.floor(duration / 60) + '', '0', 2) + ':' + str_pad_left((duration % 60) + '', '0', 2)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
          height: controllerHeight,
        }}>
        <Ionicons color={'#E94560'} size={iconHeight} name={'md-play-skip-back-outline'} />
        <TouchableWithoutFeedback onPressIn={onPlaying}>
          <View style={{}}>
            {playing ? (
              <Ionicons color={'#E94560'} size={playHeight} name={'md-pause-circle'} />
            ) : (
              <Ionicons color={'#E94560'} size={playHeight} name={'md-play-circle'} />
            )}
          </View>
        </TouchableWithoutFeedback>
        <Ionicons color={'#E94560'} size={iconHeight} name={'md-play-skip-forward-outline'} />
      </View>
    </View>
  );
};
export default AudioController;
