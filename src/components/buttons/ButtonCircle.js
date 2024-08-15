import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ButtonsCircle({ textoBoton, accionBoton, color }) {
    const Colores = {
        Negro: '#000',
        Blanco: '#FFF',
        Gris: '#DFDFDF',
        Naranja: '#F5853F',
        Rojo: '#D00000',
    };

    const buttonColor = Colores[color] || color;

    return (
        <TouchableOpacity 
            style={[styles.button, { backgroundColor: buttonColor, borderColor: buttonColor }]} 
            onPress={accionBoton}
        >
            <Text style={[styles.buttonText, { color: color === 'Negro' ? '#FFF' : '#000' }]}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 15,
    }
});
