import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IntroScreen } from '../../screens/Intro';

// tslint:disable-next-line: no-empty-interface
interface PublicStackProps {}

const Stack = createStackNavigator();

const screens: [
  {
    name: string;
    component: any;
    title: string;
  },
] = [
  {
    name: 'intro',
    component: IntroScreen,
    title: 'Welcome',
  },
];

/**
 * @description screens manager navigator for user not authenticated
 * @return {component}
 */
export const PublicStack: React.FC<PublicStackProps> = props => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="intro">
      {screens.map(({ name, component, title }) => (
        <Stack.Screen name={name} component={component} key={name} options={{ title }} />
      ))}
    </Stack.Navigator>
  );
};
