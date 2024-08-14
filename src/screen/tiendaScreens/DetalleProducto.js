import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { DetallesProductos } from '../../../api/producto'; // Asegúrate de que la API esté importada correctamente
//FOndo de la pantalla
import BackgroundImage from '../../components/BackgroundImage';
import * as Constante from '../../utils/constantes';
//Componente button
import Buttons from '../../components/buttons/Buttons';
//Botones circulaes
import ButtonsCircle from '../../components/buttons/ButtonCircle';

export default function DetallesProducto({ route }) {
    //Recibimos el id del producto
    const { id_producto } = route.params;
    //Datos del producto
    const [producto, setProducto] = useState(null);
    //Animacion para cargar el producto
    const [loading, setLoading] = useState(true);
    //Datos de la IP
    const ip = Constante.IP;
    useEffect(() => {
        const fetchProducto = async () => {
            const result = await DetallesProductos(id_producto);
            if (result.success) {
                setProducto(result.producto);
            } else {
                console.error(result.message);
            }
            setLoading(false);
        };

        fetchProducto();
    }, [id_producto]);

    if (loading) {
        return (
            <BackgroundImage background={"General"}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#F5853F" />
                </View>
            </BackgroundImage >
        );
    }

    if (!producto) {
        return (
            <BackgroundImage background={"General"}>
                <View style={styles.container}>
                    <Text style={styles.errorText}>Producto no encontrado</Text>
                </View>
            </BackgroundImage>
        );
    }

    return (
        <BackgroundImage background={"General"}>
            <View style={styles.container}>
                <Text style={styles.title}>Detalles del producto</Text>
                <Image source={{ uri: `${ip}/NetSports/Api/images/productos${producto.imagen_portada}` }} style={styles.imagen} />
                <View style={styles.card}>
                    <Text style={styles.descripcion}>{producto.nombre_marca}</Text>
                    <Text style={styles.nombre_categoria}>Categoria: {producto.nombre_categoria}</Text>
                    <Text style={styles.nombre}>{producto.nombre_producto}</Text>
                    <View style={styles.row}>
                        <Text style={styles.precio}>Precio: ${producto.precio_final}</Text>
                        <Text style={styles.precio}>Promocion: ${producto.precio_promocion}</Text>
                    </View>
                </View>
                <Text style={styles.tallas}>Tallas</Text>

                <ButtonsCircle textoBoton={producto.talla}
                    color={"negro"} />

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
    }, title: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: '600'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagen: {
        width: 300,
        height: 300,
        marginBottom: 10,

    },
    nombre: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    descripcion: {
        fontSize: 16,
        marginBottom: 10,
    }, nombre_categoria: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '800',
    },
    precio: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#F5853F',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    }, card: {
        flex: 0,
        margin: 10,
        backgroundColor: '#EEE',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: 370,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }, tallas: {
        marginTop: 10,
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '600',
        justifyContent: 'flex-end',
        textAlign: 'left',
    }
});
