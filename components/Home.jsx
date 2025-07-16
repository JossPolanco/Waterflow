import { View, Text, Pressable, Switch, ScrollView} from "react-native"
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import Waterflow from "./Waterflow";
import ApiEndpoint from "../utils/endpointAPI"
import { useFocusEffect } from '@react-navigation/native';


export default function Home(){
    const endpoint = ApiEndpoint();
    const { user_id } = useLocalSearchParams();     
    const [ waterflowDevices, setWaterflowDevices ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);    

    useFocusEffect(
        React.useCallback(() => {
            fetchWaterflows();
        }, [])
    );

    async function fetchWaterflows() {
        setIsLoading(true); 
        try {
            const response = await fetch(`${endpoint}/waterflow/info-waterflow/${user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },                    
            });

            const data = await response.json();
            console.log('Respuesta:', data);
            setWaterflowDevices(data.waterflows);
        } catch (error) {
            console.log('Error al obtener dispositivos:', error);
            setWaterflowDevices([]);
        } finally {
            setIsLoading(false); 
        }
    }

    return (
        <ScrollView 
            className="flex-1 bg-gray-100 pt-10 px-8"
            showsVerticalScrollIndicator={false}
        >
            {/* shows this while is loading all the devices */}
            {isLoading && (
                <View className="mt-5 items-center">
                    <Text className="text-gray-500">Cargando dispositivos...</Text>
                </View>
            )}
            
            {/* Draws each waterflow device of the user */}
            {!isLoading && waterflowDevices.length > 0 && (
                <View className="w-full gap-5">
                    {waterflowDevices.map((device, index) => (
                        <View key={index}>
                            <Waterflow 
                                mac={device.MAC}
                                waterflowName={device.name}
                                isConnected={device.active}
                                isOpen={device.active}
                                temp={device.currentTemp}
                            />
                        </View>
                    ))}
                </View>
            )}         
        </ScrollView>
    );
}