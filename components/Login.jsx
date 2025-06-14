import { StyleSheet, Text, View, Image, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // validate that all the inputs are filled
    const validateFileds = () => {
        if(!username || !password) {
            Alert.alert('Error', 'Todos los campos son obligatorios')
        }
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
                    'username': username.trim(),
                    'password': password.trim()
                }),
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                Alert.alert('Éxito', `Bienvenido, ${data.user.username}`);
            } else {
                Alert.alert('Error', 'Credenciales incorrectas');
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema con el servidor, intenta mas tarde');
            console.error(error);
        }
    }

    return (
        <View className="flex flex-col px-5 py-2 justify-center self-center gap-4">
            <Image className="size-72" source={require('../assets/splash-icon.png')} />
            <Text className="text-lg font-bold">Welcome back!</Text>
            <TextInput placeholder='Username' onChangeText={setUsername} />
            <TextInput placeholder='Password' onChangeText={setPassword} />
            <Button title='Sign in' onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
    }
})