import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import CoachGif from '@assets/gif.gif';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SharedElement id={'image1'}>
        <Image style={styles.image} source={CoachGif} />
      </SharedElement>
      <Text style={styles.label}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
