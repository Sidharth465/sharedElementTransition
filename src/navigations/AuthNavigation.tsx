import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import {Route} from '@utils/routes';
import React from 'react';

const Stack = createNativeStackNavigator();

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
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name={Route.ONBOARD}
        component={({navigation}: {navigation: any}) => (
          <OnboardingScreen
            setIsAppFirstLaunch={setIsAppFirstLaunch}
            navigation={navigation}
          />
        )}
      />
      <Stack.Screen name={Route.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
