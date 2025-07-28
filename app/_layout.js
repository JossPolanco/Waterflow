import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from '../hooks/context';
import { Stack } from "expo-router";
import "../global.css"

export default function IndexLayout() {
    return (
        <UserProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack
                    screenOptions={{headerShown: false,}}
                />
            </GestureHandlerRootView>
        </UserProvider>
    )
}