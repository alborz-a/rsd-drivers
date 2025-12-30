import React, { useEffect, useRef, useState } from 'react';
import { Input, YStack } from 'tamagui';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPhoneForDisplay } from '../utils/format';
import useAppTheme from '../hooks/use-app-theme';

const IRAN_COUNTRY = {
    code: 'IR',
    phone: '98',
    emoji: '🇮🇷',
};

const PhoneInput = ({ value, onChange, bg, width = '100%', size = '$5', wrapperProps = {} }) => {
    const { t } = useLanguage();
    const { isDarkMode } = useAppTheme();

    // Initialize phone number state
    const [phoneNumber, setPhoneNumber] = useState(() => value?.replace(/^\+98/, '') || '');

    const phoneInputRef = useRef(null);
    const backgroundColor = bg ? bg : isDarkMode ? '$surface' : '$gray-200';

    const handleInputFocus = () => {
        // No bottom sheet to close anymore
    };

    const handlePhoneNumberChange = (text) => {
        // remove formatting for state update
        const rawNumber = text.replace(/\u202A|\u202C/g, '').replace(/^0/, '');
        setPhoneNumber(rawNumber);
    };

    useEffect(() => {
        if (onChange) {
            const combinedValue = `+${IRAN_COUNTRY.phone}${phoneNumber}`;
            onChange(combinedValue, phoneNumber, IRAN_COUNTRY);
        }
    }, [phoneNumber, onChange]);

    return (
        <YStack space='$4' {...wrapperProps}>
            <Input
                size={size}
                ref={phoneInputRef}
                placeholder={t('PhoneInput.enterPhoneNumber')}
                keyboardType='phone-pad'
                value={phoneNumber ? formatPhoneForDisplay(`+98${phoneNumber}`) : ''}
                onChangeText={handlePhoneNumberChange}
                onFocus={handleInputFocus}
                bg={backgroundColor}
                color='$textPrimary'
                textAlign='center'
                borderRadius='$5'
                borderWidth={1}
                borderColor='$borderColorWithShadow'
                overflow='hidden'
                placeholderTextColor={isDarkMode ? '$gray-700' : '$gray-400'}
                width={width}
            />
        </YStack>
    );
};

export default PhoneInput;
