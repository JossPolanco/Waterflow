import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';
import { colorScheme } from 'nativewind';

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

export const TempIcon = ({size = 24, color = 'black'}) => (
    <FontAwesome6 name="temperature-low" size={size} color={color}/>
);

export const LogoUser = ({size = 24, color = 'black'}) => (
    <FontAwesome name="user-circle" size={size} color={color}/>
);

export const TimerIcon = ({size = 24, color = 'black'}) => (
    <MaterialIcons name="access-time" size={size} color={color}/>
);

export const ClockIcon = ({size = 24, color = 'black'}) => (
    <MaterialCommunityIcons name="timer-sand-empty" size={size} color={color}/>
);

export const TuneSettingsIcon = ({size = 24, color = 'black'}) => (
    <MaterialIcons name="tune" size={size} color={color} />
);

export const CrossIcon = ({size = 24, color = 'black'}) => (
    <Entypo name="cross" size={size} color={color} />
);

export const AlertIcon = ({size = 24, color = 'black'}) => (
    <Foundation name="alert" size={size} color={color} />
);

export const TrashIcon = ({size = 24, color = 'black'}) => (
    <Feather name="trash-2" size={size} color={color} />
);

export const CheckIcon = ({size = 24, color = 'black'}) => (
    <Entypo name="check" size={size} color={color} />
);

export const PencilIcon = ({size = 24, color = 'black'}) => (
    <FontAwesome6 name="pencil" size={size} color={color} />
);