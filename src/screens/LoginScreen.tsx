import CoachGif from '@assets/gif.gif';
import {useAuth} from '@context/AuthProvider';
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';

const LoginScreen = () => {
  const {login} = useAuth();

  const handleContinue = () => {
    login();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleContinue}>
        <Animated.Image
          sharedTransitionTag={`sharedTag1`}
          style={styles.image}
          source={CoachGif}
        />
      </Pressable>

      <Text style={styles.label}>Login Screen</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Login" onPress={login} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  label: {
    fontSize: 18,
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
