/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, PureComponent } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import VersionNumber from 'react-native-version-number';
import { ThemeProvider } from './src/store/ThemeContext';
import { Provider } from './src/store/GeneralContext';
import { ApolloClientProvider } from './src/store/ApolloContext';
import { QueryProvider } from './src/store/QueryContext';

import RootNavigation from './src/navigations/';

import config, { isProduction } from './config';

class App extends PureComponent {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
    return (
      <ThemeProvider>
        <ApolloClientProvider>
          <Provider>
            <QueryProvider>
              <RootNavigation />
            </QueryProvider>
          </Provider>
        </ApolloClientProvider>
      </ThemeProvider>
    );
  }
}

export default App;
