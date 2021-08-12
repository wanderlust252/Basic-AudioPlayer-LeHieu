import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EXPOCameraFilterDemo from '@/screens/EXPOCameraFilterDemo';
export type HomeStackParamList = {
  Home: undefined;
  TimerAnimation: undefined;
  PizzaCarousel: undefined;
  TinderCard: undefined;
  LoginForm: undefined;
  FloatingActionButton: undefined;
  DonutChartDemo: undefined;
  FilterImageDemo: undefined;
  EXPOCameraFilterDemo: undefined;
  HappyBirthday: undefined;
  ImageCarousel: undefined;
  AnimationExample: undefined;
  ListSortedAnimation: undefined;
};
const HomeStack = createDrawerNavigator<HomeStackParamList>();
const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ header: () => null }} initialRouteName="EXPOCameraFilterDemo">
      <HomeStack.Screen name={'EXPOCameraFilterDemo'} component={EXPOCameraFilterDemo} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
