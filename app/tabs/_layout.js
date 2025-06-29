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
                tabBarIcon: ({color, size}) => NotificationsIcon()
            }}/>
            <Tabs.Screen name='settingsRoute' options={{
                title: 'Settings',
                tabBarIcon: ({color, size}) => HomeISettingsIconcon()
            }}/>
        </Tabs>
    )
}