import { Tabs } from "expo-router";
import { HomeIcon, DashboardIcon, NotificationsIcon, SettingsIcon, LogoUser, CrossIcon } from "../../components/Icons";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NavigationLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        // Estilos del header
        headerStyle: {
          backgroundColor: '#1795D4',          
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="homeRoute"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => HomeIcon(size, color),
        }}
      />      
      <Tabs.Screen
        name="notificationsRoute"
        options={{
          title: 'Notificaciones',          
          tabBarIcon: ({ color, size }) => NotificationsIcon(size, color),
        }}
      />
    </Tabs>
  );
}
