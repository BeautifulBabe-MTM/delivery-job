import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, useColorScheme, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const colorScheme = useColorScheme();

    const handleRegister = async () => {
        if (password === confirmPassword) {
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        phoneNumber,
                        name,
                        surname,
                        password
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    Alert.alert('Успіх ✔️', result.message);
                    navigation.navigate('Welcome');
                } else {
                    Alert.alert('Помилка 🚫', result.message || 'Невдала реєстрація');
                }
            } catch (error) {
                Alert.alert('Помилка 🚫', `Невдала спроба під'єднатися до серверу`);
            }

            navigation.navigate('Welcome');
        } else {
            alert('Passwords do not match');
        }
    };

    const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Реєстрація</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
                />
                 <TextInput
                    style={styles.input}
                    placeholder="Номер телефону"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ваше ім'я"
                    value={name}
                    onChangeText={setName}
                    keyboardType="default"
                    autoCapitalize="words"
                    placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ваше прізвище"
                    value={surname}
                    onChangeText={setSurname}
                    keyboardType="default"
                    autoCapitalize="words"
                    placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Повторіть пароль"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Вже є обліковий запис? Увійдіть</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        padding: 20,
    },
    form: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 45,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        alignItems: 'center',
        marginTop: 10,
    },
    linkText: {
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        padding: 20,
    },
    form: {
        backgroundColor: '#1f1f1f',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 45,
        borderColor: '#444444',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#333333',
    },
    button: {
        backgroundColor: '#1e88e5',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        alignItems: 'center',
        marginTop: 10,
    },
    linkText: {
        color: '#1e88e5',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
