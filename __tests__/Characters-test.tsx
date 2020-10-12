import 'react-native';
import React from 'react';
import { render } from '@testing-library/react';
import Characters from '../src/components/SearchResult/QueryComponents/Characters';
import { MockedProvider } from '@apollo/client/testing';
import { CHARACTERS_MOCKS } from './mocks/charactersQuery';
import { QueryProvider } from '../src/store/QueryContext';
import { ThemeProvider } from '../src/store/ThemeContext';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

/**
 * @format
 */

describe('Characters Component correct rendering with moked Query', () => {
  const Stack = createStackNavigator();
  const { findAllByText } = render(
    <ThemeProvider>
      <MockedProvider mocks={CHARACTERS_MOCKS}>
        <QueryProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Characters test" component={Characters} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryProvider>
      </MockedProvider>
    </ThemeProvider>,
  );

  it('shoud render correctly the two items whit the MockeQuery', async () => {
    const items = await findAllByText('Solicitor Rick');
    expect(items).toHaveLength(2);
  });
});
