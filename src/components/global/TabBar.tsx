import CoachGif from '@assets/gif.gif';
import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const TabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const bottom = useSafeAreaInsets().bottom;

  const screenWidth = Dimensions.get('window').width;

  const indicatorStyle = useAnimatedStyle(() => {
    const baseLeft = screenWidth * 0.015;
    const slidevalue = 0.245;

    return {
      left: withTiming(baseLeft + state?.index * screenWidth * slidevalue, {
        duration: 300,
      }),
      display:
        state?.routes[state?.index]?.name === 'Favorite' ? 'none' : 'flex',
    };
  });

  return (
    <Animated.View style={[styles.tabBarContainer, {paddingBottom: bottom}]}>
      <View style={styles.tabContainer}>
        <Animated.View style={[indicatorStyle, styles.sliderIndicator]} />
        {state?.routes?.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options?.tabBarLabel !== undefined
              ? options?.tabBarLabel
              : options.title !== undefined
              ? options?.title
              : route.name;

          const isFocused = state.index == index;
          const onPress = (event: GestureResponderEvent) => {
            const eventResult = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !eventResult.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          const onLongPress = () => {
            navigation.emit({type: 'tabLongPress', target: route.key});
          };
          const scaleCoachAnimated = useAnimatedStyle(() => ({
            height: withTiming(isFocused ? 75 : 60, {duration: 200}),
            width: withTiming(isFocused ? 75 : 60, {duration: 200}),
          }));

          return (
            <>
              {label == 'Favorite' ? (
                <Pressable
                  key={index}
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarButtonTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}>
                  <Animated.Image
                    source={CoachGif}
                    style={[scaleCoachAnimated]}
                  />
                </Pressable>
              ) : (
                <TouchableOpacity
                  accessibilityRole="button"
                  key={index}
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarButtonTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.tab}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: isFocused ? '#33b6ff' : 'black',
                      fontWeight: '500',
                    }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    width: '100%',
    position: 'absolute',
    height: Platform.OS == 'android' ? 60 : 100,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    elevation: 5,
    shadowRadius: 11,
    shadowColor: '#000',
    bottom: 10,
    zIndex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    width: Dimensions.get('window').width * 0.8,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    height: '85%',
    borderRadius: 40,
  },
  sliderIndicator: {
    position: 'absolute',
    height: '80%',
    borderRadius: 20,
    width: '35%',
    backgroundColor: '#fff',
    elevation: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  verticalLine: {
    marginHorizontal: 10,
    height: '90%',
    width: 2,
    position: 'absolute',
    left: '47%',
    borderRadius: 20,
    opacity: 0.2,
    backgroundColor: '#B4B4B4', // Using default color
    zIndex: 0,
  },
  image: {
    width: 60,
    height: 60,
  },
});
