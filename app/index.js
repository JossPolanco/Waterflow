import { StyleSheet, View, Text } from 'react-native'
import { Redirect } from 'expo-router';
import Login from '../components/Login';
import Home from '../components/Home'

export default function Index () {
    // return <Redirect href="/tabs/homeRoute.js" />;
    return (
        <Login/>
    )
}