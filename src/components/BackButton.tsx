import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import DirectionalIcon from './DirectionalIcon';
import HeaderButton from './HeaderButton';

const BackButton = ({ ...props }) => {
    const navigation = useNavigation();
    const { onPress } = props;

    const handlePress = function () {
        if (typeof onPress === 'function') {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return <HeaderButton onPress={handlePress} icon={faArrowLeft} iconComponent={DirectionalIcon} {...props} />;
};

export default BackButton;
