import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screen/SplashScreen';
//Pantalla con el carousel
import BienvenidaScreen from '../screen/BienvenidaScreen';
//import LoginScreen from '../screen/Login';
import RegistroScreen from '../screen/RegistroScreen';
import LoginScreen from '../screen/Login';
//tabNavegation
import TabNavigator from './TabNavigator';
const Stack = createStackNavigator();

//La idea es que primero se ejecute el splash 
//Posterior a eso ejecuta las pantallas que contienen el carousel como primer uso
const NavStack = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BienvenidaScreen"
                component={BienvenidaScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegistroScreen"
                component={RegistroScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};

export default NavStack;