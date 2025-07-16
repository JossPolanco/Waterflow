import { Text, View } from 'react-native'
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { waterflow_mac } = useLocalSearchParams();     
    
    useEffect(() => {
        console.log(waterflow_mac);
    }, [])

    
    return (
        <View>
            <Text>HOLA DASHBOARD</Text>
        </View>
    )
}