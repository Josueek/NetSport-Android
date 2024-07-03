import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//Componentes
import BackgroundImage from '../components/BackgroundImage';
import InputLarge from '../components/inputs/InputLarge';
import Buttons from '../components/buttons/Buttons';
//Navegabilidad
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [clave, setClave] = useState('');
  //Navegabilidad
  const navigation = useNavigation();
  const IniciarSesion = () => {
    navigation.navigate('TabNavigator');
  }

  return (
    <BackgroundImage background={"Login"}>

      <View style={styles.container}>
        <Text style={styles.title}>!Bienvenido¡</Text>
        <InputLarge
          placeHolder={"Ingresa tu correo electrónico"} />
        <InputLarge
          placeHolder={"Ingresa una clavev"}
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
