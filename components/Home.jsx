import { View, Text, Button } from "react-native"
import { useEffect, useState } from "react";
import { useGetWaterflows } from "../../hooks/useGetWaterflows"


export default function Home(){
    // const { updateWaterflows, setUpdateWaterflows} = useState();
    // const { user_id, username } = useLocalSearchParams();
    // // const { getWaterflows } = useGetWaterflows(user_id)
    
    // useEffect(() => {
    //     // const waterflowsInfo = getWaterflows(user_id);
    //     console.log('hello world');
    // }, [updateWaterflows])

    return (
        <View className="justify-center items-center">
            <Text className='text-red-500'>Home screen</Text>
            <Button onPress={ () => setUpdateWaterflows() }>Press me</Button>
        </View>
    )
}