import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router"
import ApiEndpoint from "../utils/endpointAPI"

export default function SignUp() {
    const endpoint = ApiEndpoint();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    // hook for the routing
    const router = useRouter()

    const validateFields = () => {
        // validate that all the inputs are filled
        if (!firstname || !lastname || !username || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return false;
        }
        
        if (password.length < 4) {
            Alert.alert('Error', 'La contraseña debe ser minimo de 4 caracteres')
            return false;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return false;
        }
        return true;
    }

    const handleSignUp = async () => {
        // if the fields have an error, return
        if(!validateFields()) return;

        let data = {
            'firstname': firstname.trim(),
            'lastname': lastname.trim(),
            'username': username.trim(),
            'password': password.trim(),
            'confirm-password': confirmPassword.trim(),
            'email': email.trim()
        }

        try {
            const result = await fetch(endpoint + '/sign_up_service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data),
            });

            const response = await result.json();

            if (response.status == 'success') {
                Alert.alert('Éxito', `Bienvenido,`);
                router.back()
            } else {
                Alert.alert('Error', response.status);
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema de conexión con la API');
            console.error(error);
        }
    }
    return (
        <View className="flex-1 justify-center bg-blue-200 gap-5">
            <View className="justify-center items-center pt-10 gap-2">
                <Image className="size-32" source={require('../assets/logo_without_bg.png')} />
                <Text className="text-3xl text-white font-bold">Get Started</Text>
            </View>
            <View className="bg-gray-100 flex-1 rounded-t-[60] px-10 gap-5">
                <View className="flex-row justify-start pt-6">                    
                    <Pressable onPress={() => router.back()}>
                        <Text className="text-blue-300 font-semibold">← Back to login</Text>
                    </Pressable>
                </View>
                <View className="gap-3">
                    <Text className="text-blue-200 text-4xl font-bold">Sign Up</Text>
                    <View className="gap-5">
                        <TextInput className="bg-white rounded-full px-4 h-14" placeholder='Firstname' onChangeText={setFirstname} />
                        <TextInput className="bg-white rounded-full px-4 h-14" placeholder='Lastname' onChangeText={setLastname} />
                        <TextInput className="bg-white rounded-full px-4 h-14" placeholder='Username' onChangeText={setUsername} />
                        <TextInput className="bg-white rounded-full px-4 h-14" placeholder='Email' onChangeText={setEmail} />
                        <TextInput className="bg-white rounded-full px-4 h-14" placeholder='Password' onChangeText={setPassword} />
                        <TextInput className="bg-white rounded-full px-4 h-14" placeholder='Confirm password' onChangeText={setConfirmPassword} />
                        <Pressable className="bg-blue-500 rounded-2xl py-4 items-center mt-2 active:bg-blue-700" onPress={handleSignUp}>
                            <Text className="text-white text-base font-semibold text-center">Login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}