import React from 'react';
import { View, Text } from 'react-native';

export const appleAuth = {
  performRequest: () => Promise.resolve(),
  Operation: {},
  Scope: {},
};

export const AppleButton = (props) => (
  <View {...props} style={[{ backgroundColor: 'black', padding: 10 }, props.style]}>
    <Text style={{ color: 'white' }}>Sign in with Apple (Mock)</Text>
  </View>
);

export default appleAuth;
