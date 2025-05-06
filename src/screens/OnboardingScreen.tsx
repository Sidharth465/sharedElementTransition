import CoachGif from '@assets/gif.gif';
import RNText from '@components/RNText';
import {saveToStorage} from '@utils/local-storage';
import {Route} from '@utils/routes';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const OnboardingScreen = ({
  navigation,
  setIsAppFirstLaunch,
}: {
  navigation: any;
  setIsAppFirstLaunch: (value: boolean) => void;
}) => {
  const handleContinue = async () => {
    navigation.navigate(Route.LOGIN);
    setIsAppFirstLaunch(false);
    saveToStorage({key: 'isAppFirstLaunch', value: 'false'});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>OnboardingScreen</Text>
      <RNText size={'md'} weight="regular" numberOfLines={1}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quod, quia, quibusdam
      </RNText>

      <Pressable onPress={handleContinue}>
        <SharedElement id="image1">
          <Image source={CoachGif} resizeMode="contain" style={styles.image} />
        </SharedElement>
      </Pressable>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
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
});
