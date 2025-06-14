import { StyleSheet, Text, View, Image, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';

export default function SignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

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

    const handleLogin = async () => {
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
            const result = await fetch('https://x3wq0k4r-3000.usw3.devtunnels.ms/sign_up_service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const response = await result.json();
            console.log(response)

            if (response.status == 'success') {
                Alert.alert('Éxito', `Bienvenido,`);
            } else {
                Alert.alert('Error', response.status);
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema de conexión con la API');
            console.error(error);
        }
    }
    return (
        <View >
            <Image style={styles.image} source={require('../assets/splash-icon.png')} />
            <Text>Get Started</Text>
            <TextInput placeholder='Firstname' onChangeText={setFirstname} />
            <TextInput placeholder='Lastname' onChangeText={setLastname} />
            <TextInput placeholder='Username' onChangeText={setUsername} />
            <TextInput placeholder='Email' onChangeText={setEmail} />
            <TextInput placeholder='Password' onChangeText={setPassword} />
            <TextInput placeholder='Confirm password' onChangeText={setConfirmPassword} />
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