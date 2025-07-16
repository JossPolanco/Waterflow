import { View, Pressable, Switch, Text } from "react-native"
import { useEffect, useState } from "react";
import { TuneSettingsIcon, DashboardIcon, LockIcon, WaterIcon, LowTemperatureIcon, HighTemperatureIcon, MidTemperatureIcon} from "./Icons";
import { Redirect } from 'expo-router';
import { useRouter } from "expo-router"
import ApiEndpoint from "../utils/endpointAPI"

export default function Waterflow({mac = '', waterflowName = '', isConnected = false, isOpen = false, temp = 'N/A'}) {
    const endpoint = ApiEndpoint();
    const [waterIsConnected, waterSetIsConnected] = useState(isConnected);
    const [waterIsOpen, setWaterIsOpen] = useState(isOpen)
    const [currentTemp, setCurrentTemp] = useState(temp)
    const router = useRouter()

    const toggleIsOpen = () => setWaterIsOpen(prev => {
        const newValue = !prev;

        let data = {
            'waterflow_mac': mac,
            'activate': newValue    
        }

        sendCommand(data);

        return newValue;
    });
    
    async function sendCommand(data) {          
        // send the order to open the waterflow
        const response = await fetch(endpoint + '/waterflow/send-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }); 
        
        const result = await response.json()        

        if (result.status == 'success') {                
            console.log('✅ Everithing was right');
        } else {                
            console.log('❌ Something went wrong with server: ', result.message);
            alert(`Error: ${result.message}`);
        }             
    }

    // Establishes the status based on the current temperature.
    const getTempStatus = () => {
        if (currentTemp === 'N/A') return 'unavailable';
        const tempNum = currentTemp;
        if (tempNum <= 10) return 'cold';
        if (tempNum <= 25) return 'moderate';
        return 'hot';
    };

    const tempStatus = getTempStatus();

    return (
        <View className="w-full">
            <View className="mb-3 px-1">
                <Text className="text-2xl font-bold text-gray-800 mb-1">Llave: {waterflowName}</Text>
            </View>

            <View className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <View className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <View className="flex-row items-center justify-between">
                        <Pressable 
                            onPress={() => {
                                router.push({pathname: '/services/settingsRoute', params: { waterflow_mac: mac }});                
                            }}
                            className="bg-white p-3 rounded-full shadow-sm active:bg-gray-50"
                        >
                            {TuneSettingsIcon(24)}
                        </Pressable>

                        <View className="flex-1 mx-4">
                            <Text className="text-center text-lg font-semibold text-gray-700">
                                Control de Flujo
                            </Text>
                        </View>

                        <View className="bg-white p-2 rounded-full shadow-sm">
                            <Switch
                                trackColor={{false: '#D1D5DB', true: '#93C5FD'}}
                                thumbColor={waterIsOpen ? '#3B82F6' : '#ffffff'}
                                ios_backgroundColor="#D1D5DB"
                                onValueChange={toggleIsOpen}
                                value={waterIsOpen}
                            />
                        </View>
                    </View>
                </View>

                <View className="flex flex-row justify-around items-center px-5 py-7">
                    {/* Temp View */}
                    <View className="items-center justify-center">
                        <View className={`w-24 h-24 rounded-full items-center justify-center mb-3 ${
                            tempStatus === 'cold' ? 'bg-blue-100' : 
                            tempStatus === 'moderate' ? 'bg-orange-100' :
                            tempStatus === 'hot' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                            <View className={`w-16 h-16 rounded-full items-center justify-center ${
                                tempStatus === 'cold' ? 'bg-blue-500' : 
                                tempStatus === 'moderate' ? 'bg-orange-500' :
                                tempStatus === 'hot' ? 'bg-red-500' : 'bg-gray-400'
                            }`}>
                                {tempStatus === 'cold' ? LowTemperatureIcon(20, '#ffffff') : 
                                tempStatus === 'moderate' ? MidTemperatureIcon(20, '#ffffff') :
                                tempStatus === 'hot' ? HighTemperatureIcon(20, '#ffffff') : 
                                <Text className="text-white text-lg font-bold">?</Text>}
                            </View>
                        </View>

                        <Text className={`text-lg font-bold mb-1 ${
                            tempStatus === 'cold' ? 'text-blue-600' : 
                            tempStatus === 'hot' ? 'text-red-600' : 
                            tempStatus === 'moderate' ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                            {currentTemp !== 'N/A' ? `${currentTemp}°C` : 'N/A'}
                        </Text>
                        
                        <Text className="text-gray-500 text-center text-xs leading-tight">
                            Temperatura{'\n'}Exterior
                        </Text>
                    </View>

                    {/* WaterFlow state View */}
                    <View className="items-center justify-center">
                        <View className={`w-24 h-24 rounded-full items-center justify-center mb-3 ${
                            waterIsOpen ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                            <View className={`w-16 h-16 rounded-full items-center justify-center ${
                                waterIsOpen ? 'bg-blue-500' : 'bg-gray-400'
                            }`}>
                                <Text className="text-white text-xl font-bold">
                                    {waterIsOpen ? WaterIcon(32) : LockIcon(24)}
                                </Text>
                            </View>
                        </View>

                        <Text className={`text-xl font-bold mb-1 ${
                            waterIsOpen ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                            {waterIsOpen ? 'ABIERTO' : 'CERRADO'}
                        </Text>
                        
                        <Text className="text-gray-500 text-center text-sm">
                            {waterIsOpen ? 'Flujo activo' : 'Flujo detenido'}
                        </Text>
                    </View>
                </View>

                <View className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                            <Text className="text-sm text-gray-500 mb-1">Estado del Sistema</Text>
                            <View className="flex-row items-center">
                                <View className={`w-2 h-2 rounded-full mr-2 ${
                                    waterIsConnected ? 'bg-green-500' : 'bg-red-500'
                                }`} />
                                <Text className={`text-sm font-medium ${
                                    waterIsConnected ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {waterIsConnected ? 'Online' : 'Offline'}
                                </Text>
                            </View>
                        </View>

                        <Pressable 
                            onPress={() => {
                                router.push({pathname: '/services/dashboardRoute', params: { waterflow_mac: mac }});                
                            }}
                            className="bg-white p-3 rounded-full shadow-sm active:bg-gray-50"
                        >
                            {DashboardIcon(24)}
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}