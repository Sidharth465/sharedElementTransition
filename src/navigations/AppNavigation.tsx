import HomeScreen from '@screens/HomeScreen';
import {Route} from '@utils/routes';
import React from 'react';
import {Easing} from 'react-native-reanimated';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

enableScreens();

const Stack = createSharedElementStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.HOME}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name={Route.HOME}
        component={HomeScreen}
        options={{
          cardStyleInterpolator: ({current}: {current: any}) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 550,
                easing: Easing.inOut(Easing.ease),
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 550,
                easing: Easing.inOut(Easing.ease),
              },
            },
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
