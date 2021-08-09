import React from 'react';
import PizzaCarousel from '@/screens/PizzaCarousel';
import TimerAnimation from '../screens/TimerAnimation';
import TinderCard from '@/screens/TinderCard';
import LoginForm from '@/screens/LoginForm';
import FloatingActionButton from '@/screens/FloatingActionButton';
import DonutChartDemo from '@/screens/DonutChartDemo';
import HappyBirthday from '@/screens/HappyBirthday';
import ImageCarousel from '@/screens/ImageCarousel';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AnimationExample from '@/screens/AnimationExample';
import ListSortedAnimation from '@/screens/ListSortedAnimation';
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
    <HomeStack.Navigator screenOptions={{ header: () => null }} initialRouteName="ListSortedAnimation">
      <HomeStack.Screen name={'TimerAnimation'} component={TimerAnimation} />
      <HomeStack.Screen name={'AnimationExample'} component={AnimationExample} />
      <HomeStack.Screen name={'PizzaCarousel'} component={PizzaCarousel} />
      <HomeStack.Screen name={'TinderCard'} component={TinderCard} />
      <HomeStack.Screen name={'HappyBirthday'} component={HappyBirthday} />
      <HomeStack.Screen name={'FloatingActionButton'} component={FloatingActionButton} />
      <HomeStack.Screen name={'LoginForm'} component={LoginForm} />
      <HomeStack.Screen name={'DonutChartDemo'} component={DonutChartDemo} />
      {/* <HomeStack.Screen name={'FilterImageDemo'} component={FilterImageDemo} /> */}
      <HomeStack.Screen name={'ImageCarousel'} component={ImageCarousel} />
      <HomeStack.Screen name={'ListSortedAnimation'} component={ListSortedAnimation} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
