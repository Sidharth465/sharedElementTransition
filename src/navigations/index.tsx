import {
  NavigationContainer,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import {Route} from '@utils/routes';
import React from 'react';
import {Easing} from 'react-native-reanimated';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: any, params?: object) {
  navigationRef.current?.navigate(name, params);
}

export function setParams(params: object) {
  navigationRef.current?.setParams(params);
}

export function setTopLevelNavigator(navigatorRef: any) {
  navigationRef.current = navigatorRef;
}

export function goBack() {
  navigationRef.current?.dispatch(StackActions.pop(1));
}

export function replace(name: any, params?: object) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

const Stack = createSharedElementStackNavigator();

const RootNavigation = () => {
  const fadeInOutTransition = ({current}) => ({
    cardStyle: {
      opacity: current.progress, // Fade effect
    },
  });
  const customSharedTransition = {
    open: {
      animation: 'timing',
      config: {
        duration: 550, // Adjust duration as needed
        easing: Easing.ease, // Ease-in-out effect
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 550,
        easing: Easing.ease, // Ease-in-out effect
      },
    },
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Route.ONBOARD}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          cardStyleInterpolator: ({current}) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 550},
            },
            close: {
              animation: 'timing',
              config: {duration: 550},
            },
          },
        }}>
        <Stack.Screen name={Route.ONBOARD} component={OnboardingScreen} />
        <Stack.Screen
          name={Route.HOME}
          sharedElements={route => {
            console.log('At SharedElement', route);
            const {sharedId} = route.params ?? {};
            return [
              {
                id: sharedId ? [sharedId] : ['image1'],
                animation: 'move',
                resize: 'clip',
              },
            ];
          }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
