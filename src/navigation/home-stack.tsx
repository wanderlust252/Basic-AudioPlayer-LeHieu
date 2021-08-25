import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import DragSortingListAudioPlayer from '@/screens/DragSortingListAudioPlayer';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ header: () => null }} initialRouteName="DragSortingListAudioPlayer">
      <HomeStack.Screen name={'DragSortingListAudioPlayer'} component={DragSortingListAudioPlayer} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
