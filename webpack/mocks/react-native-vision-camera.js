const React = require('react');
const { View } = require('react-native-web');

module.exports = {
  Camera: (props) => React.createElement(View, props),
  useCameraDevices: () => ({ back: {}, front: {} }),
  useFrameProcessor: () => {},
};
