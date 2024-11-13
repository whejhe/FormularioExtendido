// app/screens/Register.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as yup from 'yup';
import { Formik } from 'formik';
import { getPaises } from '../../api/apiClient';
import { useNavigation } from '@react-navigation/native';

const Formulario = () => {

    const navigation = useNavigation();

    const [paises, setPaises] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

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
    const anos = Array.from({ length: 100 }, (_, i) => ({ label: `${i + 1940}`, value: i + 1940 }));


    useEffect(() => {
        const obtenerPaises = async () => {
            const paises = await getPaises();
            setPaises(paises);
        };
        obtenerPaises();
    }, []);

    const schema = yup.object().shape({
        username: yup.string().required('Nombre de usuario es requerido'),
        email: yup.string().email('Email no válido').required('Email es requerido'),
        password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
    });

    const guardarDatos = async () => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify({ name, email, password, selectedOption }));
            alert('Registro exitoso. Ahora puede iniciar sesión.');
            navigation.navigate('Login');
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
        <Formik
            initialValues={{ name: '', email: '', password: '', selectedOption: '' }}
            validationSchema={schema}
            onSubmit={(values) => {
                guardarDatos();
            }}
        >
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
                            placeholder="Día"
                            style={styles.fechaDropdown}
                            renderItem={(item) => (
                                <Text style={styles.dropdownText}>{item.label}</Text>
                            )}
                        />
                        <Dropdown
                            label="Mes"
                            data={meses}
                            onChange={(option) => setMes(option.value)}
                            value={mes}
                            placeholder="Mes"
                            style={styles.fechaDropdown}
                            renderItem={(item) => (
                                <Text style={styles.dropdownText}>{item.label}</Text>
                            )}
                        />
                        <Dropdown
                            label="Año"
                            data={anos}
                            onChange={(option) => setAno(option.value)}
                            value={ano}
                            placeholder="Año"
                            style={styles.fechaDropdown}
                            renderItem={(item) => (
                                <Text style={styles.dropdownText}>{item.label}</Text>
                            )}
                        />
                    </View>
                </View>
                <Text style={styles.paisLabel}>Pais</Text>
                <Dropdown
                    label="Select a country"
                    data={options}
                    onChange={(option) => setSelectedOption(option)}
                    value={selectedOption}
                    placeholder="Select a country"
                    style={styles.dropdownPaises}
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
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginVertical: 8,
        height: 50,
        width: '90%',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#B0BEC5',
        fontSize: 16,
        color: '#37474F',
    },
    button: {
        padding: 12,
        backgroundColor: '#546E7A',
        borderRadius: 8,
        marginVertical: 8,
        width: '90%',
        alignItems: 'center',
    },
    textButton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdown: {
        marginVertical: 8,
        height: 50,
        width: '90%',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        borderColor: '#B0BEC5',
    },
    dropdownPaises:{
        marginTop: 0,
        marginBottom: 8,
        height: 50,
        width: '90%',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        borderColor: '#B0BEC5',
    },
    fechaGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    fechaDropdown: {
        width: '30%',
    },
    dropdownText: {
        color: '#37474F',
        fontSize: 16,
    },
    fechaLabel: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 16,
        color: '#546E7A',
        marginTop: 20
    },
    paisLabel: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 16,
        color: '#546E7A',
        paddingLeft: 20,
        marginTop: 20
    }
});


export default Formulario;