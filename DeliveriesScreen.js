import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
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
        console.log('No routes found');
        Alert.alert('No routes found');
      }
    } catch (error) {
      console.error('Error fetching directions', error);
      Alert.alert('Error fetching directions');
    }
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
      <StatusBar style="auto" />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
