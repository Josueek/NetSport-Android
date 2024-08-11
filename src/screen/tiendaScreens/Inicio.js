import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import Buttons from '../../components/buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PerfilClient } from '../../../api/login';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

export default function Inicio({ navigation }) {  // Recibe navigation como prop
    const [userName, setUserName] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user_id = await AsyncStorage.getItem('user_id');
                if (user_id) {
                    const response = await PerfilClient({ user_id });
                    if (response.user_data && response.user_data.nombre_cliente) {
                        setUserName(response.user_data.nombre_cliente);
                    }
                }
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
            }
        };

        fetchUserData();

        const updateDateTime = () => {
            const now = new Date();
            const date = now.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            const time = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setCurrentDateTime(`${date} ${time}`);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <BackgroundImage background={"General"}>
            <View style={styles.container}>
                <Text style={styles.title}>Inicio</Text>
                <Text style={styles.greeting}>¡Hola, {userName}!</Text>
                <Text style={styles.dateTime}>{currentDateTime}</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Icon name="truck" size={24} color="#000" />
                        <Text>Entrega segura en 1 - 5 días hábiles</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon name="star" size={24} color="#000" />
                        <Text>Reseñas de nuestros clientes</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon name="lock" size={24} color="#000" />
                        <Text>Compras seguras</Text>
                    </View>
                </View>
                <Buttons 
                    color={"Naranja"} 
                    textoBoton={"Ver Pedidos"} 
                    accionBoton={() => navigation.navigate('Pedidos')}  // Usa navigation para navegar
                    />
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#F5853F',
        fontWeight: '800',
        fontSize: 30,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 20,
        marginBottom: 20,
    },
    dateTime: {
        fontSize: 18,
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 30,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});
