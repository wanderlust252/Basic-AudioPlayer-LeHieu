/* eslint-disable @typescript-eslint/no-namespace */
import { Data } from '@/screens/CardListSharedElement/data';
import { NavigatorScreenParams } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageRequireSource } from 'react-native';
declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackParamList {}
  }
}
// HomeStackParamList
export type HomeStackParamList = {
  DragSortingListAudioPlayer: undefined;
  CardListStackParamList: NavigatorScreenParams<CardListStackParamList>;
};
export type DragSortingListAudioPlayerProps = NativeStackScreenProps<HomeStackParamList, 'DragSortingListAudioPlayer'>;
// CardListStackParamList
export type CardListStackParamList = {
  CardDetail: Data;
  CardListSharedElement: undefined;
};
export type CardListSharedElementProps = NativeStackScreenProps<CardListStackParamList, 'CardListSharedElement'>;
export type CardDetailProps = NativeStackScreenProps<CardListStackParamList, 'CardDetail'>;
