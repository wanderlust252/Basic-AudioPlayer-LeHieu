import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import DragSortingListAudioPlayer from '@/screens/DragSortingListAudioPlayer';
import CardListNavigator from './cardList-stack';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ header: () => null }} initialRouteName="CardListStackParamList">
      <HomeStack.Screen name={'DragSortingListAudioPlayer'} component={DragSortingListAudioPlayer} />
      <HomeStack.Screen name={'CardListStackParamList'} component={CardListNavigator} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
