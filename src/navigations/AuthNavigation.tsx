import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import LoginScreen from '@screens/LoginScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import {Route} from '@utils/routes';
import React from 'react';

const Stack = createSharedElementStackNavigator();

const AuthNavigation = ({
  isAppFirstLaunch,
  setIsAppFirstLaunch,
}: {
  isAppFirstLaunch: boolean;
  setIsAppFirstLaunch: (value: boolean) => void;
}) => {
  console.log('isAppFirstLaunch at AuthNavigation', isAppFirstLaunch);
  return (
    <Stack.Navigator
      initialRouteName={Route.ONBOARD}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}>
      <Stack.Screen
        name={Route.ONBOARD}
        component={OnboardingScreen}
        initialParams={{setIsAppFirstLaunch}}
      />
      <Stack.Screen name={Route.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
