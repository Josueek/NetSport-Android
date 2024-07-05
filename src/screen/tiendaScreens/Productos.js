import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
//Componentes
import BackgroundImage from '../../components/BackgroundImage';
//Datos de los productos
import Data from '../../data/Productos';

export default function Productos() {
    // Filtrar productos que están en promoción
    const productosEnPromocion = Data.filter(producto => producto.promocion === 'si');

    // Renderizar cada producto como una carta horizontal
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.imagen} style={styles.imagen} />
            <Text style={styles.nombre}>{item.Nombre}</Text>
            <Text style={styles.categoria}>{item.categoria}</Text>
            <Text style={styles.precio}>{item.Precio}</Text>
        </View>
    );

    return (
        <BackgroundImage background={"General"}>
            <View style={styles.container}>
                <Text style={styles.title}>Promociones de la semana</Text>
                <FlatList
                    data={productosEnPromocion}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={true} // Hace que las cartas se vean horizontalmente
                />
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

