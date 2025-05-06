module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@navigations': './src/navigations',
          '@components': './src/components',
          '@context': './src/context',
          '@utils': './src/utils',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
};
