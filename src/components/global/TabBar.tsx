import {
  Dimensions,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Colors} from '@utils/theme/Colors';

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
    const slidevalue = 0.41;

    return {
      left: withTiming(baseLeft + state?.index * screenWidth * slidevalue, {
        duration: 300,
      }),
    };
  });

  console.log('state', JSON.stringify(state, null, 2));
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

          return (
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
                {label?.toString()?.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View style={styles.verticalLine} />
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
    bottom: 0,
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
    width: '45%',
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
});
