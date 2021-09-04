import React from 'react';
import { CardListStackParamList } from './types';
import CardListSharedElement from '@/screens/CardListSharedElement';
import CardDetail from '@/screens/CardListSharedElement/CardDetail';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
const CardListStack = createSharedElementStackNavigator<CardListStackParamList>();
const CardListNavigator: React.FC = () => {
  return (
    <CardListStack.Navigator
      mode={'modal'}
      detachInactiveScreens={false}
      screenOptions={{
        header: () => null,
        gestureEnabled: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: ({ current: { progress } }) => {
          const opacity = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });
          return { cardStyle: { opacity } };
        },
      }}
      initialRouteName="CardListSharedElement">
      <CardListStack.Screen name={'CardListSharedElement'} component={CardListSharedElement} />
      <CardListStack.Screen
        name={'CardDetail'}
        component={CardDetail}
        sharedElements={(route, otherRoute, showing) => {
          const { date } = route.params;
          return [date];
        }}
      />
    </CardListStack.Navigator>
  );
};
export default CardListNavigator;
