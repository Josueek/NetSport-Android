import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Animated, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Componente para utilizar el carousel
import Slides from '../data/Slides';
import OnBoardingItem from '../components/OnBoardingItem';
// Componente button
import Buttons from '../components/buttons/Buttons';

const BienvenidaScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    // Navegabilidad
    const navigation = useNavigation();

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const IniciarSesion = () => {
        navigation.navigate('LoginScreen');
    };

    const Registrarme = () => {
        navigation.navigate('RegistroScreen');
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const user_id = await AsyncStorage.getItem('user_id');
                if (user_id) {
                    // Si hay un user_id, redirigir a la pantalla de inicio
                    navigation.replace('TabNavigator'); // Replace evita que el usuario vuelva a la pantalla de bienvenida con el botón de retroceso
                }
            } catch (error) {
                console.error('Error al verificar la sesión:', error);
            } finally {
                setLoading(false); // Deja de mostrar el indicador de carga
            }
        };

        checkSession();
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#F5853F" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={Slides}
                    renderItem={({ item }) => <OnBoardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Buttons
                        color={"Naranja"}
                        textoBoton={"Registrarme"}
                        accionBoton={Registrarme}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Buttons
                        color={"Gris"}
                        textoBoton={"Iniciar Sesión"}
                        accionBoton={IniciarSesion}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonWrapper: {
        marginHorizontal: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default BienvenidaScreen;
