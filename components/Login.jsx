import { Text, View, Image, TextInput, Alert, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from "expo-router"
import ApiEndpoint from "../utils/endpointAPI"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Login() {
    const endpoint = ApiEndpoint()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const insets = useSafeAreaInsets();
    // hook for the routing
    const router = useRouter();
    // validate that all the inputs are filled
    const validateFileds = () => {
        if(!username || !password) {
            Alert.alert('Error', 'Todos los campos son obligatorios')
            return false;
        }
        return true
    }

    const handleLogin = async () => {
        if(!validateFileds()) return;
        
        try {
            const response = await fetch(endpoint + '/login_service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password.trim()
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.replace({pathname: '/tabs/homeRoute', params: { user_id: data.user.id }});                

            } else {
                Alert.alert('Error', 'Credenciales incorrectas');
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema con el servidor, intenta mas tarde');
            console.error(error);
        }
    }

    return (
        <View className="flex-1 justify-center gap-10 bg-blue-200" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <View className="w-full px-10 justify-center items-center pt-10">
                <View className="justify-center items-center gap-5">
                    <View>
                        <Image className="w-32 h-32" source={require('../assets/logo_without_bg.png')} />
                    </View>
                    <View className="justify-start">
                        <Text className="text-7xl text-white font-bold">Hello!</Text>
                        <Text className="text-2xl text-white font-bold">Welcome back to Waterflow</Text>
                    </View>
                </View>
            </View>
            <View className="gap-5 px-10 flex-1 rounded-t-[60] pt-16 bg-gray-100">
                <Text className="text-blue-200 text-4xl font-bold">Login</Text>
                <TextInput className="bg-white rounded-full px-4 h-14" placeholder='Username' onChangeText={setUsername} />
                <TextInput className="bg-white rounded-full px-4 h-14" placeholder='Password' onChangeText={setPassword} />
                <Pressable className="bg-blue-500 rounded-2xl py-4 items-center mt-2 active:bg-blue-700" onPress={handleLogin}>
                    <Text className="text-white text-base font-semibold text-center">Login</Text>
                </Pressable>
                <View className="flex-row justify-center">
                    <Text className="text-gray-500">Don't have an account? </Text>
                    <Pressable onPress={() => router.push('/auth/signUpRoute')}>
                        <Text className="text-blue-500 font-semibold">Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}