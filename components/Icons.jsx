import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export const LogoIcon = (size) => (
    <Image name="waterflow_logo" size={size} source={require('../assets/splash-icon.png')} />
);

export const HomeIcon = (size, color = 'black') => (
    <FontAwesome name="home" size={size} color={color} />
);

export const DashboardIcon = (size, color = 'black') => (
    <FontAwesome name="tachometer" size={size} color={color} />
);

export const SettingsIcon = (size, color = 'black') => (
    <Ionicons name="settings" size={size} color={color} />
);

export const NotificationsIcon = (size, color = 'black') => (
    <Ionicons name="notifications" size={size} color={color} />
);

export const UserIcon = (size, color = 'black') => (
    <EvilIcons name="user" size={size} color={color} />
);

export const ReloadIcon = (size, color = 'black') => {
    <SimpleLineIcons name="reload" size={size} color={color} />
}