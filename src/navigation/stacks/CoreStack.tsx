import BootScreen from '../../screens/BootScreen';
import TestScreen from '../../screens/TestScreen';
import LocationPermissionScreen from '../../screens/LocationPermissionScreen';

import { getTheme } from '../../utils';
import { Text } from 'tamagui';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import HeaderButton from '../../components/HeaderButton';
import { useLanguage } from '../../contexts/LanguageContext';

export const Boot = {
    screen: BootScreen,
    options: {
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
    },
};

export const LocationPermission = {
    screen: LocationPermissionScreen,
    options: {
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
    },
};

const CoreStack = {
    Boot,
    Test,
    LocationPermission,
};

export default CoreStack;