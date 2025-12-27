const React = require('react');
const { Image } = require('react-native-web');

const FastImage = (props) => {
    // fast-image uses source={uri: ...} but web Image uses src or source.
    // react-native-web Image handles source compatible with RN.
    return React.createElement(Image, props);
}

FastImage.resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
};

module.exports = FastImage;
