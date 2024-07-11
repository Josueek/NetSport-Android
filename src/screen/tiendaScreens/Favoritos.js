import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
// Componentes
import BackgroundImage from '../../components/BackgroundImage';
// Librería de iconos
import Icon from 'react-native-vector-icons/Ionicons';
// Librería para almacenamiento
import AsyncStorage from '@react-native-async-storage/async-storage';
// API para capturar los datos de productos
import { cargarProductos } from '../../../api/producto';
//IP constantes
import * as Constantes from '../../utils/constantes';
export default function Favoritos() {
    //Valor de la IP constante
    const ip = Constantes.IP;
    
    const [favoritos, setFavoritos] = useState({});
    const [productos, setProductos] = useState([]);
    //Const para refrescar los datos
    const [refreshing, setRefreshing] = useState(false);

    // Capturamos los productos
    useEffect(() => {

        fetchFavoritos();
    }, []);

    const fetchFavoritos = async () => {
        const storedFavoritos = await AsyncStorage.getItem('favoritos');
        if (storedFavoritos) {
            const favoritosIds = Object.keys(JSON.parse(storedFavoritos)).filter(id => JSON.parse(storedFavoritos)[id]);
            setFavoritos(JSON.parse(storedFavoritos));
            const result = await cargarProductos();
            if (result.products) {
                const favoritosProductos = result.products.filter(producto => favoritosIds.includes(producto.id_producto.toString()));
                setProductos(favoritosProductos);
            } else {
                console.error(result.message);
            }
        }
    };

    //ACtualizamos los datos
    const onRefresh = async() =>{
        setRefreshing(true);
        await fetchFavoritos();
        setRefreshing(false);
    }

    // Función para identificar los productos favoritos
    const toggleFavorito = async (id_producto) => {
        const newFavoritos = {
            ...favoritos,
            [id_producto]: !favoritos[id_producto]
        };
        setFavoritos(newFavoritos);
        // Guardar favoritos en AsyncStorage
        await AsyncStorage.setItem('favoritos', JSON.stringify(newFavoritos));

        // Actualizar la lista de productos
        const favoritosIds = Object.keys(newFavoritos).filter(id => newFavoritos[id]);
        const result = await cargarProductos();

        if (result.products) {
            const favoritosProductos = result.products.filter(producto => favoritosIds.includes(producto.id_producto.toString()));
            setProductos(favoritosProductos);
        } else {
            console.error(result.message);
        }
    };

    // Renderizar cada producto como una carta
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardButton}>
            <View style={styles.card}>
                <Image source={{ uri: `${ip}/NetSports/Api/images/productos` + item.imagen_portada }} style={styles.imagen} />
                <Text style={styles.nombre}>{item.nombre_producto}</Text>
                <Text style={styles.categoria}>{item.nombre_categoria}</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.icono} onPress={() => toggleFavorito(item.id_producto)}>
                        <Icon
                            name={favoritos[item.id_producto] ? "heart" : "heart-outline"}
                            size={25}
                            color={favoritos[item.id_producto] ? "#d3dfdg" : "#000"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.precio}>${item.precio_final}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <BackgroundImage background={"General"}>
            <View style={styles.container}>
                <Text style={styles.title}>Favoritos</Text>
                <FlatList
                    data={productos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id_producto.toString()}
                    numColumns={2} // Configura FlatList para que tenga dos columnas
                    columnWrapperStyle={styles.row} // Asegura que las columnas tengan espacio entre ellas
                    refreshing={refreshing}
                    onRefresh={onRefresh}
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
        flex: 1,
        margin: 10,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        alignItems: 'center',
    },
    cardButton: {
        flex: 0,
    },
    imagen: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    nombre: {
        color: '#333',
        fontWeight: '800',
        fontSize: 13,
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
        textAlign: 'right',
        flex: 1,
    },
    title: {
        fontSize: 26,
        marginTop: 80,
        textAlign: 'left',
        fontWeight: '800',
        color: '#F5853F',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    icono: {
        padding: 10,
    },
});
