import { StatusBar } from 'react-native';
import React, { FunctionComponent } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import TrackPlayer, { Capability, Event, Track, useTrackPlayerEvents } from 'react-native-track-player';
import Thumb from './Thumb';
import AudioController from './AudioController';
import { DragSortingListAudioPlayerProps } from '@/navigation/types';
import TracksProvider from '@/context/tracksContext';
TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});
export interface TrackInfo extends Track {
  thumbBase64?: string;
}
const events = [Event.PlaybackState, Event.PlaybackError, Event.RemoteNext, Event.PlaybackQueueEnded];

const DragSortingListAudioPlayer: FunctionComponent<DragSortingListAudioPlayerProps> = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, {}]}>
          <TracksProvider>
            <Thumb />
            <AudioController />
          </TracksProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};
export default DragSortingListAudioPlayer;
