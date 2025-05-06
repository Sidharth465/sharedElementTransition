import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import CoachGif from '@assets/gif.gif';
import {useAuth} from '@context/AuthProvider';

const LoginScreen = () => {
  const {login} = useAuth();
  const handleContinue = () => {
    login();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleContinue}>
        <SharedElement id="image1">
          <Image style={styles.image} source={CoachGif} />
        </SharedElement>
      </Pressable>
      <Text style={styles.label}>Login Screen</Text>
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
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});
