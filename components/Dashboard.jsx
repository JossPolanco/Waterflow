import { ActivityIndicator, Text, View } from 'react-native'
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from 'react';
import ApiEndpoint from '../utils/endpointAPI';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Dashboard() {
    const { waterflow_mac } = useLocalSearchParams();
    const endpoint = ApiEndpoint();
    const [temperatureHistory, setTemperatureHistory] = useState([]);
    const [stateHistory, setStateHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const insets = useSafeAreaInsets()
    
    useEffect(() => {        
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            await Promise.all([fetchHistoryTemp(), fetchHistoryState()]);
        } catch (err) {
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    }

    async function fetchHistoryTemp(){
        try {
            const response = await fetch(endpoint + `/waterflow/get-history-temp?mac_address=${waterflow_mac}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const result = await response.json()        
    
            if(result.status === 'successfuly' && result.results) {
                setTemperatureHistory(result.results);
            } else {
                setError('Error al cargar los datos');
            }

        } catch (error) {
            console.log('Error was found: ', error);
            setError('Error al cargar los datos');
        }
    }

    async function fetchHistoryState(){
        try {
            const response = await fetch(endpoint + `/waterflow/history-state?waterflow_mac=${waterflow_mac}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const result = await response.json()            
    
            if(result.history) {
                setStateHistory(result.history);
            } else {
                setError('Error al cargar los datos');
            }
        } catch (error) {
            console.log('Error was found: ', error);
            setError('Error al cargar los datos');
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const formatTemperature = (temp) => {        
        if (temp === -127) {
            return 'Error del sensor';
        }
        return `${temp}°C`;
    }

    const getTemperatureColor = (temp) => {
        if (temp === -127) return 'text-red-500';
        if (temp < 15) return 'text-blue-500';
        if (temp > 30) return 'text-red-500';
        if (temp > 25) return 'text-orange-500';
        if (temp > 15) return 'text-green-500';
        return 'text-green-500';
    }

    const getLatestTemperature = () => {
        if (temperatureHistory.length === 0) return null;
        return temperatureHistory[temperatureHistory.length - 1];
    }

    const getTemperatureStats = () => {
        if (temperatureHistory.length === 0) return { avg: 0, min: 0, max: 0 };
        // remove all the error temps
        const validTemps = temperatureHistory.filter(item => item.temp !== -127);
        if (validTemps.length === 0) return { avg: 'N/A', min: 'N/A', max: 'N/A' };
        
        const temps = validTemps.map(item => item.temp);
        return {
            avg: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
            min: Math.min(...temps),
            max: Math.max(...temps)
        };
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="mt-4 text-gray-600 text-lg">Cargando dashboard...</Text>
            </View>
        );
    }

    const latestTemp = getLatestTemperature();
    const stats = getTemperatureStats();
    
    if(error){
        return (
            <View className="flex-1 justify-center items-center">
                <View className="mx-4 bg-red-100 border border-red-400 rounded-lg p-4">
                    <Text className="text-red-700">{error}</Text>
                </View>
            </View>
        )
    }

    return (
        <View className="bg-gray-50 flex-1" style={{ paddingBottom: insets.bottom }}>
            <ScrollView 
                className="flex-1"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                {latestTemp && (
                    <View className="mx-4 mt-6 bg-white rounded-2xl p-6 shadow-sm">
                        <Text className="text-gray-500 text-sm mb-2">Última Lectura</Text>
                        <Text className={`text-4xl font-bold mb-2 ${getTemperatureColor(latestTemp.temp)}`}>
                            {formatTemperature(latestTemp.temp)}
                        </Text>
                        <Text className="text-gray-400 text-sm">
                            {formatDate(latestTemp.date)}
                        </Text>
                    </View>
                )}
                
                <View className="mx-4 mt-4 bg-white rounded-2xl p-6 shadow-sm">
                    <Text className="text-gray-800 text-lg font-semibold mb-4">Estadísticas de Temperatura</Text>
                    <View className="flex-row justify-between">
                        <View className="items-center">
                            <Text className="text-gray-500 text-sm">Promedio</Text>
                            <Text className="text-blue-600 text-xl font-bold">{stats.avg}°C</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-gray-500 text-sm">Mínima</Text>
                            <Text className="text-green-600 text-xl font-bold">{stats.min}°C</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-gray-500 text-sm">Máxima</Text>
                            <Text className="text-red-600 text-xl font-bold">{stats.max}°C</Text>
                        </View>
                    </View>
                </View>
                
                <View className="mx-4 mt-4 bg-white rounded-2xl p-6 shadow-sm">
                    <Text className="text-gray-800 text-lg font-semibold mb-4">
                        Historial de Temperatura ({temperatureHistory.length} registros)
                    </Text>
                    
                    {temperatureHistory.length === 0 ? (
                        <View className="py-8 items-center">
                            <Text className="text-gray-500">No hay datos disponibles</Text>
                        </View>
                    ) : (
                        <View className="space-y-3">
                            {temperatureHistory.slice(-10).reverse().map((item, index) => (
                                <View key={index} className="flex-row justify-between items-center py-3 border-b border-gray-100">
                                    <View>
                                        <Text className={`text-lg font-semibold ${getTemperatureColor(item.temp)}`}>
                                            {formatTemperature(item.temp)}
                                        </Text>
                                        <Text className="text-gray-500 text-sm">
                                            {formatDate(item.date)}
                                        </Text>
                                    </View>
                                    <View className={`w-3 h-3 rounded-full ${
                                        item.temp === -127 ? 'bg-red-500' : 
                                        item.temp < 15 ? 'bg-blue-500' :
                                        item.temp > 30 ? 'bg-red-500' :
                                        item.temp > 20 ? 'bg-orange-500' : 'bg-green-500'
                                    }`} />
                                </View>
                            ))}
                            
                            {temperatureHistory.length > 10 && (
                                <Text className="text-center text-gray-500 text-sm mt-4">
                                    Mostrando los últimos 10 registros
                                </Text>
                            )}
                        </View>
                    )}
                </View>

                <View className="mx-4 mt-4 mb-6 bg-white rounded-2xl p-6 shadow-sm">
                    <Text className="text-gray-800 text-lg font-semibold mb-4">
                        Historial de Estado ({stateHistory.length} registros)
                    </Text>
                    
                    {stateHistory.length === 0 ? (
                        <View className="py-8 items-center">
                            <Text className="text-gray-500">No hay datos de estado disponibles</Text>
                            <Text className="text-gray-400 text-sm mt-2">Los estados aparecerán aquí cuando estén disponibles</Text>
                        </View>
                    ) : (
                        <View className="space-y-3">
                            {stateHistory.slice(-10).reverse().map((item, index) => (
                                <View key={index} className="flex-row justify-between items-center py-3 border-b border-gray-100">
                                    <View>
                                        <Text className="text-lg font-semibold text-gray-800">
                                            {item.state == true ? 'Fue activado' : 'Fue desactivado' || 'Estado desconocido'}
                                        </Text>
                                        <Text className="text-gray-500 text-sm">
                                            {formatDate(item.date)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}