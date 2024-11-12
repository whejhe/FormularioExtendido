import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

const List = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/luna.png')} />
            <Text style={styles.title}>List</Text>
            
            <Pressable style={styles.button} onPress={() => navigation.navigate('Details')}>
                <Text style={styles.text}>Ver detalles</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => navigation.navigate('Perfil')}>
                <Text style={styles.text}>Ver Perfil</Text>
            </Pressable>

            <Pressable style={styles.button}>
                <Text style={styles.text}>Logout</Text>
            </Pressable>
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
    button:{
        padding: 10,
        backgroundColor: '#323446',
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#F0D262',
        width: 250
    },
    text:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    title:{
        color: '#fff',
        fontFamily: 'monospace',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 10
    },
    image:{
        width: 100,
        height: 100,
        resizeMode: 'contain',
        backgroundColor: '#323446',
        borderRadius: 50,
        padding: 10
    }
    
});

export default List;