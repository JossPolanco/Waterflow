import { Slot, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import "../global.css"


export default function Layout() {
    return (
        <View style={{ flex: 1}}>
            <Slot/>
            {/* <Text className="justify-center self-center">Hola tonotos</Text> */}
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         display: flex,
//     }
// })