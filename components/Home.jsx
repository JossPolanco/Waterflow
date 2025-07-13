import { View, Text, Pressable, Switch } from "react-native"
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Waterflow from "./Waterflow";
import ApiEndpoint from "../utils/endpointAPI"


export default function Home(){
    const endpoint = ApiEndpoint();
    const { user_id } = useLocalSearchParams(); 
    const [ updateFetch, setUpdateFetch ] = useState(false);    
    const [ waterflowDevices, setWaterflowDevices ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);    

    useEffect(() => {
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
        fetchWaterflows()            
    }, [updateFetch])

    return (
        <View className="justify-center items-center mt-6 px-10 gap-4 bg-gray-100">
            {/* shows this while is loading all the devices */}
            {isLoading && (
                <View className="mt-5">
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
                                isConnected={true}
                                isOpen={device.active}
                            />
                        </View>
                    ))}
                </View>
            )}         
        </View>
    );
}