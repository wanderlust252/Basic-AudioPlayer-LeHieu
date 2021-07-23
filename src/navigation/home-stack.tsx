import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home';
import PizzaCarousel from '@/screens/PizzaCarousel';
import TimerAnimation from '../screens/TimerAnimation';
type HomeStackParamList = {
  Home: undefined;
  TimerAnimation: undefined;
  PizzaCarousel: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator headerMode="none" initialRouteName="PizzaCarousel">
      {/*<HomeStack.Screen name={screens.walkthrough} component={WalkThrough} />*/}
      {/* <HomeStack.Screen name={'Home'} component={Home} /> */}
      <HomeStack.Screen name={'TimerAnimation'} component={TimerAnimation} />
      <HomeStack.Screen name={'PizzaCarousel'} component={PizzaCarousel} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
