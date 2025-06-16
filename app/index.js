import { StyleSheet, View, Text } from 'react-native'
import Login from '../components/Login';


export default function Index () {
    return (
        <View>
            <Login/>   
            {/* <Text style={ styles.text }>Hola pepe</Text>      */}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "red"
    }
}) 