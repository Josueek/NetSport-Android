import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screen/SplashScreen';
import BienvenidaScreen from '../screen/BienvenidaScreen';
import RegistroScreen from '../screen/RegistroScreen';
import LoginScreen from '../screen/Login';

import Pedidos from '../screen/tiendaScreens/Pedidos'; // Importa la pantalla de pedidos
import TabNavigator from './TabNavigator';
import DetalleProducto from '../screen/tiendaScreens/DetalleProducto';
import EnviarCorreo from '../screen/EnviarCorreo'; // Nueva pantalla para enviar correo
import VerificarCodigo from '../screen/VerificarCodigo'; // Nueva pantalla para verificar código
import CambiarContrasena from '../screen/CambiarContrasena'; // Nueva pantalla para cambiar contraseña

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
            <Stack.Screen
                name="Pedidos"
                component={Pedidos}
                options={{ title: 'Mis Pedidos' }} // Añade la pantalla de pedidos
            />
            <Stack.Screen
                name="EnviarCorreo"
                component={EnviarCorreo}
                options={{ title: 'Enviar Código de Recuperación' }} // Añade la pantalla para enviar correo
            />
            <Stack.Screen
                name="VerificarCodigo"
                component={VerificarCodigo}
                options={{ title: 'Verificar Código' }} // Añade la pantalla para verificar código
            />
            <Stack.Screen
                name="CambiarContrasena"
                component={CambiarContrasena}
                options={{ title: 'Cambiar Contraseña' }} // Añade la pantalla para cambiar contraseña
            />
        </Stack.Navigator>
    );
};

export default NavStack;
