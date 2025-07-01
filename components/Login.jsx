import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        console.log('Me picaste')
        try {
            const response = await fetch('https://x3wq0k4r-3000.usw3.devtunnels.ms/login_service', {
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
            console.log(data)

            if (response.ok) {
                router.replace('/tabs/homeRoute');                

            } else {
                Alert.alert('Error', 'Credenciales incorrectas');
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema con el servidor, intenta mas tarde');
            console.error(error);
        }
    }

    return (
        <View className="flex flex-col justify-center gap-10 bg-gray-100">
            <View className="bg-blue-200 w-full px-10 py-6">
                <View className="justify-center items-center gap-5">
                    <View>
                        <Image className="w-32 h-32" source={require('../assets/logo_without_bg.png')} />
                    </View>
                    <View className="justify-start">
                        <Text className="text-7xl text-white font-bold">Hello!</Text>
                        <Text className="text-2xl text-white font-bold">Welcome to Waterflow</Text>
                    </View>
                </View>
            </View>
            <View className="gap-5 px-10 rounded-t-sm">
                <Text className="text-2xl font-bold">Login</Text>
                <TextInput className="bg-white rounded-full px-4" placeholder='Username' onChangeText={setUsername} />
                <TextInput className="bg-white rounded-full px-4" placeholder='Password' onChangeText={setPassword} />
                <Pressable className="bg-blue-500 rounded-full py-3 items-center mt-2 active:bg-blue-700" onPress={handleLogin}>
                    <Text className="text-white text-base font-semibold">Login</Text>
                </Pressable>
            </View>
        </View>
    );
}