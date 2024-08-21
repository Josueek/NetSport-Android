import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import Buttons from '../components/buttons/Buttons';
import * as Constantes from '../utils/constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { send } from 'emailjs-com';

const ip = Constantes.IP;

export default function EnviarCorreo({ navigation }) {
    const [email, setEmail] = useState('');

    const isValidEmail = (email) => {
        // Verificar si el correo electrónico es válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSendCode = async () => {
        if (!email) {
            Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Error", "Por favor ingresa un correo electrónico válido.");
            return;
        }

        // Generar el código de recuperación
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Enviar el código al correo
        const templateParams = {
            email: email,  // Aquí se usa 'email' en lugar de 'to_email'
            message: `Tu código de recuperación es: ${code}`,
        };
        

        // Imprimir la dirección de correo en la consola
        console.log(`Enviando código de recuperación al correo: ${email}`);

        try {
            await send(
                'service_jiixs3q',         // Tu ID de servicio en EmailJS
                'template_ojpv1qk',        // Tu ID de plantilla en EmailJS
                templateParams,
                'Uu6zKJAjpSzO3lbnM' // Tu ID de usuario en EmailJS
            );
            // Guardar el código en el local storage
            await AsyncStorage.setItem('recoveryCode', code);
            // Mostrar el siguiente paso
            Alert.alert("Código enviado", "Revisa tu bandeja de entrada para continuar.");
            navigation.navigate('VerificarCodigo');
        } catch (error) {
            console.log('Error al enviar el código:', error);
            Alert.alert("Error", "Hubo un problema al enviar el código. Inténtalo de nuevo.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperación de Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChangeText={setEmail}
            />
            <Buttons
                textoBoton="Enviar Código"
                accionBoton={handleSendCode}
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
