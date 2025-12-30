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
    // Combine styles - use type assertion to avoid complex type issues
    const combinedStyle = rtlStyle ? [style, rtlStyle].flat() : style;

    return <FontAwesomeIcon icon={icon} style={combinedStyle as any} {...props} />;
};

export default DirectionalIcon;
