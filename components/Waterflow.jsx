import { View, Pressable, Switch, Text } from "react-native"
import { useEffect, useState } from "react";
import { TuneSettings } from "./Icons";


export default function Waterflow() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View className="justify-center items-center bg-white w-full h-60 rounded-3xl">
            <View className="flex-row items-center justify-between w-full p-3">
                <View>
                    <Pressable onPress={() => {
                        console.log('HOLA ME PICASTE TUNE')
                    }}>
                        {TuneSettings(30, 'black')}
                    </Pressable>
                </View>
                <View>
                    <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
                </View>
            </View>
            <View className="bg-yellow-300">
                <Text>Hola</Text>
            </View>
        </View>
    );
}