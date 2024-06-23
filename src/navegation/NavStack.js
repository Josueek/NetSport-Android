import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/Login';

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
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default NavStack;
