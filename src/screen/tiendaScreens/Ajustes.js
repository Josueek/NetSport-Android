import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
// Componentes
import BackgroundImage from '../../components/BackgroundImage';
import InputText from '../../components/inputs/InputText';
import InputLarge from '../../components/inputs/InputLarge';
import Buttons from '../../components/buttons/Buttons';
// Librería para los datos del usuario
import AsyncStorage from '@react-native-async-storage/async-storage';
// API
import { PerfilClient } from '../../../api/login';

export default function UserDetails() {
    // Variables para almacenar los datos de los inputs
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dui, setDui] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user_id = await AsyncStorage.getItem('user_id');
                if (user_id) {
                    // Llama a tu API para obtener los datos del usuario
                    const response = await PerfilClient({ user_id });
                    if (response.logged_in && response.user_data) {
                        setNombre(response.user_data.nombre_cliente);
                        setApellido(response.user_data.apellido_cliente);
                        setDui(response.user_data.dui_cliente);
                        setFechaNacimiento(response.user_data.nacimiento_cliente);
                        setTelefono(response.user_data.telefono_cliente);
                        setDireccion(response.user_data.direccion_cliente);
                        setCorreo(response.user_data.correo_cliente);
                    } else {
                        Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
                    }
                }
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
                Alert.alert('Error', 'Hubo un problema al cargar los datos del usuario.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <BackgroundImage background={"General"}>
            <View style={styles.container}>
                <Text style={styles.title}>Datos personales</Text>
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
                            placeHolder={"AAAA/MM/DD"}
                            value={fechaNacimiento}
                            setTextChange={setFechaNacimiento}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Dirección: </Text>
                        <InputLarge
                            placeHolder={"Avenida prolongacion"}
                            value={direccion}
                            setTextChange={setDireccion}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Correo electrónico: </Text>
                        <InputText
                            placeHolder={"Correo electrónico"}
                            value={correo}
                            setTextChange={setCorreo}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Contraseña: </Text>
                        <InputText
                            placeHolder={"****"}
                            value={contrasena}
                            setTextChange={setContrasena}
                            secureTextEntry={true}
                            editable={false}
                        />
                    </View>
                </View>
                <Text style={styles.texto}>Cambiar contraseña</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Correo electrónico: </Text>
                        <InputText
                            placeHolder={"Correo electrónico"}
                            value={correo}
                            setTextChange={setCorreo}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Contraseña: </Text>
                        <InputText
                            placeHolder={"****"}
                            value={contrasena}
                            setTextChange={setContrasena}
                            secureTextEntry={true}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Buttons
                            textoBoton="Guardar cambios"
                            color={"Naranja"} />
                    </View>
                    <View style={styles.column}>
                        <Buttons
                            textoBoton="Salir"
                            color={"Gris"} />
                    </View>
                </View>
                <View style={styles.buttton}>
                    <Buttons 
                    color={"Rojo"}
                    textoBoton={'Cerrar sesión'}/>
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
    title: {
        color: '#F5853F',
        fontWeight: '800',
        fontSize: 30,
        marginBottom: 52
    }, 
    button: {
        marginTop: 30,
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
    texto: {
        marginBottom: 15,
        fontSize: 15,
        color: '#F5853F',
        fontWeight: '800',
        marginTop: 15,
    },
    buttton:{
        marginTop: 20,
    }
});
