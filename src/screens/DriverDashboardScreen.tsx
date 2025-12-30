import { ActionSheetIOS, I18nManager } from 'react-native'; // Actually just I18nManager
import { Text, XStack, YStack, useTheme } from 'tamagui';
import OdometerNumber from '../components/OdometerNumber';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import { useOrderManager } from '../contexts/OrderManagerContext';
import useAppTheme from '../hooks/use-app-theme';
import { get } from '../utils';

const WidgetContainer = ({ px = '$4', py = '$4', children, ...props }) => {
    const { isDarkMode } = useAppTheme();
    return (
        <YStack borderRadius='$6' bg='$surface' px={px} py={py} borderWidth={1} borderColor={isDarkMode ? '$transparent' : '$gray-300'} {...props}>
            {children}
        </YStack>
    );
};

const DriverDashboardScreen = () => {
    const theme = useTheme();
    const { isTracking, location } = useLocation();
    const { allActiveOrders } = useOrderManager();
    const { t } = useLanguage();

    return (
        <YStack flex={1} bg='$background'>
            <YStack flex={1} padding='$4' gap='$4'>
                <YStack space='$4'>
                    <WidgetContainer>
                        <XStack flexDirection={I18nManager.isRTL ? 'row-reverse' : 'row'}>
                            <YStack flex={1}>
                                <Text color='$textPrimary'>{t('DriverDashboardScreen.tracking')}</Text>
                            </YStack>
                            <YStack flex={1} alignItems='flex-end'>
                                <Text color={isTracking ? '$successBorder' : '$textSecondary'}>{isTracking ? t('common.yes') : t('common.no')}</Text>
                            </YStack>
                        </XStack>
                    </WidgetContainer>
                </YStack>
                <XStack gap='$4'>
                    <WidgetContainer flex={1} alignItems='center' justifyContent='center'>
                        <YStack>
                            <Text color='$textPrimary' fontWeight='bold' mb='$2'>
                                {t('DriverDashboardScreen.activeOrders')}
                            </Text>
                        </YStack>
                        <YStack>
                            <OdometerNumber value={allActiveOrders.length} digitStyle={{ color: theme['$textSecondary'].val }} digitHeight={36} />
                        </YStack>
                    </WidgetContainer>
                    <WidgetContainer flex={1} alignItems='center' justifyContent='center'>
                        <YStack>
                            <Text color='$textPrimary' fontWeight='bold' mb='$2'>
                                {t('DriverDashboardScreen.speed')}
                            </Text>
                        </YStack>
                        <YStack>
                            <OdometerNumber value={get(location, 'coords.speed', 0)} digitStyle={{ color: theme['$textSecondary'].val }} digitHeight={36} />
                        </YStack>
                    </WidgetContainer>
                </XStack>
            </YStack>
        </YStack>
    );
};

export default DriverDashboardScreen;
