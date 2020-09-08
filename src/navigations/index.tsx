import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PublicStack } from './PublicAccess';
import { PrivateStack } from './PrivateAccess';
import useGeneralContext from '../store/GeneralContext';
import Spinner from 'react-native-loading-spinner-overlay';

const Stack = createStackNavigator();
/**
 * @description Root navigator that handle redirection to authentication or main screens
 * @return {component}
 */

// tslint:disable-next-line: no-empty-interface
interface RootNavigationProps {}

const RootNavigation: React.FC<RootNavigationProps> = props => {
  const { loading } = useGeneralContext();

  return (
    <SafeAreaProvider>
      {loading && <Spinner visible={loading} />}
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="intro" component={PublicStack} />
          <Stack.Screen name="main" component={PrivateStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
