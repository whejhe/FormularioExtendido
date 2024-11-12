import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Perfil = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pagina de Perfil</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8087F0',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    text:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
    
});

export default Perfil;