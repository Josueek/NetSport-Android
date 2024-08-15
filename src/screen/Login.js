import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// Componentes
import BackgroundImage from '../components/BackgroundImage';
import InputLarge from '../components/inputs/InputLarge';
import Buttons from '../components/buttons/Buttons';
// Navegabilidad
import { useNavigation } from '@react-navigation/native';
// API
import { loginClient } from '../../api/login';
// Guardar el id del cliente iniciado
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function Login() {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const navigation = useNavigation();

    //Limpiamos los campos luego de realizar una accion
    const LimpiarCampos = () => {
        setCorreo('');
        setClave('');
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    const RegistroS = () => {
        navigation.navigate('RegistroScreen');
    };
    const IniciarSesion = async () => {
        console.log('Botón presionado');
        try {
            if (!correo || !clave) {
                Alert.alert('Campos Incompletos', 'Por favor completa todos los campos.');
                return;
            }

            if (!validateEmail(correo)) {
                Alert.alert('Correo inválido', 'Por favor ingresa un correo electrónico válido.');
                return;
            }

            const loginData = { correo, contrasena: clave };

            console.log('Datos del usuario: ', loginData);

            const response = await loginClient(loginData);

            if (response.success) {
                // Verificar que user_id está presente en la respuesta
                if (response.user_id) {
                    // Guardar el user_id en AsyncStorage
                    await AsyncStorage.setItem('user_id', response.user_id.toString());
                    Alert.alert('¡Bienvenido!', '¡Haz iniciado sesión con éxito!', [
                        { text: 'OK', onPress: () => navigation.navigate('TabNavigator') }
                    ]);

                } else {
                    Alert.alert('Error', 'No se pudo obtener el ID del usuario. Por favor, inténtalo de nuevo.');
                }
                //Limpiamos los campos
                LimpiarCampos();

            } else if (response.message === 'La cuenta está inactiva.') {
                Alert.alert('Cuenta inactiva', 'Tu cuenta está inactiva. Por favor contacta al soporte.');
            } else {
                Alert.alert('Error', response.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error inicio de sesión:', error);
            Alert.alert('Error', 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
        }
       
    };



    return (
        <BackgroundImage background={"Login"}>
            <View style={styles.container}>
                <Text style={styles.title}>¡Bienvenido!</Text>
                <InputLarge
                    placeHolder={"Ingresa tu correo electrónico"}
                    valor={correo}
                    setTextChange={setCorreo} />
                <InputLarge
                    placeHolder={"Ingresa una clave"}
                    contra={true}
                    valor={clave}
                    setTextChange={setClave} />
                <TouchableOpacity>
                    <Text>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <Buttons color={"Naranja"}
                        textoBoton={"Iniciar sesión"}
                        accionBoton={IniciarSesion}
                    />
                </View>
                <TouchableOpacity onPress={RegistroS}> 
                    <Text>¿Aún no tienes cuenta? Registrate</Text>
                </TouchableOpacity>
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
