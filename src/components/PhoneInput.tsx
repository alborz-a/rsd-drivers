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
            return value.substring(3);
        }
        // Return raw value (without country code) or empty string
        return typeof value === 'string' ? value.replace(/^\+\d+/, '') : '';
    });

    const phoneInputRef = useRef(null);
    const backgroundColor = bg ? bg : isDarkMode ? '$surface' : '$gray-200';

    const handleInputFocus = () => {
        // No bottom sheet to close anymore
    };

    useEffect(() => {
        if (onChange) {
            const combinedValue = `+${IRAN_COUNTRY.phone}${phoneNumber}`;
            onChange(combinedValue, phoneNumber, IRAN_COUNTRY);
        }
    }, [phoneNumber, onChange]);

    return (
        <YStack space='$4' {...wrapperProps}>
            <XStack width='100%' paddingHorizontal={0} shadowOpacity={0} shadowRadius={0} borderWidth={1} borderColor='$borderColorWithShadow' borderRadius='$5' bg={backgroundColor} direction='ltr'>
                {/* Static Country Code Display - No longer a button */}
                <XStack alignItems='center' space='$2' paddingHorizontal='$3' borderRightWidth={1} borderRightColor='$borderColor' justifyContent='center' width={80} maxWidth={80} direction='ltr'>
                    <Text fontSize={size}>{IRAN_COUNTRY.emoji}</Text>
                    <Text fontSize={size}>+{IRAN_COUNTRY.phone}</Text>
                </XStack>
                
                <Input
                    size={size}
                    ref={phoneInputRef}
                    flex={1}
                    placeholder={t('PhoneInput.enterPhoneNumber')}
                    keyboardType='phone-pad'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    onFocus={handleInputFocus}
                    bg={backgroundColor}
                    color='$textPrimary'
                    textAlign='left'
                    borderRadius={0}
                    borderTopRightRadius='$3'
                    borderBottomRightRadius='$3'
                    overflow='hidden'
                    placeholderTextColor={isDarkMode ? '$gray-700' : '$gray-400'}
                />
            </XStack>
        </YStack>
    );
};

export default PhoneInput;