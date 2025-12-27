import React from 'react';
import { View, Text } from 'react-native';

export const PROVIDER_GOOGLE = 'google';
export const PROVIDER_DEFAULT = 'default';

const MapView = (props) => {
  return <View style={props.style}><Text>Map View Mock</Text>{props.children}</View>;
};

export const Marker = (props) => <View {...props} />;
export const Callout = (props) => <View {...props} />;
export const Polyline = (props) => <View {...props} />;
export const Polygon = (props) => <View {...props} />;
export const Circle = (props) => <View {...props} />;

export default MapView;
