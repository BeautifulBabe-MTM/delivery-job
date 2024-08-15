import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Modal, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function DeliveriesScreen() {
  const [region, setRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [clientLocation, setClientLocation] = useState({
    latitude: 48.4846,
    longitude: 34.9306,
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [orderInfo, setOrderInfo] = useState({
    id: '123',
    clientName: 'Денис Микрошниченко',
    address: 'Вокзальна площа 12',
    details: 'Доставка на машине до 20 тонн',
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Разрешения на локацию были отклонены');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });

      getRouteDirections(latitude, longitude, clientLocation.latitude, clientLocation.longitude);
    })();
  }, []);

  const getRouteDirections = async (startLat, startLng, destLat, destLng) => {
    try {
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248f181bcf71af54009b9573ba6a13e559c&start=${startLng},${startLat}&end=${destLng},${destLat}`
      );
      const json = await response.json();
      console.log('API response:', json);

      if (json.features && json.features.length > 0) {
        const encodedPolyline = json.features[0].geometry.coordinates;
        const routeCoordinates = encodedPolyline.map(coord => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        setRouteCoordinates(routeCoordinates);
      } else {
        console.log('Ни одного маршрута не найдено');
        Alert.alert('No routes found');
      }
    } catch (error) {
      console.error('Ошибка при получении маршрутов', error);
      Alert.alert('Error fetching directions');
    }
  };

  const handleAddNote = () => {
    Alert.alert('Add Note');
  };

  const handleUpdateLocation = () => {
    if (currentLocation) {
      setRegion({
        ...region,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
      Alert.alert('Location Updated');
    }
  };

  const handleAcceptOrder = () => {
    setModalVisible(false);
    Alert.alert('Order Accepted');
  };

  const handleCancelOrder = () => {
    setModalVisible(false);
    Alert.alert('Order Cancelled');
  };

  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          followsUserLocation
        >
          <Marker coordinate={clientLocation} title="Client Location" />
          {currentLocation && routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#1E90FF"
              strokeWidth={5}
            />
          )}
        </MapView>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Замовлення №{orderInfo.id}</Text>
            <Text style={styles.modalText}>Клієнт: {orderInfo.clientName}</Text>
            <Text style={styles.modalText}>Адреса: {orderInfo.address}</Text>
            <Text style={styles.modalText}>Деталі: {orderInfo.details}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancelOrder}>
                <Text style={styles.modalButtonText}>Відмовитись</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.acceptButton]} onPress={handleAcceptOrder}>
                <Text style={styles.modalButtonText}>Прийняти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: '#4caf50',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
