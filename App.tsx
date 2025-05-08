import React, {useEffect, useState} from 'react';

import {
  NavigationContainer,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import SplashScreen from '@screens/SplashScreen';
import AppNavigation from '@navigations/AppNavigation';
import AuthNavigation from '@navigations/AuthNavigation';
import {getFromStorage} from '@utils/local-storage';
import AuthProvider, {useAuth} from '@context/AuthProvider';
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

const AppComponent = () => {
  const [loading, setLoading] = useState(false);
  const {session, login} = useAuth();
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState<boolean>(true);

  const checkLogin = () => {
    try {
      setLoading(true);
      const appData = getFromStorage({key: 'isAppFirstLaunch'});
      console.log('isAppFirstLaunch', appData);
      if (appData == 'false') {
        setIsAppFirstLaunch(false);
      }

      // if (!session) {
      //   throw new Error(`Token does'nt exist`);
      // }
      if (session) {
        login();
      }
    } catch (error) {
      console.log('Error checking login at App.tsx', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [session]);
  return (
    <NavigationContainer ref={navigationRef}>
      {loading ? (
        <SplashScreen />
      ) : session ? (
        <AppNavigation />
      ) : (
        <AuthNavigation
          isAppFirstLaunch={isAppFirstLaunch}
          setIsAppFirstLaunch={setIsAppFirstLaunch}
        />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppComponent />
    </AuthProvider>
  );
};

export default App;
