import FontAwesome from '@expo/vector-icons/FontAwesome';

export const LogoIcon = (size) => (
    <Image name="waterflow_logo" size={size} source={require('../assets/splash-icon.png')} />
);

export const HomeIcon = (size, color) => (
    <FontAwesome name="home" size={size} color={color} />
);

export const TachometerIcon = (size, color) => (
    <FontAwesome name="tachometer" size={size} color={color} />
);