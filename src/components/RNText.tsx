import React from 'react';
import {Text, TextProps, StyleProp, TextStyle} from 'react-native';

const fontMap = {
  black: 'Urbanist-Black',
  blackItalic: 'Urbanist-BlackItalic',
  bold: 'Urbanist-Bold',
  boldItalic: 'Urbanist-BoldItalic',
  extraBold: 'Urbanist-ExtraBold',
  extraBoldItalic: 'Urbanist-ExtraBoldItalic',
  extraLight: 'Urbanist-ExtraLight',
  extraLightItalic: 'Urbanist-ExtraLightItalic',
  italic: 'Urbanist-Italic',
  light: 'Urbanist-Light',
  lightItalic: 'Urbanist-LightItalic',
  medium: 'Urbanist-Medium',
  mediumItalic: 'Urbanist-MediumItalic',
  regular: 'Urbanist-Regular',
  semiBold: 'Urbanist-SemiBold',
  semiBoldItalic: 'Urbanist-SemiBoldItalic',
  thin: 'Urbanist-Thin',
  thinItalic: 'Urbanist-ThinItalic',
} as const;

type FontKey = keyof typeof fontMap;

type Weight =
  | 'black'
  | 'bold'
  | 'extraBold'
  | 'extraLight'
  | 'italic'
  | 'light'
  | 'medium'
  | 'regular'
  | 'semiBold'
  | 'thin';

const fontSizeMap = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 26,
} as const;

type FontSizeKey = keyof typeof fontSizeMap;

interface RNTextProps extends TextProps {
  children: React.ReactNode;
  weight?: Weight;
  italic?: boolean;
  color?: string;
  size?: number | FontSizeKey;
  style?: StyleProp<TextStyle>;
}

const RNText = ({
  children,
  weight = 'regular',
  italic = false,
  color = '#000',
  size = 'md',
  style,
  ...rest
}: RNTextProps) => {
  const fontKey = (italic ? `${weight}Italic` : weight) as FontKey;
  const fontFamily = fontMap[fontKey] ?? fontMap.regular;
  const resolvedFontSize =
    typeof size === 'string' ? fontSizeMap[size] ?? fontSizeMap.md : size;

  return (
    <Text
      {...rest}
      style={[{fontFamily, color, fontSize: resolvedFontSize}, style]}>
      {children}
    </Text>
  );
};

export default RNText;
