import React, {ReactNode} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Defs, RadialGradient, Rect, Stop} from 'react-native-svg';

export default function RadialGradientBackground({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <View style={styles.container}>
      {/* Radial Gradient Background */}
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%">
            <Stop offset="0%" stopColor="#745EB5" stopOpacity="1" />

            <Stop offset="100%" stopColor="#1B1536" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
      </Svg>

      {/* Content on top */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
