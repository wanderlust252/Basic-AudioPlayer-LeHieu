import { StatusBar } from 'react-native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer, { Capability, Track } from 'react-native-track-player';
import MusicInfo from 'expo-music-info';
import Thumb from './Thumb';
import SoundPlayer from 'react-native-sound-player';
import AudioController from './AudioController';
import { DragSortingListAudioPlayerProps } from '@/navigation/types';
TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});
export interface TrackInfo extends Track {
  thumbBase64?: string;
}
const DragSortingListAudioPlayer: FunctionComponent<DragSortingListAudioPlayerProps> = () => {
  const [list, setList] = useState<TrackInfo>({
    url: '',
  });

  const pickFile = useCallback(() => {
    const pickingAsync = async () => {
      // Pick a single file
      try {
        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.audio],
          mode: 'import',
          copyTo: 'cachesDirectory',
        });
        const metadata = await MusicInfo.getMusicInfoAsync(res.uri, {
          title: true,
          artist: true,
          // album: true,
          // genre: true,
          picture: true,
        });
        if (!metadata) return;
        SoundPlayer.loadUrl(res.uri);
        const getInfo = await SoundPlayer.getInfo();

        const track: TrackInfo = {
          url: res.uri, // Load media from the file system
          title: metadata.title,
          artist: metadata.artist,
          thumbBase64: metadata?.picture?.pictureData,
          duration: getInfo.duration,
        };

        await TrackPlayer.add(track);
        await TrackPlayer.setupPlayer({});

        setList(track);
      } catch (err) {}
    };
    pickingAsync();
  }, []);
  const play = useCallback(() => {
    const playAsync = async () => {
      try {
        TrackPlayer.play();
      } catch (err) {
        console.log(err);
      }
    };
    playAsync();
  }, []);
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
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, {}]}>
          <Thumb
            onPick={pickFile}
            source={{ uri: list.thumbBase64 }}
            artist={list.artist || 'Unknown'}
            title={list.title || 'Unknown'}
          />
          <AudioController onSeek={seek} duration={list.duration || 0} onPause={pause} onPlay={play} />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};
export default DragSortingListAudioPlayer;
