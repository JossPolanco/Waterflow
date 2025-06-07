import { StyleSheet, Text, View, Image, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('Me picaste')
        try {
            const response = await fetch('https://x3wq0k4r-3000.usw3.devtunnels.ms/login_service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                Alert.alert('Éxito', `Bienvenido, ${data.user.username}`);
            } else {
                Alert.alert('Error', data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema de conexión con la API');
            console.error(error);
        }
    }

    return (
        <View>
            <Image style={styles.image} source={require('../assets/splash-icon.png')} />
            <Text>Welcome back!</Text>
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