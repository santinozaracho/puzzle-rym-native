import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../../screens/Home';
import { DetailsScreen } from '../../screens/Details';

// tslint:disable-next-line: no-empty-interface
interface PrivateStackProps {}

const Stack = createStackNavigator();

const screens = [
  {
    name: 'home',
    component: HomeScreen,
    title: 'Home Screen',
  },
  {
    name: 'details',
    component: DetailsScreen,
    title: 'Details Screen',
  },
];

/**
 * @description screens manager navigator for user authenticated
 * @return {component}
 */
export const PrivateStack: React.FC<PrivateStackProps> = props => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="home">
      {screens.map(({ name, component, title }) => (
        <Stack.Screen name={name} component={component} key={name} options={{ title }} />
      ))}
    </Stack.Navigator>
  );
};
