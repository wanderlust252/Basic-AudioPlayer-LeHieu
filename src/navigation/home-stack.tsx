import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home';
import PizzaCarousel from '@/screens/PizzaCarousel';
import TimerAnimation from '../screens/TimerAnimation';
import TinderCard from '@/screens/TinderCard';
import LoginForm from '@/screens/LoginForm';
import FloatingActionButton from '@/screens/FloatingActionButton';
type HomeStackParamList = {
  Home: undefined;
  TimerAnimation: undefined;
  PizzaCarousel: undefined;
  TinderCard: undefined;
  LoginForm: undefined;
  FloatingActionButton: undefined;

  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator headerMode="none" initialRouteName="FloatingActionButton">
      {/*<HomeStack.Screen name={screens.walkthrough} component={WalkThrough} />*/}
      {/* <HomeStack.Screen name={'Home'} component={Home} /> */}
      <HomeStack.Screen name={'TimerAnimation'} component={TimerAnimation} />
      <HomeStack.Screen name={'PizzaCarousel'} component={PizzaCarousel} />
      <HomeStack.Screen name={'TinderCard'} component={TinderCard} />
      <HomeStack.Screen name={'FloatingActionButton'} component={FloatingActionButton} />
      <HomeStack.Screen name={'LoginForm'} component={LoginForm} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
