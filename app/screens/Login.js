import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Pressable, Image } from 'react-native';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        setLoading(true);
        try {
            const storedUser = await AsyncStorage.getItem('user');
            const storedUserJson = JSON.parse(storedUser);
            if (storedUserJson.email === email && storedUserJson.password === password) {
                setUser(storedUserJson);
                alert('Sign in successful');
            } else {
                alert('Sign in failed: incorrect email or password');
            }
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        }
        setLoading(false);
    };

    const signUp = async () => {
        setLoading(true);
        try {
            alert('Sign up successful, check your email for verification');
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/login.png')} />

            <KeyboardAvoidingView behavior='padding'>
                <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='password' autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}></TextInput>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Pressable style={styles.button} onPress={signIn}>
                            <Text style={styles.text}>Login</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={signUp}>
                            <Text style={styles.text}>Create Account</Text>
                        </Pressable>
                    </>
                )}
            </KeyboardAvoidingView>
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
    text: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 50,
    }

});

export default Login;
