import { Text, View, Image, TextInput, Alert, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ApiEndpoint from "../utils/endpointAPI"
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/context';
import { useRouter } from "expo-router"


export default function Login() {
    const endpoint = ApiEndpoint()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const insets = useSafeAreaInsets();
    const { userId, setUserId } = useUser();
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

    useEffect(() => {
        if (userId) {
            router.replace('/tabs/homeRoute');
        }
    }, [userId])

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
                setUserId(data.user.id);                                

            } else {
                Alert.alert('Error', 'Credenciales incorrectas');
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema con el servidor, intenta mas tarde');
            console.error(error);
        }
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            
            <View className="flex-1 justify-center gap-10 bg-blue-200" style={{ paddingTop: insets.top}}>
                <View className="w-full px-10 justify-center items-center pt-10">
                    <View className="justify-center items-center gap-5">
                        <View>
                            <Image className="w-32 h-32" source={require('../assets/logo_without_bg.png')} />
                        </View>
                        <View className="justify-center">
                            <Text className="text-7xl text-white text-center font-bold">Hola!</Text>
                            <Text className="text-2xl text-white font-bold">Bienvenido de nuevo a Waterflow</Text>
                        </View>
                    </View>
                </View>
                <View className="gap-5 px-10 flex-1 rounded-t-[60] pt-12 bg-gray-100">
                    <Text className="text-blue-200 text-4xl font-bold">iniciar sesión</Text>
                    <TextInput className="bg-white rounded-full px-4 h-14" style={{ color: "#1e293b" }} placeholder='Usuario' onChangeText={setUsername} returnKeyType="next" autoCorrect={false} placeholderTextColor="#94a3b8"/>
                    <TextInput className="bg-white rounded-full px-4 h-14" style={{ color: "#1e293b" }} placeholder='Contraseña' onChangeText={setPassword} returnKeyType="done" secureTextEntry={true} autoCorrect={false} placeholderTextColor="#94a3b8"/>
                    <Pressable className="bg-blue-500 rounded-2xl py-4 items-center mt-2 active:bg-blue-700" onPress={handleLogin}>
                        <Text className="text-white text-base font-semibold text-center">iniciar sesión</Text>
                    </Pressable>
                    <View className="flex-row justify-center gap-2">
                        <Text className="text-gray-500">¿No tienes una cuenta?</Text>
                        <Pressable onPress={() => router.push('/auth/signUpRoute')}>
                            <Text className="text-blue-500 font-semibold">Crear cuenta</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}