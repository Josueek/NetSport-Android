import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';

export default function Login() {
  return (
    <BackgroundImage background="login">
      <View style={styles.container}>
        <Text>Hello, World!</Text>
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
});
