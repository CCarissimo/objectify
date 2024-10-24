/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:@react-native/babel-preset', "nativewind/babel"],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src', "./"],
        extensions: ['.js', '.json', ".ts", ".tsx", ".jsx"],
        alias: {
          '@': './src',
          "tailwind.config": "./tailwind.config.js"
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin', // needs to be last
  ],
};
