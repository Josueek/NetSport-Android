import React, { useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
// Componente para utilizar el carousel
import Slides from '../data/Slides';
import OnBoardingItem from '../components/OnBoardingItem';
//Componente button
import Buttons from '../components/buttons/Buttons';

import { useNavigation } from '@react-navigation/native';

const BienvenidaScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    //Navegabilidad
    const navigation = useNavigation();
    const IniciarSesion = () =>{
        navigation.navigate('LoginScreen');
    }
    const Registrarme = () =>{
        navigation.navigate('RegistroScreen');
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
                    accionBoton={Registrarme}/>
                </View>
                <View style={styles.buttonWrapper}>
                    <Buttons 
                    color={"Gris"}
                    textoBoton={"Iniciar Sesión"}
                    accionBoton={IniciarSesion}/>
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
        bottom: '10%', // Ajusta este valor según necesites
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonWrapper: {
        marginHorizontal: 10, // Ajusta este valor para controlar el espacio entre los botones
    },
});

export default BienvenidaScreen;
