import { Text, View, Image, TextInput, Alert, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ApiEndpoint from "../utils/endpointAPI"
import { useRouter } from "expo-router"
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignUp() {
    const endpoint = ApiEndpoint();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const insets = useSafeAreaInsets();

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
        if (!validateFields()) return;

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

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <ScrollView style={{ paddingBottom: insets.bottom}}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View className="flex-1 justify-center bg-blue-200 gap-5">
                    <View className="justify-center items-center pt-10 gap-2">
                        <Image className="size-32" source={require('../assets/logo_without_bg.png')} />
                        <Text className="text-3xl text-white font-bold">Crea tu cuenta</Text>
                    </View>
                    <View className="bg-gray-100 flex-1 rounded-t-[60] px-10 gap-5">
                        <View className="flex-row justify-start pt-6">
                            <Pressable onPress={() => router.back()}>
                                <Text className="text-blue-300 font-semibold">← Volver</Text>
                            </Pressable>
                        </View>
                        <View className="gap-3">
                            <Text className="text-blue-200 text-4xl font-bold mb-2">Crear cuenta</Text>
                            <View className="gap-5">
                                <TextInput className="bg-white rounded-full px-4 h-14" style={{ color: "#1e293b" }} placeholder='Nombre' onChangeText={setFirstname} returnKeyType="next" autoCorrect={false} placeholderTextColor="#94a3b8"/>
                                <TextInput className="bg-white rounded-full px-4 h-14" style={{ color: "#1e293b" }} placeholder='Apellido' onChangeText={setLastname} returnKeyType="next" autoCorrect={false} placeholderTextColor="#94a3b8"/>
                                <TextInput className="bg-white rounded-full px-4 h-14" style={{ color: "#1e293b" }} placeholder='Email' onChangeText={setEmail} returnKeyType="next" autoCorrect={false} placeholderTextColor="#94a3b8"/>
                                <TextInput className="bg-white rounded-full px-4 h-14" style={{ color: "#1e293b" }} placeholder='Usuario' onChangeText={setUsername} returnKeyType="next" autoCorrect={false} placeholderTextColor="#94a3b8"/>
                                <TextInput className="bg-white rounded-full px-4 h-14" style={{ color: "#1e293b" }} placeholder='Contraseña' onChangeText={setPassword} returnKeyType="next" secureTextEntry={true} autoCorrect={false} placeholderTextColor="#94a3b8"/>
                                <TextInput className="bg-white rounded-full px-4 h-14" style={{ color: "#1e293b" }} placeholder='Confirmar contraseña' onChangeText={setConfirmPassword} returnKeyType="done" secureTextEntry={true} autoCorrect={false} placeholderTextColor="#94a3b8"/>
                                <Pressable className="bg-blue-500 rounded-2xl py-4 items-center mt-2 active:bg-blue-700" onPress={handleSignUp}>
                                    <Text className="text-white text-base font-semibold text-center">Crear cuenta</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View className="mt-28">
                            <Text className="text-gray-100">this fix some screen issues c:</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}