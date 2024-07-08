import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
//Componentes
import BackgroundImage from '../../components/BackgroundImage';


export default function Productos() { 
   

    return (
        <BackgroundImage background={"General"}>
            <View style={styles.container}>
               
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    card: {
        marginTop: 20,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: 200,
        height: 230,
        marginRight: 10,
        alignItems: 'center',
    },
    imagen: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    nombre: {
        color: '#333',
        fontWeight: '800',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    categoria: {
        color: '#666',
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'center',
    },
    precio: {
        color: '#F5853F',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    }, title: {
        fontSize: 26,
        marginTop: 80,
        textAlign: 'left',
        fontWeight: '800',
        color: '#F5853F',
    }
});

