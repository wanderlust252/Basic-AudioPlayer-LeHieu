import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { FunctionComponent, useCallback, useContext } from 'react';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SoundPlayer from 'react-native-sound-player';
import MusicInfo from 'expo-music-info';
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer from 'react-native-track-player';
import { TracksContext } from '@/context/tracksContext';

type Props = any;
const Thumb: FunctionComponent<Props> = ({}) => {
  const { addTracks, tracks, currentIndex, setTrackIndex } = useContext(TracksContext);
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
  // const source: ImageURISource = { uri: tracks[currentIndex].thumbBase64 };
  const title = hasMusic ? tracks[currentIndex].title : 'Unknown';
  const artist = hasMusic ? tracks[currentIndex].artist : 'Unknown';
  return (
    <View style={styles.container}>
      <View style={styles.shadowImage}>
        {hasMusic ? (
          <Image style={[styles.image]} source={{ uri: tracks[currentIndex].thumbBase64 }} />
        ) : (
          <TouchableOpacity onPress={pickFile} style={styles.image}>
            <FontAwesome5 name={'plus'} size={30} />
            <Text style={styles.textPicker}>Chọn bài</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
  );
};
export default Thumb;
