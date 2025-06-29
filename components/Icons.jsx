import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export const LogoIcon = (size) => (
    <Image name="waterflow_logo" size={size} source={require('../assets/splash-icon.png')} />
);

export const HomeIcon = (size, color) => (
    <FontAwesome name="home" size={size} color={color} />
);

export const DashboardIcon = (size, color) => (
    <FontAwesome name="tachometer" size={size} color={color} />
);

export const SettingsIcon = () => (
    <Ionicons name="settings" size={24} color="black" />
);

export const NotificationsIcon = () => (
    <Ionicons name="notifications" size={24} color="black" />
);

export const UserIcon = () => (
    <EvilIcons name="user" size={24} color="black" />
);