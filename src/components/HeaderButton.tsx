import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Button, useTheme } from 'tamagui';

const HeaderButton = ({ icon, size = 35, onPress, bg = '$secondary', iconColor = '$textPrimary', borderWidth = 0, borderColor = '$borderColor', iconStyle, ...props }) => {
    const theme = useTheme();

    const handlePress = function () {
        if (typeof onPress === 'function') {
            onPress();
        }
    };

    return (
        <Button onPress={handlePress} justifyContent='center' alignItems='center' bg={bg} borderWidth={borderWidth} borderColor={borderColor} circular size={size} {...props}>
            <Button.Icon>
                <FontAwesomeIcon icon={icon ? icon : faBolt} color={theme[iconColor].val} style={iconStyle} />
            </Button.Icon>
        </Button>
    );
};

export default HeaderButton;
