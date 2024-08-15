import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen({ onAuthenticated }) {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            onAuthenticated(); 
            navigation.navigate('Головна'); 
        }, 4000); 

        return () => clearTimeout(timer);
    }, [navigation, onAuthenticated]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вітаємо!</Text>
            <Text style={styles.subtitle}>Ви успішно увійшли до облікового запису.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        marginTop: 10,
    },
});
