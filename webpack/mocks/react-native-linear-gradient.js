const React = require('react');
const { View } = require('react-native-web');

const LinearGradient = (props) => React.createElement(View, { ...props, style: [props.style, { backgroundImage: `linear-gradient(${props.colors.join(',')})` }] }, props.children);

module.exports = LinearGradient;
