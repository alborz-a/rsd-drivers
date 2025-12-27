// index.native.tsx
// IMPORTANT: react-native-gesture-handler MUST be imported first, before any React Native imports
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
