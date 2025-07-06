import { View, Text, Pressable, Switch } from "react-native"
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Waterflow from "./Waterflow";

export default function Home(){
    const { user_id } = useLocalSearchParams(); 
    const [ updateFetch, setUpdateFetch ] = useState(false);    
    const [ waterflowDevices, setWaterflowDevices ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);    

    useEffect(() => {
        async function fetchWaterflows() {
            setIsLoading(true); 
            try {
                const response = await fetch(`https://gpmknnnz-3000.usw3.devtunnels.ms/waterflow/info-waterflow/${user_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },                    
                });
    
                const data = await response.json();
                console.log('Respuesta:', data.waterflows);

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
                <View className="w-full">
                    {waterflowDevices.map((device, index) => (
                        <View key={device.mac + index}>
                            <Waterflow 
                                mac={device.MAC}
                                waterflowName={'Test' || `Dispositivo ${index + 1}`}
                                isConnected={true}
                                isOpen={device.active}
                            />
                        </View>
                    ))}
                </View>
            )}

            {/* <View>
                <Text className='text-red-500'>Home screen</Text>
                <Pressable onPress={() => setUpdateFetch(!updateFetch)}>
                    <Text className="text-blue-500 font-semibold">Close or open</Text>
                </Pressable>
            </View> */}            
        </View>
    );
}