import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
// Componentes
import BackgroundImage from '../../components/BackgroundImage';
import InputText from '../../components/inputs/InputText';
import InputLarge from '../../components/inputs/InputLarge';
import Buttons from '../../components/buttons/Buttons';
// Librería para los datos del usuarioo
import AsyncStorage from '@react-native-async-storage/async-storage';
// API
import { PerfilClient, EditarClient } from '../../../api/login';
// Navegabilidad
import { useNavigation } from '@react-navigation/native';
//IP constantes
import * as Constante from '../../utils/constantes';

export default function UserDetails() {
    //Valor de la IP
    const ip = Constante.IP;
    // Variables para almacenar los datos de los inputs
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dui, setDui] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasenaNueva, setContrasenaNueva] = useState('');

    //funcion para implementar la navegabilidad
    const navigation = useNavigation();

    //Funcion para cagar los datos del usuario
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user_id = await AsyncStorage.getItem('user_id');
                if (user_id) {
                    // Llama a tu API para obtener los datos del usuario
                    const response = await PerfilClient({ user_id });
                    console.log('Valor de response', response);
                    if (response.user_data) {
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

    //Funcion para actualizar los datos del usuario
    const guardarCambios = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            if (!user_id) {
                Alert.alert('Error', 'No se pudo obtener el ID del usuario.');
                return;
            }

            const response = await EditarClient({
                user_id,
                nombre,
                apellido,
                dui,
                fecha_nacimiento: fechaNacimiento,
                telefono,
                direccion,
                correo,
                contrasena: contrasenaNueva,
            });

            if (response.success) {
                Alert.alert('Éxito', 'Los datos han sido actualizados.');
            } else {
                Alert.alert('Error', 'No se pudieron actualizar los datos.');
            }
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            Alert.alert('Error', 'Hubo un problema al guardar los cambios.');
        }
    };
    //Funcion para cerrar sesión
    const cerrarSesion = async () => {
        try {
            const response = await fetch(`${ip}/NetSports/Api/models/data/cerrar_sesion.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.success) {
                await AsyncStorage.removeItem('user_id');
                Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
                // Redirigir a la pantalla 
                navigation.navigate('LoginScreen');
            } else {
                Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
        }
    };

    return (
        <BackgroundImage background={"General"}>
            <View style={styles.container}>
                <Text style={styles.title}>Datos personales</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Nombre: </Text>
                        <InputText
                            placeHolder={"Ingresa tu nombre"}
                            Valor={nombre}
                            setTextChange={setNombre}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Apellido: </Text>
                        <InputText
                            placeHolder={"Ingresa tu apellido"}
                            Valor={apellido}
                            setTextChange={setApellido}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Número de DUI: </Text>
                        <InputText
                            placeHolder={"DUI sin Guión"}
                            Valor={dui}
                            setTextChange={setDui}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Fecha de nacimiento: </Text>
                        <InputText
                            placeHolder={"AAAA/MM/DD"}
                            Valor={fechaNacimiento}
                            setTextChange={setFechaNacimiento}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Dirección: </Text>
                        <InputLarge
                            placeHolder={"Avenida prolongacion"}
                            Valor={direccion}
                            setTextChange={setDireccion}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Número de teléfono: </Text>
                        <InputText
                            placeHolder={"Núm"}
                            Valor={telefono}
                            setTextChange={setTelefono}
                        />
                    </View>
                </View>
                <Text style={styles.texto}>Cambiar contraseña</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Correo electrónico: </Text>
                        <InputText
                            placeHolder={"Correo electrónico"}
                            Valor={correo}
                            setTextChange={setCorreo}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Nueva contraseña: </Text>
                        <InputText
                            Valor={contrasenaNueva}
                            setTextChange={setContrasenaNueva}
                            contra={true}
                            editable={true}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Buttons
                            textoBoton="Guardar cambios"
                            color={"Naranja"}
                            accionBoton={guardarCambios}
                        />
                    </View>
                    <View style={styles.column}>
                        <Buttons
                            color={"Rojo"}
                            textoBoton={'Cerrar sesión'}
                            accionBoton={cerrarSesion}
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
    title: {
        color: '#F5853F',
        fontWeight: '800',
        fontSize: 30,
        marginBottom: 10
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
    buttton: {
        marginTop: 20,
    }
});
