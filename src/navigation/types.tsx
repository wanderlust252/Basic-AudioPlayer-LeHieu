import { DrawerScreenProps } from '@react-navigation/drawer';

export type HomeStackParamList = {
  Example: undefined;
  ExampleWithSpring: undefined;
  ExamplePanResponder: undefined;
  ExampleWithDecay: undefined;
};
export type ExampleWithSpringProps = DrawerScreenProps<HomeStackParamList, 'ExampleWithSpring'>;
export type ExampleProps = DrawerScreenProps<HomeStackParamList, 'Example'>;
export type ExamplePanResponderProps = DrawerScreenProps<HomeStackParamList, 'ExamplePanResponder'>;
export type ExampleWithDecayProps = DrawerScreenProps<HomeStackParamList, 'ExampleWithDecay'>;
