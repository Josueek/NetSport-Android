import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundImage = ({ children, background }) => {
  const backgrounds = {
    Splash: require('../../assets/Fondos/SplashScreen.png'),
    Registro: require('../../assets/Fondos/RegistroScreeen.png'),
    Login: require('../../assets/Fondos/LoginScreen.png'),
  };

  return (
    <ImageBackground
      source={backgrounds[background]}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundImage;
