import { View, Text } from "react-native";
import { AlertIcon, TrashIcon } from "./Icons"; 

export default function Alerts() {
    return (
        <View className="flex-1  items-center bg-white px-2 py-6">
            <View className="flex items-center justify-center flex-row w-full bg-[#ffffff] rounded-xl shadow-xl shadow-black/20 border-b-[2.3px] border-b-[#6363634b] px-4 py-6 gap-5">
                <View className="flex flex-row items-center gap-4">
                    <AlertIcon size={40} color="#ffe600"/>
                    <Text className="flex-1 text-sm font-semibold text-[#1E3441]">
                        Actualmente no tienes alertas activas. Puedes configurar alertas para recibir notificaciones sobre.
                    </Text>
                </View>
                <View className="absolute right-1.5 top-9.9">
                    <TrashIcon size={24} color="red"/>
                </View>
            </View>

            <View className="flex items-center justify-center flex-row w-full bg-[#ffffff] rounded-xl shadow-xl shadow-black/20 border-b-[2.3px] border-b-[#6363634b] px-4 py-6 gap-5">
                <View className="flex flex-row items-center gap-4">
                    <AlertIcon size={40} color="#ffe600"/>
                    <Text className="flex-1 text-sm font-semibold text-[#1E3441]">
                        Actualmente no tienes alertas activas. Puedes configurar alertas para recibir notificaciones sobre.
                    </Text>
                </View>
                <View className="absolute right-1.5 top-9.9">
                    <TrashIcon size={24} color="red"/>
                </View>
            </View>

            <View className="flex items-center justify-center flex-row w-full bg-[#ffffff] rounded-xl shadow-xl shadow-black/20 border-b-[2.3px] border-b-[#6363634b] px-4 py-6 gap-5">
                <View className="flex flex-row items-center gap-4">
                    <AlertIcon size={40} color="#ffe600"/>
                    <Text className="flex-1 text-sm font-semibold text-[#1E3441]">
                        Actualmente no tienes alertas activas. Puedes configurar alertas para recibir notificaciones sobre.
                    </Text>
                </View>
                <View className="absolute right-1.5 top-9.9">
                    <TrashIcon size={24} color="red"/>
                </View>
            </View>
        </View>
    );
}