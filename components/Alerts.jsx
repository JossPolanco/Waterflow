import { LowTemperatureIcon } from "./Icons";
import { View, Text } from "react-native";

export default function Alerts({notification_type = '', message = ''}) {
    const getAlertType = (notification_type) => {
        if(notification_type == 'temperature') return LowTemperatureIcon(20, '#ffffff')
    }

    // function handleDelete(){
    //     console.log('deleted')
    // }

    return (
        <View className="flex-1 items-center py-2">
            <View className="w-full bg-white rounded-xl shadow-xl shadow-black/20 border-b-[2.3px] border-b-[#6363634b] py-8">
                <View className="flex-row items-center w-full">
                    
                    <View className="w-16 items-center justify-center">
                        {getAlertType(notification_type)}
                    </View>

                    <View className="flex-1 items-center justify-center px-4">
                        <Text 
                            className="text-sm font-semibold text-[#1E3441] text-center"
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {message}
                        </Text>
                    </View>
                    
                    {/* <View className="w-16 items-center justify-center">
                        <TouchableOpacity 
                            onPress={handleDelete}
                            className="p-2"
                            activeOpacity={0.7}
                        >
                            <TrashIcon size={24} color="red"/>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </View>
        </View>
    );
}