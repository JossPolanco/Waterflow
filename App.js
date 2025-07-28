import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import Login from './components/Login';
import SignUp from './components/SignUp';

export default function App() {
  return (
    <View className="bg-red-500">
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <Login/>
      {/* <SignUp/> */}
    </View>
  );
}

