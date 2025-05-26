import CoachGif from '@assets/gif.gif';
import RadialGradientBackground from '@components/RadialGradientBackground';
import RNText from '@components/RNText';
import {saveToStorage} from '@utils/local-storage';
import {Route} from '@utils/routes';
import React, {useState, useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {SharedElement} from 'react-navigation-shared-element';

const OnboardingScreen = ({
  navigation,
  setIsAppFirstLaunch,
}: {
  navigation: any;
  setIsAppFirstLaunch: (value: boolean) => void;
}) => {
  const handleContinue = async () => {
    // Add a slight delay to ensure the shared element is ready
    navigation.navigate(Route.LOGIN, {tagName: 'sharedTag1'});
    setIsAppFirstLaunch(false);
    saveToStorage({key: 'isAppFirstLaunch', value: 'false'});
    // setTimeout(() => {
    //   navigation.navigate(Route.LOGIN);
    //   setIsAppFirstLaunch(false);
    //   saveToStorage({key: 'isAppFirstLaunch', value: 'false'});
    // }, 100); // 100ms delay
  };

  return (
    <RadialGradientBackground>
      <View style={styles.container}>
        <Text style={styles.label}>OnboardingScreen</Text>
        <RNText size={'md'} weight="regular" numberOfLines={1}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quod, quia, quibusdam
        </RNText>

        <Pressable onPress={handleContinue}>
          <SharedElement id="sharedTag1">
            <Animated.Image
              source={CoachGif}
              style={styles.image}
              resizeMode="cover"
            />
          </SharedElement>
        </Pressable>
      </View>
    </RadialGradientBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
