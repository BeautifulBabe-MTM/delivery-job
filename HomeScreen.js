import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';

export default function HomeScreen() {
  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <Text>Home Screen</Text>
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
});
