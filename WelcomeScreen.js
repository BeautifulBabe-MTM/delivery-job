import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen({ onAuthenticated }) {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            onAuthenticated(); // Обновляем состояние авторизации
            navigation.navigate('Home'); // Перенаправляем на главный экран
        }, 4000); // 4 секунды ожидания

        // Очищаем таймер при размонтировании компонента
        return () => clearTimeout(timer);
    }, [navigation, onAuthenticated]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>You have successfully logged in or registered.</Text>
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
