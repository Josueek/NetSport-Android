// Login.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import InputText from '../components/inputs/InputText';
import Buttons from '../components/buttons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { registerClient } from '../../api/api'; // Asegúrate de importar la función

export default function Login() {
    
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dui, setDui] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const navigation = useNavigation();

    const handleRegister = async () => {
        try {
            // Preparar los datos del cliente
            const clientData = {
                nombre: nombre,
                apellido: apellido,
                dui: dui,
                telefono: telefono,
                correo: correo,
                contrasena: contrasena,
                fecha_nacimiento: fechaNacimiento,
                direccion: direccion,
                terminos_condiciones: true, // Ajusta según tus necesidades
            };

            // Llamar a la función de registro
            const response = await registerClient(clientData);

            if (response.success) {
                Alert.alert('Registro exitoso', '¡Te has registrado con éxito!', [
                    { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }
                ]);
            } else {
                Alert.alert('Error', response.message || 'Error al registrar la cuenta');
            }
        } catch (error) {
            console.error('Error registering client:', error);
            Alert.alert('Error', 'Hubo un problema al intentar registrar. Por favor, inténtalo de nuevo más tarde.');
        }
    };


    const volver = () => {
        navigation.navigate('BienvenidaScreen');
    };

    return (
        <BackgroundImage background={"Registro"}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    ¡Registrate en NetSport!
                </Text>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Nombre: </Text>
                        <InputText
                            placeHolder={"Ingresa tu nombre"}
                            value={nombre}
                            setTextChange={setNombre}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Apellido: </Text>
                        <InputText
                            placeHolder={"Ingresa tu apellido"}
                            value={apellido}
                            setTextChange={setApellido}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Número de DUI: </Text>
                        <InputText
                            placeHolder={"DUI sin Guión"}
                            value={dui}
                            setTextChange={setDui}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Fecha de nacimiento: </Text>
                        <InputText
                            placeHolder={"00 de mes año"}
                            value={fechaNacimiento}
                            setTextChange={setFechaNacimiento}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Número de teléfono: </Text>
                        <InputText
                            placeHolder={"8 dígitos"}
                            value={telefono}
                            setTextChange={setTelefono}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Dirección de entrega: </Text>
                        <InputText
                            placeHolder={"Ingresa tu dirección"}
                            value={direccion}
                            setTextChange={setDireccion}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Correo electrónico: </Text>
                        <InputText
                            placeHolder={"@gmail.com"}
                            value={correo}
                            setTextChange={setCorreo}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Contraseña: </Text>
                        <InputText
                            placeHolder={"8 dígitos"}
                            value={contrasena}
                            setTextChange={setContrasena}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Buttons
                            color={"Gris"}
                            textoBoton={"Volver"}
                            accionBoton={volver}
                        />
                    </View>
                    <View style={styles.column}>
                        <Buttons
                            color={"Naranja"}
                            textoBoton={"Registrarme"}
                            accionBoton={handleRegister}
                        />
                    </View>
                </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    column: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10,
    },
    title: {
        fontWeight: '800',
        fontSize: 30,
        marginTop: '80%',
        marginBottom: 0,
    },
});


