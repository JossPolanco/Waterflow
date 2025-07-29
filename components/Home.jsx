import { View, Text, ScrollView, ActivityIndicator} from "react-native"
import { RefreshControl } from "react-native-gesture-handler";
import { useFocusEffect } from '@react-navigation/native';
import ApiEndpoint from "../utils/endpointAPI"
import { useUser } from "../hooks/context";
import React, { useState } from "react";
import Waterflow from "./Waterflow";

export default function Home(){
    const endpoint = ApiEndpoint();    
    const { userId } = useUser();
    const [ waterflowDevices, setWaterflowDevices ] = useState([]);        
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);    

    useFocusEffect(
        React.useCallback(() => {
            fetchWaterflows();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchWaterflows();
        setRefreshing(false);
    }

    async function fetchWaterflows() {
        setLoading(true);
        setError(null);    
        try {
            const response = await fetch(`${endpoint}/waterflow/info-waterflow/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },                    
            });

            const data = await response.json();

            if(data.status == 'success'){
                setWaterflowDevices(data.waterflows);
            } else {
                setWaterflowDevices([]);
            }
        } catch (error) {
            console.log('Error al obtener dispositivos:', error);
            setError('Error al cargar los datos')
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="mt-4 text-gray-600 text-lg">Cargando inicio...</Text>
            </View>
        );
    }
    
    if(error){
        return (
            <View className="flex-1 justify-center items-center">
                <View className="mx-4 bg-red-100 border border-red-400 rounded-lg p-4">
                    <Text className="text-red-700">{error}</Text>
                </View>
            </View>
        )
    }

    if(waterflowDevices.length == 0){
        return (
            <View className="flex-1 justify-center items-center">
                <View>
                    <Text className="text-blue-700">Actualmente no cuentas con dispositivos Waterflow.</Text>
                </View>
                <Text className="text-blue-700">Presiona + para agregar uno nuevo.</Text>
            </View>
        )
    }

    return (        
        <ScrollView 
            className="flex-1 bg-gray-50 "
            contentContainerStyle={{ 
                padding: 32                
            }}         
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            
            {!loading && waterflowDevices.length > 0 && (
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