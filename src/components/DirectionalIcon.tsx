import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { getRTLIconStyle } from '../utils/localization';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { StyleProp } from 'react-native';

interface DirectionalIconProps {
    icon: IconProp;
    style?: StyleProp<FontAwesomeIconStyle>;
    [key: string]: any;
}

const DirectionalIcon: React.FC<DirectionalIconProps> = ({ icon, style, ...props }) => {
    const rtlStyle = getRTLIconStyle();
    const combinedStyle = rtlStyle ? [style, rtlStyle] : style;

    return <FontAwesomeIcon icon={icon} style={combinedStyle} {...props} />;
};

export default DirectionalIcon;
