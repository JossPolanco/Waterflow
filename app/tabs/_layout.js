import { Tabs } from "expo-router";
import { HomeIcon, DashboardIcon, NotificationsIcon, SettingsIcon, LogoUser, CrossIcon } from "../../components/Icons";
import { View } from "react-native";

export default function NavigationLayout() {
  return (
    <Tabs
      screenOptions={{
        // Estilos del tab bar
        tabBarStyle: {
          backgroundColor: '#1795D4',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',

        // Estilos del header
        headerStyle: {
          backgroundColor: '#1795D4',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
        },

        // Ícono al final del header
        headerRight: () => (
          <View style={{ marginRight: 15 }}>
            <LogoUser size={30} color="white"/>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="homeRoute"
        options={{
          title: 'Hogar',
          tabBarIcon: ({ color, size }) => HomeIcon(size, color),
        }}
      />
      <Tabs.Screen
        name="dashboardRoute"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => DashboardIcon(size, color),
        }}
      />
      <Tabs.Screen
        name="notificationsRoute"
        options={{
          title: 'Notificaciones',
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <CrossIcon size={30} color="white" />
            </View>
          ),
          tabBarIcon: ({ color, size }) => NotificationsIcon(size, color),
        }}
      />
    </Tabs>
  );
}
