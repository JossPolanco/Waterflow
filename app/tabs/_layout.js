import { HomeIcon, NotificationsIcon, AddIcon } from "../../components/Icons";
import { Tabs } from "expo-router";

export default function NavigationLayout() {  
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
      <Tabs.Screen 
        name="linkWfRoute"
        options={{
          title: "Añadir",
          tabBarIcon: ({ color, size }) => AddIcon(size, color)
        }}
      />
    </Tabs>
  );
}
