import { View, Text, Pressable } from "react-native"
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function Home(){
    const { user_id, username } = useLocalSearchParams(); 
    const [ updateFetch, setUpdateFetch ] = useState(false);
    const [ waterFlowActive, setWaterFlowActive ] = useState(undefined);

    console.log('user_id:', user_id, 'username: ', username);
    useEffect(() => {
        async function fetchWaterflows() {
            try {
                const response = await fetch(`https://gpmknnnz-3000.usw3.devtunnels.ms/waterflow/info-waterflow/${user_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },                    
                });
    
                const data = await response.json();
                console.log('Respuesta:', data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchWaterflows()            
    }, [updateFetch])

    return (
        <View className="justify-center items-center">
            <Text className='text-red-500'>Home screen</Text>
            <Pressable onPress={() => setUpdateFetch(!updateFetch)}>
                <Text className="text-blue-500 font-semibold">Close or open</Text>
            </Pressable>
        </View>
    )
}