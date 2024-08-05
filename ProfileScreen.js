import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Animated, Alert, Platform, ActionSheetIOS } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen({ setIsAuthenticated }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(require('./src/icons/user.png'));
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const fadeAnim = new Animated.Value(0);

    // User data
    const worker = {
        name: 'Виталик Филатов',
        role: 'Delivery Driver',
        categories: ['A', 'A1', 'B', 'T'],
        phone: '+380 99 129 00 29',
        email: 'esheivznak@gmail.com',
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: modalVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [modalVisible]);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
        })();
    }, []);

    const handleEditPress = () => {
        setIsEditing(true);
        setModalVisible(false);
    };

    const handleSavePress = () => {
        setIsEditing(false);
        // Additional logic to save changes can be added here
    };

    const handleLogoutPress = () => {
        setIsAuthenticated(false);
    };

    const handleChoosePhoto = async () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take Photo', 'Choose from Library'],
                    cancelButtonIndex: 0,
                },
                async (buttonIndex) => {
                    if (buttonIndex === 1) {
                        await takePhoto();
                    } else if (buttonIndex === 2) {
                        await pickImage();
                    }
                }
            );
        } else {
            Alert.alert(
                'Choose Photo',
                '',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Take Photo', onPress: () => takePhoto() },
                    { text: 'Choose from Library', onPress: () => pickImage() },
                ]
            );
        }
    };

    const takePhoto = async () => {
        if (hasCameraPermission) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.cancelled) {
                setProfileImage({ uri: result.uri });
            }
        } else {
            Alert.alert('Camera Permission Required', 'Please enable camera permissions in settings.');
        }
    };

    const pickImage = async () => {
        if (hasMediaLibraryPermission) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.cancelled) {
                setProfileImage({ uri: result.uri });
            }
        } else {
            Alert.alert('Media Library Permission Required', 'Please enable media library permissions in settings.');
        }
    };

    return (
        <Animatable.View animation="fadeIn" style={styles.container}>
            <StatusBar style="auto" />
            {isEditing && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            )}
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
                <TouchableOpacity onPress={isEditing ? handleChoosePhoto : null}>
                    <Image source={profileImage} style={styles.profileImage} />
                </TouchableOpacity>
                {isEditing && (
                    <TouchableOpacity
                        style={styles.editIconContainer}
                        onPress={handleChoosePhoto}
                    >
                        <Icon name="edit" size={30} color="white" />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.name}>{worker.name}</Text>
            <View style={styles.infoContainer}>
                <Icon name="work" size={20} style={styles.icon} />
                <Text style={styles.info}>{worker.role}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Icon name="phone" size={20} style={styles.icon} />
                <Text style={styles.info}>{worker.phone}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Icon name="email" size={20} style={styles.icon} />
                <Text style={styles.info}>{worker.email}</Text>
            </View>
            <Text style={styles.categoriesTitle}>Categories:</Text>
            <View style={styles.categoriesContainer}>
                {worker.categories.map((category, index) => (
                    <View key={index} style={styles.categoryContainer}>
                        <Text style={styles.category}>{category}</Text>
                    </View>
                ))}
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF4F6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profileImageContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#dbdbdb',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#00000080',
        borderRadius: 15,
        padding: 5,
    },
    saveButton: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 15,
        padding: 10,
        zIndex: 1,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuButton: {
        position: 'absolute',
        top: 30,
        left: 20,
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    info: {
        fontSize: 18,
        marginLeft: 10,
    },
    icon: {
        color: '#000',
    },
    categoriesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    categoryContainer: {
        backgroundColor: '#4CAF50',
        borderRadius: 15,
        padding: 10,
        margin: 5,
    },
    category: {
        color: 'white',
        fontSize: 16,
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalButton: {
        padding: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 18,
    },
    closeButton: {
        color: 'red',
    },
});
