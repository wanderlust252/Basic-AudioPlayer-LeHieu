import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStackParamList } from './types';
import DragSortingListAudioPlayer from '@/screens/DragSortingListAudioPlayer';

const HomeStack = createDrawerNavigator<HomeStackParamList>();
const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ header: () => null }} initialRouteName="DragSortingListAudioPlayer">
      <HomeStack.Screen name={'DragSortingListAudioPlayer'} component={DragSortingListAudioPlayer} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
