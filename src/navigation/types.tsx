import { DrawerScreenProps } from '@react-navigation/drawer';

export type HomeStackParamList = {
  Example: undefined;
  ExampleWithSpring: undefined;
  ExamplePanResponder: undefined;
  ExampleWithDecay: undefined;
  DragSortingList: undefined;
  DragSortingListAudioPlayer: undefined;
};
export type ExampleWithSpringProps = DrawerScreenProps<HomeStackParamList, 'ExampleWithSpring'>;
export type DragSortingListProps = DrawerScreenProps<HomeStackParamList, 'DragSortingList'>;
export type DragSortingListAudioPlayerProps = DrawerScreenProps<HomeStackParamList, 'DragSortingListAudioPlayer'>;
export type ExampleProps = DrawerScreenProps<HomeStackParamList, 'Example'>;
export type ExamplePanResponderProps = DrawerScreenProps<HomeStackParamList, 'ExamplePanResponder'>;
export type ExampleWithDecayProps = DrawerScreenProps<HomeStackParamList, 'ExampleWithDecay'>;
