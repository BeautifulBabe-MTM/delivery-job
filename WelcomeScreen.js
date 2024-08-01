import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen({ onAuthenticated }) {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            onAuthenticated(); 
            navigation.navigate('Home'); 
        }, 4000); 

        return () => clearTimeout(timer);
    }, [navigation, onAuthenticated]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>You have successfully logged in.</Text>
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
