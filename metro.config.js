const {withNativeWind} = require('nativewind/metro');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    unstable_allowRequireContext: true,
  },
  resolver: {
    sourceExts: [...sourceExts, 'svg'],
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
  },
});

module.exports = withNativeWind(config, {
  input: "./global.css"
});
