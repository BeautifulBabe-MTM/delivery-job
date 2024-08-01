import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';

export default function ProfileScreen({ setIsAuthenticated }) {
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = new Animated.Value(0); 

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: modalVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [modalVisible]);

    const worker = {
        photo: require('./src/icons/user.png'),
        name: 'Виталик Филатов',
        role: 'Delivery Driver',
        categories: ['A', 'A1', 'B', 'T'],
        phone: '+380 99 129 00 29',
        email: 'esheivznak@gmail.com',
    };

    const handleEditPress = () => {
        console.log('кнопка редактировать была нажата');
    };

    const handleLogoutPress = () => {
        console.log('выхожу');
        setIsAuthenticated(false); 
    };

    return (
        <Animatable.View animation="fadeIn" style={styles.container}>
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
                <Image source={require('./src/icons/menu.png')} style={styles.menuIcon} />
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="none"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleEditPress}>
                            <Text style={styles.modalButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleLogoutPress}>
                            <Text style={styles.modalButtonText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={[styles.modalButtonText, styles.closeButton]}>Close</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
            <View style={styles.profileImageContainer}>
                <Image source={worker.photo} style={styles.profileImage} />
            </View>
            <Text style={styles.name}>{worker.name}</Text>
            <Text style={styles.info}>Role: {worker.role}</Text>
            <Text style={styles.info}>Phone: {worker.phone}</Text>
            <Text style={styles.info}>Email: {worker.email}</Text>
            <Text style={styles.info}>Categories:</Text>
            <View style={styles.categoriesContainer}>
                {worker.categories.map((category, index) => (
                    <Text key={index} style={styles.category}>{category}</Text>
                ))}
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profileImageContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    },
    category: {
        fontSize: 16,
        backgroundColor: '#f0f0f0',
        padding: 5,
        margin: 5,
        borderRadius: 5,
    },
    menuButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'transparent',
        padding: 10,
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalButton: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalButtonText: {
        fontSize: 18,
        color: '#007bff', 
        fontWeight: 'bold',
    },
    closeButton: {
        color: '#ff4d4d', 
        fontSize: 16,
    },
});
