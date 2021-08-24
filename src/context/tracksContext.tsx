import { TrackInfo } from '@/screens/DragSortingListAudioPlayer';
import React, { createContext, useState, FunctionComponent } from 'react';
export type TracksContextState = {
  tracks: TrackInfo[];
  currentIndex: number;
  setTrackIndex: (newState: number) => void;
  addTracks: (newState: TrackInfo[]) => void;
};
const contextDefaultValues: TracksContextState = {
  tracks: [],
  currentIndex: -1,
  setTrackIndex: () => 0,
  addTracks: () => 0,
};

export const TracksContext = createContext<TracksContextState>(contextDefaultValues);
let tracks: TrackInfo[] = [];
const TracksProvider: FunctionComponent = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const addTracks = (newState: TrackInfo[]) => {
    tracks = tracks.concat(newState);
  };
  const setTrackIndex = (newState: number) => {
    setCurrentIndex(newState);
  };
  return (
    <TracksContext.Provider
      value={{
        tracks,
        currentIndex,
        setTrackIndex,
        addTracks,
      }}>
      {children}
    </TracksContext.Provider>
  );
};

export default TracksProvider;
