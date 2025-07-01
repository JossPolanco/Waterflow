import { Tabs } from "expo-router";
import { HomeIcon, DashboardIcon, NotificationsIcon, SettingsIcon } from "../../components/Icons";


export default function NavigationLayout(){
    return (
        <Tabs>
            <Tabs.Screen name='homeRoute' options={{
                title: 'Home',
                tabBarIcon: ({color, size}) => HomeIcon(size, color)
            }}/>
            <Tabs.Screen name='dashboardRoute' options={{
                title: 'Dashboard',
                tabBarIcon: ({color, size}) => DashboardIcon(size, color)
            }}/>
            <Tabs.Screen name='notificationsRoute' options={{
                title: 'Notifications',
                tabBarIcon: ({color, size}) => NotificationsIcon(size, color)
            }}/>
            <Tabs.Screen name='settingsRoute' options={{
                title: 'Settings',
                tabBarIcon: ({color, size}) => SettingsIcon(size, color)
            }}/>
        </Tabs>
    )
}