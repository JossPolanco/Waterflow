import { Stack } from "expo-router";

export default function ServicesLayout() {
    return (
        <Stack
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#1795D4',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                },
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#FFFFFF',

                headerStyle: {
                    backgroundColor: '#1795D4',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 27,
                },                
            }}
        />
    )
}