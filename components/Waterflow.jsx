import { View, Pressable, Switch, Text } from "react-native"
import { useEffect, useState } from "react";
import { TuneSettingsIcon } from "./Icons";


export default function Waterflow({numberKey = 1, isConnected = false, waterState}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View className="gap-2">
            <Text className="text-2xl font-bold text-start">Llave 1: Conectado 🟢</Text>
            <View className="bg-white w-full h-60 rounded-3xl px-3 py-1 shadow-xl">
                <View className="flex-row items-center justify-between w-full">
                    <View>
                        <Pressable onPress={() => {
                            console.log('HOLA ME PICASTE TUNE')
                        }}>
                            {TuneSettingsIcon(30, 'black')}
                        </Pressable>
                    </View>
                    <View>
                        <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                    </View>
                </View>
                <View className="bg-gray-100 flex-1">
                    <Text>Here goes something</Text>
                </View>
                <View className="text-center items-center">
                    <Text className="text-1xl text-gray-400 font-bold">Estado de la llave:</Text>
                    <Text className="text-2xl text-black font-bold">Cerrado</Text>
                </View>
            </View>
        </View>
    );
}