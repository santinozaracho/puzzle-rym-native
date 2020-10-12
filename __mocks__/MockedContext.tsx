import 'react-native';
import React from 'react';
import { QueryProvider } from '../src/store/QueryContext';
import { ThemeProvider } from '../src/store/ThemeContext';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

interface Props {
  component: React.FC;
}

export const MockedContext: React.FC<Props> = ({ component }) => {
  const Stack = createStackNavigator();
  return (
    <ThemeProvider>
      <QueryProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="test" component={component} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryProvider>
    </ThemeProvider>
  );
};
