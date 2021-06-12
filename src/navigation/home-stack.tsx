import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home';
import Main from '../screens/Main';
type HomeStackParamList = {
  Home: undefined;
  Main: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator headerMode="none" initialRouteName="Main">
      {/*<HomeStack.Screen name={screens.walkthrough} component={WalkThrough} />*/}
      <HomeStack.Screen name={'Home'} component={Home} />
      <HomeStack.Screen name={'Main'} component={Main} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
