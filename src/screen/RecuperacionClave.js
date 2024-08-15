import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// Componentes
import BackgroundImage from '../components/BackgroundImage';
import InputLarge from '../components/inputs/InputLarge';
import Buttons from '../components/buttons/Buttons';
// Navegabilidad
import { useNavigation } from '@react-navigation/native';
// Guardar el id del cliente iniciado
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function RecuperacionClave() {
  
    



    return (
        <BackgroundImage background={"Login"}>
            <View style={styles.container}>
                <Text style={styles.title}>¡Bienvenido!</Text>
             
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
        marginBottom: 52
    },
    button: {
        marginTop: 30,
        marginBottom: 15
    }
});
