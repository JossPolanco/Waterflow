import { View, Pressable, Switch, Text } from "react-native"
import { useEffect, useState } from "react";
import { TuneSettingsIcon } from "./Icons";


export default function Waterflow({mac = '', waterflowName = '', isConnected = false, isOpen = false}) {
    const [waterIsConnected, waterSetIsConnected] = useState(isConnected);
    const [waterIsOpen, setWaterIsOpen] = useState(isOpen)
    const toggleSwitch = () => setWaterIsOpen(prev => {
        const newValue = !prev;

        let data = {
            'waterflow_mac': mac,
            'activate': newValue    
        }

        sendCommand(data);
        
        return newValue;
    });
    
    const sendCommand = async (data) => {
        // send the order to open the waterflow
        const response = fetch('https://gpmknnnz-3000.usw3.devtunnels.ms/waterflow/send-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }); 

        const result = await response.json()

        console.log(result)

    }

    if(waterIsConnected){
        console.log('ESTA CONECTADO')
    }

    return (
        <View className="gap-2">
            <View className="flex flex-row items-center">
                <Text className="text-3xl font-bold text-start">Llave: {waterflowName}</Text>
                
            </View>
            <View className="bg-white w-full h-60 rounded-3xl px-3 py-1 shadow-xl">
                <View className="flex-row items-center justify-between w-full">
                    <View>
                        <Pressable onPress={() => {
                            console.log('ENTRAR A SETTINGS')
                        }}>
                            {TuneSettingsIcon(30, 'black')}
                        </Pressable>
                    </View>
                    <View>
                        <Text className="text-2xl font-bold">{waterIsConnected ? ' Conectado 🟢': 'Desconectado 🔴'}</Text>
                    </View>
                    <View>
                        <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={waterIsOpen ? '#ffffff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={waterIsOpen}
                        />
                    </View>
                </View>
                <View className="bg-gray-100 flex-1 justify-center items-center">
                    <Text>Here goes something</Text>
                </View>
                <View className="text-center items-center">
                    <Text className="text-1xl text-gray-400 font-bold">Estado de la llave:</Text>
                    <Text className="text-2xl text-black font-bold">{waterIsOpen ? 'Abierto': 'Cerrado'}</Text>
                </View>
            </View>
        </View>
    );
}