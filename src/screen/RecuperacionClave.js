import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Modal, TextInput } from 'react-native';
import { send } from 'emailjs-com';
import BackgroundImage from '../components/BackgroundImage';
import InputLarge from '../components/inputs/InputLarge';
import Buttons from '../components/buttons/Buttons';
// Constantes
import * as Constantes from '../utils/constantes';
const ip = Constantes.IP;

export default function RecuperacionClave() {
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [recoveryCode, setRecoveryCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');

    const generateRecoveryCode = () => {
        // Generar un código de 6 dígitos
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handlePasswordRecovery = () => {
        if (!email) {
            Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
            return;
        }

        const code = generateRecoveryCode();
        setRecoveryCode(code); // Guardar el código en el estado

        const templateParams = {
            to_email: email,
            message: `Tu código de recuperación es: ${code}`,
        };
        try {
            send(
                'service_wp77ilf',
                'template_crx6vl2',
                templateParams,
                '20220329'
            )
                .then(response => {
                    Alert.alert("Código enviado", "Revisa tu bandeja de entrada para continuar con la recuperación.");
                    setModalVisible(true); // Muestra el modal para ingresar el código de recuperación
                })
        } catch (error) {
            console.log('error: ', error)
        }


    };

    const handleVerifyCode = () => {
        if (enteredCode === recoveryCode) {
            Alert.alert("Código verificado", "Ahora puedes cambiar tu contraseña.");
            // Aquí puedes proceder a mostrar un campo para la nueva contraseña
        } else {
            Alert.alert("Error", "El código ingresado es incorrecto.");
        }
    };

    const handleChangePassword = () => {
        if (!newPassword) {
            Alert.alert("Error", "Por favor ingresa una nueva contraseña.");
            return;
        }

        const url = `${ip}/NetSports/Api/services/public/recuperacion_clave.php?correo_cliente=${email}&contrasena=${newPassword}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contrasena: newPassword,
                correo: email
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Alert.alert("Éxito", data.message);
                    setModalVisible(false); // Cierra el modal después de cambiar la contraseña
                } else {
                    Alert.alert("Error", data.message);
                }
            })
            .catch(error => {
                Alert.alert("Error", "Hubo un problema al cambiar la contraseña. Intenta nuevamente.");
            });
    };

    return (
        <BackgroundImage background={"Login"}>
            <View style={styles.container}>
                <Text style={styles.title}>¡Recupera tu contraseña!</Text>
                <InputLarge
                    placeHolder={"Ingresa tu correo"}
                    contra={false}
                    valor={email}
                    setTextChange={setEmail}
                />
                <Buttons
                    textoBoton="Enviar Código"
                    accionBoton={handlePasswordRecovery}
                    color={"Naranja"}
                />

                {/* Modal para ingresar el código y cambiar la contraseña */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Ingresa el código de recuperación:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Código de Recuperación"
                            onChangeText={setEnteredCode}
                            value={enteredCode}
                        />
                        <Buttons
                            textoBoton="Verificar Código"
                            accionBoton={handleVerifyCode}
                            color={"Naranja"}
                        />
                        <Text style={styles.modalText}>Ingresa tu nueva contraseña:</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="Nueva Contraseña"
                            onChangeText={setNewPassword}
                            value={newPassword}
                        />
                        <Buttons
                            textoBoton="Cambiar Contraseña"
                            accionBoton={handleChangePassword}
                            color={"Naranja"}
                        />
                    </View>
                </Modal>
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
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        textAlign: 'center'
    }
});
