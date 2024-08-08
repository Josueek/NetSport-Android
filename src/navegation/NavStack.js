import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screen/SplashScreen';
import BienvenidaScreen from '../screen/BienvenidaScreen';
import RegistroScreen from '../screen/RegistroScreen';
import LoginScreen from '../screen/Login';
import TabNavigator from './TabNavigator';
import DetalleProducto from '../screen/tiendaScreens/DetalleProducto';

const Stack = createStackNavigator();

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
            <Stack.Screen 
                name="DetalleProducto" 
                component={DetalleProducto} 
                options={{ title: 'Detalle del Producto' }} 
            />
        </Stack.Navigator>
    );
};

export default NavStack;
