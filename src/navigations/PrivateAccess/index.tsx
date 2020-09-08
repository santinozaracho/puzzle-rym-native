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
    options: { title: 'Home' },
  },
  {
    name: 'details',
    component: DetailsScreen,
    options: {
      title: 'Details',
    },
  },
];

/**
 * @description screens manager navigator for user authenticated
 * @return {component}
 */
export const PrivateStack: React.FC<PrivateStackProps> = props => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="home">
      {screens.map(({ name, component, options }) => (
        <Stack.Screen name={name} component={component} key={name} options={options} />
      ))}
    </Stack.Navigator>
  );
};
