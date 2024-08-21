import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import Buttons from '../components/buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerificarCodigo({ navigation }) {
    const [code, setCode] = useState('');

    const handleVerifyCode = async () => {
        if (!code) {
            Alert.alert("Error", "Por favor ingresa el código de recuperación.");
            return;
        }

        try {
            // Obtener el código de recuperación almacenado
            const storedCode = await AsyncStorage.getItem('recoveryCode');

            if (storedCode === code) {
                // Código correcto, navegar a la pantalla para cambiar la contraseña
                navigation.navigate('CambiarContrasena');
            } else {
                Alert.alert("Error", "Código de recuperación incorrecto.");
            }
        } catch (error) {
            console.error('Error al verificar el código:', error);
            Alert.alert("Error", "Hubo un problema al verificar el código. Inténtalo de nuevo.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificar Código de Recuperación</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa el código de recuperación"
                keyboardType="numeric"
                value={code}
                onChangeText={setCode}
            />
            <Buttons
                textoBoton="Verificar Código"
                accionBoton={handleVerifyCode}
                color="Naranja"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
});
