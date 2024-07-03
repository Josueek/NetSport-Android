import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//Componentes
import BackgroundImage from '../../components/BackgroundImage';


export default function Login() {


    return (
        <BackgroundImage background={"General"}>

            <View style={styles.container}>
                <Text style={styles.title}>!Bienvenido¡</Text>

            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, title: {
        color: '#F5853F',
        fontWeight: '800',
        fontSize: 30,
        marginBottom: 52
    }, button: {
        marginTop: 30,
    }
});
