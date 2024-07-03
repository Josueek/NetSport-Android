import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Inicio from '../screen/tiendaScreens/Inicio';
import Productos from '../screen/tiendaScreens/Productos';
import Favoritos from '../screen/tiendaScreens/Favoritos';
import Ajustes from '../screen/tiendaScreens/Ajustes';

const Tab = createBottomTabNavigator();

const AdmincfpTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconSize = focused ? size + 5 : size; // Aumenta el tamaño del icono si está seleccionado

                    if (route.name === 'Inicio') {
                        iconName = 'home';
                    } else if (route.name === 'Productos') {
                        iconName = 'cart';
                    } else if (route.name === 'Favoritos') {
                        iconName = 'heart';
                    } else if (route.name === 'Ajustes') {
                        iconName = 'cog';
                    }

                    return <Icon name={iconName} color={color} size={iconSize} />;
                },
                headerShown: false,
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: 'white',
                tabBarLabelStyle: { fontWeight: 'bold' },
                tabBarStyle: {
                    backgroundColor: '#F5853F', // Cambia el color de fondo del tab
                },
            })}
        >
            <Tab.Screen
                name="Inicio"
                component={Inicio}
                options={{ tabBarLabel: 'Inicio' }}
            />
            <Tab.Screen
                name="Productos"
                component={Productos}
                options={{ tabBarLabel: 'Productos' }}
            />
            <Tab.Screen
                name="Favoritos"
                component={Favoritos}
                options={{ tabBarLabel: 'Favoritos' }}
            />
            <Tab.Screen
                name="Ajustes"
                component={Ajustes}
                options={{ tabBarLabel: 'Ajustes' }}
            />
        </Tab.Navigator>
    );
}

export default AdmincfpTabNavigator;
