import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@screens/LoginScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import {Route} from '@utils/routes';
import React from 'react';
import {Easing} from 'react-native';

const Stack = createStackNavigator();

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
      initialRouteName={isAppFirstLaunch ? Route.ONBOARD : Route.LOGIN}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
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
      }}>
      {isAppFirstLaunch && (
        <Stack.Screen
          name={Route.ONBOARD}
          children={({navigation}: {navigation: any}) => (
            <OnboardingScreen
              setIsAppFirstLaunch={setIsAppFirstLaunch}
              navigation={navigation}
            />
          )}
        />
      )}
      <Stack.Screen name={Route.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
