const React = require('react');
const { View } = require('react-native-web');

const MockComponent = (props) => React.createElement(View, props);

module.exports = {
  default: MockComponent,
  MapView: MockComponent,
  Marker: MockComponent,
  Polyline: MockComponent,
  PROVIDER_GOOGLE: 'google',
};
