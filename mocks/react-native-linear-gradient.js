import React from 'react';
import { View } from 'react-native';

const LinearGradient = ({ children, style, ...props }) => {
  return <View style={style} {...props}>{children}</View>;
};

export default LinearGradient;
