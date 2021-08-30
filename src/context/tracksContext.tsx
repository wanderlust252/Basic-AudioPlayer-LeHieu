import { TrackInfo } from '@/screens/DragSortingListAudioPlayer';
import TrackPlayer, { Event, State, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import React, { createContext, useState, FunctionComponent, useCallback, useRef, useMemo } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { ListRenderItem, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export type TracksContextState = {
  tracks: TrackInfo[];
  currentIndex: number;
  setTrackIndex: (newState: number) => void;
  addTracks: (newState: TrackInfo[]) => void;
  forward: () => void;
  previous: () => void;
  openModal: () => void;
  pause: () => void;
  replay: () => void;

  isNotLast: boolean;
  isNotFirst: boolean;
  playing: boolean;
};
const contextDefaultValues: TracksContextState = {
  tracks: [],
  currentIndex: -1,
  setTrackIndex: () => 0,
  addTracks: () => 0,
  forward: () => 0,
  previous: () => 0,
  openModal: () => 0,
  pause: () => 0,
  replay: () => 0,
  isNotFirst: false,
  isNotLast: false,
  playing: false,
};
const events = [Event.PlaybackState, Event.PlaybackError, Event.RemoteNext, Event.PlaybackQueueEnded];

export const TracksContext = createContext<TracksContextState>(contextDefaultValues);
let tracks: TrackInfo[] = [
  // {
  //   url: '',
  //   title: 'ABAC ACBA C',
  // },
  // {
  //   url: '',
  //   title: 'ABAC ACBA C',
  // },
];
const TracksProvider: FunctionComponent = ({ children }) => {
  const [playerState, setPlayerState] = useState<State>();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['15%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const progress = useProgress();
  const openModal = () => {
    // ham nay chua dung toi. Chac ai do se can
    bottomSheetRef.current?.expand();
  };
  const addTracks = (newState: TrackInfo[]) => {
    tracks = tracks.concat(newState);
  };
  const setTrackIndex = (newState: number) => {
    setCurrentIndex(newState);
  };
  const isNotLast = currentIndex < tracks.length - 1;
  const isNotFirst = currentIndex > 0;
  const playing = playerState === State.Playing;
  const isEnded = progress.position + 1 >= progress.duration;
  const forward = async () => {
    if (!isNotLast) return;
    try {
      const statement = await TrackPlayer.getState();
      if (statement === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      await TrackPlayer.skipToNext();
      const a = await TrackPlayer.getCurrentTrack();
      setTrackIndex(a);
    } catch (err) {
      console.log(err);
    }
  };

  const previous = async () => {
    if (!isNotFirst) return;
    try {
      const statement = await TrackPlayer.getState();
      if (statement === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      await TrackPlayer.skipToPrevious();
      const a = await TrackPlayer.getCurrentTrack();
      setTrackIndex(a);
    } catch (err) {
      console.log(err);
    }
  };
  const replay = async () => {
    try {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
    } catch (err) {
      console.log(err);
    }
  };
  const pause = async () => {
    try {
      TrackPlayer.pause();
    } catch (err) {
      console.log(err);
    }
  };
  const skip = async (trackIndex: number) => {
    try {
      await TrackPlayer.skip(trackIndex);
      setTrackIndex(trackIndex);
    } catch (err) {
      console.log(err);
    }
  };
  useTrackPlayerEvents(events, (event) => {
    console.log('event', event);
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });
  const renderItem: ListRenderItem<TrackInfo> = ({ item, index }) => {
    const isCurrentSong = currentIndex === index;
    const cond = playing && isCurrentSong;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        {cond ? (
          <Ionicons onPress={pause} color={'#8b9dc3'} size={40} name={'md-pause'} />
        ) : isEnded && isCurrentSong ? (
          <Ionicons onPress={replay} color={'#8b9dc3'} size={40} name={'refresh'} />
        ) : (
          <Ionicons
            onPress={() => {
              skip(index);
            }}
            color={'#8b9dc3'}
            size={40}
            name={'md-play'}
          />
        )}
        <Text
          style={{ fontWeight: isCurrentSong ? 'bold' : 'normal', fontSize: 18, marginLeft: 12, flex: 1 }}
          numberOfLines={1}>
          {item.title}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons color={'#3b5998'} size={30} name={'heart-outline'} />
          <Ionicons color={'#3b5998'} size={30} name={'information-circle'} />
          <Ionicons color={'#3b5998'} size={30} name={'ellipsis-vertical'} />
        </View>
      </View>
    );
  };
  return (
    <TracksContext.Provider
      value={{
        replay,
        pause,
        playing,
        openModal,
        previous,
        forward,
        tracks,
        currentIndex,
        setTrackIndex,
        addTracks,
        isNotFirst,
        isNotLast,
      }}>
      {children}
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} onChange={handleSheetChanges}>
        <BottomSheetFlatList
          data={tracks}
          keyExtractor={(i, index) => index + '_music'}
          renderItem={renderItem}
          contentContainerStyle={{ backgroundColor: 'white', paddingHorizontal: 12 }}
        />
      </BottomSheet>
    </TracksContext.Provider>
  );
};

export default TracksProvider;
