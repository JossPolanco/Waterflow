import { View, Input, Text, Pressable, Alert, TouchableOpacity, Clipboard  } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import ApiEndpoint from "../utils/endpointAPI";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/context";

export default function LinkWf() {
    const [token, setToken] = useState('------------------------------------')
    const [error, setError] = useState(null);    
    const endpoint = ApiEndpoint();
    const { userId } = useUser();


    const generateToken = async () => {        
        setError(null);

        try {
            const response = await fetch(endpoint + '/waterflow/generate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: userId })
            });

            const result = await response.json()            

            if (result.status == 'success') {
                setToken(result.token);
            } else {
                setError('Ocurrio un error al generar el token, intenta más tarde.')                
            }
        } catch (error) {
            console.log('Error was found: ', error)
            setError('Ocurrio un error al generar el token, intenta más tarde.')
        } finally {
            setIsLoading(false);
        }
    }

    const showConfirmation = () => {
        Alert.alert(
            "¿Estás seguro?",
            "¿Quieres generar un nuevo token?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sí", onPress: generateToken }
            ]
        );
    }

    const copyToClipboard = async () => {
        if(token) {
            try {
                Clipboard.setString(token);                
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                Alert.alert('Error', 'No se pudo copiar el token');
            }         
        }
    };

    const tutorialSteps = [
        {
            number: 1,
            title: "Copie el token generado",
            description: "Toque el token para copiarlo automáticamente.",
            icon: "📋"
        },
        {
            number: 2,
            title: "Encienda su WaterFlow",
            description: "Presione el botón de encendido de su dispositivo.",
            icon: "🔌"
        },
        {
            number: 3,
            title: "Espere 15 segundos",
            description: "Permita que el dispositivo se inicialice completamente.",
            icon: "⏱️"
        },
        {
            number: 4,
            title: "Busque la red WI-FI",
            description: "Conéctese a la red 'Waterflow-Setup.'",
            icon: "📶"
        },
        {
            number: 5,
            title: "Configure la conexión",
            description: "Se abrirá una página donde deberá ingresar la contraseña de su red WI-FI y el token generado.",
            icon: "⚙️"
        },
        {
            number: 6,
            title: "Guarde la configuración",
            description: "Presione 'Continuar' para que el Waterflow guarde los datos. Si hay un error, el dispositivo se reiniciará automáticamente.",
            icon: "💾"
        },
        {
            number: 7,
            title: "Verifique la conexión",
            description: "La página se cerrará si todo está correcto. Regrese a la app con la misma cuenta.",
            icon: "✅"
        },
        {
            number: 8,
            title: "¡Listo!",
            description: "Su Waterflow aparecerá en la página principal. Si no aparece recargue o repita los pasos.",
            icon: "🎉"
        }
    ];

    return (
        <ScrollView className="flex-1 bg-gray-50"
            contentContainerStyle={{
                padding: 16
            }}
            showsVerticalScrollIndicator={false}
        >

            <View className="mb-8">
                <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Configurar Dispositivo
                </Text>
                <Text className="text-gray-600 text-center text-base">
                    Sigue estos pasos para conectar tu WaterFlow
                </Text>
            </View>

            <View className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                <Text className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Generar Token
                </Text>

                <View className="items-center flex flex-col gap-4">
                    <Pressable className="bg-blue-500 w-52 h-12 p-3 rounded-lg active:bg-blue-600" onPress={showConfirmation}>
                        <Text className="text-white font-bold text-center">Generar Token</Text>
                    </Pressable>

                    {!error ? (
                        <TouchableOpacity
                            onPress={copyToClipboard}
                            className="bg-gray-100 border-2 border-dashed border-blue-300 rounded-xl px-4 py-3 min-w-60"
                        >
                            <Text className="text-blue-600 font-bold text-center text-base">
                                {token}
                            </Text>
                            <Text className="text-gray-500 text-xs text-center mt-1">
                                Toca para copiar
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <View className="bg-gray-100 rounded-xl px-4 py-3 min-w-60">
                            <Text className="text-red-400 text-center">
                                {error}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <View className="bg-white rounded-2xl p-6 shadow-sm">
                <Text className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    Tutorial de Configuración
                </Text>

                <View className="space-y-4">
                    {tutorialSteps.map((step, index) => (
                        <View key={index} className="flex-row items-start space-x-4 gap-3">                            
                            <View className="size-8 bg-blue-500 rounded-full items-center justify-center mt-1">
                                <Text className="text-white font-bold text-sm">{step.number}</Text>
                            </View>

                            <View className="flex-1">
                                <View className="flex-row items-center mb-2">
                                    <Text className="text-2xl mr-2">{step.icon}</Text>
                                    <Text className="text-lg font-semibold text-gray-800">
                                        {step.title}
                                    </Text>
                                </View>
                                <Text className="text-gray-600 text-base leading-6">
                                    {step.description}
                                </Text>

                                {index < tutorialSteps.length - 1 && (
                                    <View className="h-0.5 bg-gray-200 w-full mt-4 mb-4" />
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            <View className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
                <View className="flex-row items-center mb-2">
                    <Text className="text-2xl mr-2">💡</Text>
                    <Text className="text-lg font-semibold text-amber-800">
                        Consejos Importantes
                    </Text>
                </View>
                <Text className="text-amber-700 text-sm leading-5">
                    • Asegúrese de tener la contraseña de su red WI-FI a la mano.{'\n'}
                    • Mantenga el dispositivo cerca del router durante la configuración.{'\n'}
                    • Si el proceso falla, espere 30 segundos antes de reintentar.
                </Text>
            </View>
        </ScrollView>
    );
}