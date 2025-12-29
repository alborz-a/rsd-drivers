import React, { useEffect, useRef, useState } from 'react';
import { Input, Text, XStack, YStack } from 'tamagui';
import { useLanguage } from '../contexts/LanguageContext';
import useAppTheme from '../hooks/use-app-theme';

const IRAN_COUNTRY = {
    code: 'IR',
    phone: '98',
    emoji: '🇮🇷'
};

const PhoneInput = ({ value, onChange, bg, width = '100%', size = '$5', wrapperProps = {} }) => {
    const { t } = useLanguage();
    const { isDarkMode } = useAppTheme();
    
    // Initialize phone number state
    const [phoneNumber, setPhoneNumber] = useState(() => {
        if (typeof value === 'string' && value.startsWith('+98')) {
            return `0${value.substring(3)}`;
        }
        // Return raw value (without country code) or empty string
        return value || '';
    });

    const phoneInputRef = useRef(null);
    const backgroundColor = bg ? bg : isDarkMode ? '$surface' : '$gray-200';

    const handleInputFocus = () => {
        // No bottom sheet to close anymore
    };

    useEffect(() => {
        if (onChange) {
            const rawPhoneNumber = phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber;
            const combinedValue = `+${IRAN_COUNTRY.phone}${rawPhoneNumber}`;
            onChange(combinedValue, rawPhoneNumber, IRAN_COUNTRY);
        }
    }, [phoneNumber, onChange]);

    return (
        <YStack space='$4' {...wrapperProps}>
            <Input
                size={size}
                ref={phoneInputRef}
                width='100%'
                placeholder={t('PhoneInput.enterFullPhoneNumber', 'Enter phone number, e.g. 0912...')}
                keyboardType='phone-pad'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onFocus={handleInputFocus}
                bg={backgroundColor}
                color='$textPrimary'
                textAlign='left'
                borderRadius='$5'
                borderWidth={1}
                borderColor='$borderColorWithShadow'
                overflow='hidden'
                placeholderTextColor={isDarkMode ? '$gray-700' : '$gray-400'}
                direction='ltr'
            />
        </YStack>
    );
};

export default PhoneInput;