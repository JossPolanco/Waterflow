import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { View, Text, ActivityIndicator } from "react-native";
import ApiEndpoint from "../utils/endpointAPI";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/context";
import Alerts from "./Alerts";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const endpoint = ApiEndpoint();
    const { userId } = useUser();

    useEffect(() => {
        fetchNotifications();
    }, [])

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchNotifications();
        setRefreshing(false);
    }

    async function fetchNotifications() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(endpoint + `/waterflow/get-notifications?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const result = await response.json()

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
            
            {!loading && notifications.length > 0 && (
                <View className="flex-1 w-full gap-5">
                    {notifications.map((notification, index) => (
                        <View key={index}>
                            <Alerts
                                notification_type={notification.notification_type}
                                message={notification.message}
                            />
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}