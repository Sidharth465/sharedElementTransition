import TabBar from '@components/global/TabBar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CartScreen from '@screens/CartScreen';
import FavoriteScreen from '@screens/FavoriteScreen';
import HomeScreen from '@screens/HomeScreen';
import {Route} from '@utils/routes';
import {Colors} from '@utils/theme/Colors';
import {Platform, useColorScheme} from 'react-native';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        lazy: true,
        animation: 'fade',
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },

          default: {},
        }),
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={Route.HOME}>
      <Tab.Screen name={Route.HOME} component={HomeScreen} />
      <Tab.Screen name={Route.FAVORITE} component={FavoriteScreen} />
      <Tab.Screen name={Route.CART} component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
