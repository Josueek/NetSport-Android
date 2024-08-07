// src/screens/SplashScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../components/BackgroundImage';

export default function SplashScreen() {
    const [counter, setCounter] = useState(3); // Estado para el contador, inicializado en 3 segundos
    const navigation = useNavigation(); // Hook para manejar la navegación

    useEffect(() => {
        // Efecto para decrementar el contador cada segundo
        const timer = setInterval(() => {
            setCounter(prevCounter => prevCounter - 1);
        }, 1000);

        return () => clearInterval(timer); // Limpia el intervalo cuando el componente se desmonta
    }, []);

    useEffect(() => {
        if (counter === 0) {
            // Navega a la pantalla de inicio de sesión cuando el contador llega a cero
            navigation.navigate('BienvenidaScreen');
        }
    }, [counter]); // Efecto se ejecuta cada vez que cambia el valor del contador

    return (
        <BackgroundImage background="Splash"> 
            <View style={styles.container}>
                <Image
                    source={require('../../assets/NetSportLogo.png')} // Muestra el logo de la aplicación
                    style={styles.logo}
                />
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo el espacio disponible
        justifyContent: 'center', // Centra el contenido verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
    } 
});
