import { Tabs } from "expo-router";
import { HomeIcon } from "../../components/Icons";


export default function NavigationLayout(){
    return (
        <Tabs>
            <Tabs.Screen name='home' options={{
                title: 'Home',
                tabBarIcon: ({color, size}) => HomeIcon(size, color)
            }}/>
        </Tabs>
    )
}