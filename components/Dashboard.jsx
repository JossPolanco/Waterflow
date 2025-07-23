import { Text, View } from 'react-native'
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from 'react';
import ApiEndpoint from '../utils/endpointAPI';

export default function Dashboard() {
    const { waterflow_mac } = useLocalSearchParams();
    const endpoint = ApiEndpoint();
    
    useEffect(() => {
        console.log('MAC', waterflow_mac)
        fetchHistoryTemp()
        fetchHistoryState()
    }, [])

    async function fetchHistoryTemp(){
        const response = await fetch(endpoint + `/waterflow/get-history-temp?mac_address=${waterflow_mac}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json()

        console.log('HISTORIAL DE TEMPERATURA: ', result);
    }

    async function fetchHistoryState(){
        const response = await fetch(endpoint + `/waterflow/history-state?waterflow_mac=${waterflow_mac}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json()
        
        console.log('HISTORIAL DE ESTADO: ', result.history);
    }

    
    return (
        <View>
            <Text>HOLA DASHBOARD</Text>
        </View>
    )
}