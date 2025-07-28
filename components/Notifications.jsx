import { View, Text, ActivityIndicator } from "react-native";
import ApiEndpoint from "../utils/endpointAPI";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";


export default function Notifications() {
    const { notifications, setNotifications } = useState();
    const { refreshing, setRefreshing } = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const { user_id } = useLocalSearchParams();
    const endpoint = ApiEndpoint();

    useEffect(() => {
        fetchNotifications();
        console.log('id del usuario: ', user_id)
    })

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchNotifications();
        setRefreshing(false);
    }

    async function fetchNotifications() {
        console.log('entro al fetch')
        setLoading(true);
        setError(null); 
        try {
            const response = await fetch(endpoint + `/waterflow/get-notifications?user_id=${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const result = await response.json()

            console.log(result)

            if (result.status === 'successfuly') {
                setNotifications(result.notifications)
            } else {
                setError('Error al cargar los datos, inténtalo más tarde.')
            }
        } catch (error) {
            console.log(error)
            setError('Error al cargar los datos, inténtalo más tarde.')
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="mt-4 text-gray-600 text-lg">Cargando notificaciones...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <View className="mx-4 bg-red-100 border border-red-400 rounded-lg p-4">
                    <Text className="text-red-700">{error}</Text>
                </View>
            </View>
        )
    }

    if (notifications.length == 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-blue-700">Actualmente no cuentas con notificaciones.</Text>
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
        }>
            <Text>Coconitos</Text>
        </ScrollView>
    );
}