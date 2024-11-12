import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { getPaises } from '../../api/apiClient';

const Formulario = () => {
    const [paises, setPaises] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const options = paises.map((pais) => ({ label: pais.name.common, value: pais.cca2 }));

    const dias = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
    const meses = [
        { label: 'Enero', value: 1 },
        { label: 'Febrero', value: 2 },
        { label: 'Marzo', value: 3 },
        { label: 'Abril', value: 4 },
        { label: 'Mayo', value: 5 },
        { label: 'Junio', value: 6 },
        { label: 'Julio', value: 7 },
        { label: 'Agosto', value: 8 },
        { label: 'Septiembre', value: 9 },
        { label: 'Octubre', value: 10 },
        { label: 'Noviembre', value: 11 },
        { label: 'Diciembre', value: 12 },
    ];
    const anos = Array.from({ length: 100 }, (_, i) => ({ label: `${i + 1900}`, value: i + 1900 }));


    useEffect(() => {
        const obtenerPaises = async () => {
            const paises = await getPaises();
            setPaises(paises);
        };
        obtenerPaises();
    }, []);

    const validateForm = () => {
        if (name === '' || email === '' || selectedOption === null) {
            return false;
        }
        return true;
    };

    const guardarDatos = async () => {
        if (!validateForm()) {
            alert('Por favor, rellene todos los campos');
            return;
        }
        try {
            await AsyncStorage.setItem('user', JSON.stringify({ name, email, selectedOption }));
            console.log('Datos guardados correctamente');
        } catch (error) {
            console.log('Error al guardar datos:', error);
        }
    };

    const leerDatos = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            console.log(JSON.parse(user));
        } catch (error) {
            console.log('Error al leer datos:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.fechaContainer}>
                <Text style={styles.fechaLabel}>Fecha de nacimiento</Text>
                <View style={styles.fechaGroup}>
                    <Dropdown
                        label="Día"
                        data={dias}
                        onChange={(option) => setDia(option.value)}
                        value={dia}
                        placeholder="Seleccione el día"
                        style={styles.fechaDropdown}
                    />
                    <Dropdown
                        label="Mes"
                        data={meses}
                        onChange={(option) => setMes(option.value)}
                        value={mes}
                        placeholder="Seleccione el mes"
                        style={styles.fechaDropdown}
                    />
                    <Dropdown
                        label="Año"
                        data={anos}
                        onChange={(option) => setAno(option.value)}
                        value={ano}
                        placeholder="Seleccione el año"
                        style={styles.fechaDropdown}
                    />
                </View>
            </View>
            <Dropdown
                label="Select a country"
                data={options}
                onChange={(option) => setSelectedOption(option)}
                value={selectedOption}
                placeholder="Select a country"
                style={styles.dropdown}
                renderItem={(item) => (
                    <Text style={styles.dropdownText}>{item.label}</Text>
                )}
            >
                {selectedOption && (
                    <Text style={styles.dropdownSelectedItem}>{selectedOption.label}</Text>
                )}
            </Dropdown>
            <Pressable style={styles.button} onPress={guardarDatos}>
                <Text style={styles.textButton}>Guardar Datos</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={leerDatos}>
                <Text style={styles.textButton}>Leer datos</Text>
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
    input: {
        marginVertical: 4,
        height: 50,
        width: 250,
        borderWidth: 2,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#323446'
    },
    button: {
        padding: 10,
        backgroundColor: '#323446',
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#F0D262',
    },
    textButton: {
        color: 'white'
    },
    dropdown: {
        height: 40,
        width: 250,
        marginVertical: 4,
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: '#fff',
        borderColor: '#323446',
        color: 'blank'
    },
    dropdownText: {
        color: 'black',
    },
    fechaGroup: {
    }
});

export default Formulario;