import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import CoachGif from '@assets/gif.gif';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={CoachGif} />

      <Text style={styles.label}>Cart Screen</Text>
    </View>
  );
};

export default CartScreen;

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
