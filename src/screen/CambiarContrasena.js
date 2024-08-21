import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import Buttons from '../components/buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditarClient } from '../../api/login'; // Importa la función para actualizar el perfil

export default function CambiarContrasena({ navigation }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Error", "Por favor ingresa y confirma tu nueva contraseña.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        try {
            // Obtener el userId desde AsyncStorage
            const userId = await AsyncStorage.getItem('userId');

            if (!userId) {
                Alert.alert("Error", "No se pudo obtener el ID del usuario. Intenta iniciar sesión nuevamente.");
                return;
            }

            // Preparar los datos para actualizar la contraseña
            const dataClient = {
                userId: userId,
                newPassword: newPassword,
            };

            // Llamar a la API para actualizar la contraseña
            const response = await EditarClient(dataClient);

            if (response.success) {
                Alert.alert("Éxito", "Contraseña actualizada correctamente.");
                navigation.navigate('LoginScreen'); // Redirige al login después de actualizar la contraseña
            } else {
                Alert.alert("Error", response.message || "Hubo un problema al cambiar la contraseña. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            Alert.alert("Error", "Hubo un problema al cambiar la contraseña. Inténtalo de nuevo.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cambiar Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa nueva contraseña"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirma nueva contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Buttons
                textoBoton="Cambiar Contraseña"
                accionBoton={handleChangePassword}
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
