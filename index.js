import 'react-native-url-polyfill/auto';
import { TextDecoder, TextEncoder } from 'text-encoding';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

if (__DEV__) {
  import('@/reactotron.config');
}

AppRegistry.registerComponent(appName, () => App);
