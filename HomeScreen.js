import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import SwipeButton from 'rn-swipe-button';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const [isActivated, setIsActivated] = useState(false);
  const colorScheme = useColorScheme();

  const handleSwipeSuccess = () => {
    setIsActivated(prevState => !prevState);
    //логика для включения/выключения смены
  };

  const isDarkTheme = colorScheme === 'dark';

  return (
    <Animatable.View animation="fadeIn" style={[styles.container, isDarkTheme && styles.containerDark]}>

      <SwipeButtonComponent
        isActivated={isActivated}
        onSwipeSuccess={handleSwipeSuccess}
        isDarkTheme={isDarkTheme}
      />

      <View style={[styles.infoContainer, isDarkTheme && styles.infoContainerDark]}>
        <Text style={[styles.infoTitle, isDarkTheme && styles.textDark]}>Заробіток за сьогодні:</Text>
        <Text style={[styles.infoValue, isDarkTheme && styles.textHighlightDark]}>₴ 4398.90</Text>
      </View>

      <View style={[styles.infoContainer, isDarkTheme && styles.infoContainerDark]}>
        <Text style={[styles.infoTitle, isDarkTheme && styles.textDark]}>Оцінка активності:</Text>
        <Text style={[styles.infoValue, isDarkTheme && styles.textHighlightDark]}>100%</Text>
      </View>

      <View style={[styles.infoContainer, isDarkTheme && styles.infoContainerDark]}>
        <Text style={[styles.infoTitle, isDarkTheme && styles.textDark]}>Поточний рейтинг:</Text>
        <Text style={[styles.infoValue, isDarkTheme && styles.textHighlightDark]}>4.8 / 5.0</Text>
      </View>

      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
    </Animatable.View>
  );
}

const SwipeButtonComponent = ({
  isActivated,
  onSwipeSuccess,
  isDarkTheme,
}) => {
  return (
    <SwipeButton
      swipeSuccessThreshold={70}
      height={60}
      width="80%"
      title={isActivated ? "Зняти з лінії" : "На лінію"}
      onSwipeSuccess={onSwipeSuccess}
      railBackgroundColor={isDarkTheme ? "#333" : "#EBF4F6"}
      railBorderColor={isDarkTheme ? "#fff" : "#27374d"}
      thumbIconBackgroundColor={isActivated ? "#ff6f61" : "#4CAF50"}
      thumbIconComponent={() => <FontAwesome name="car" size={24} color="white" />}
      shouldResetAfterSuccess={true}
      titleStyles={StyleSheet.flatten([styles.swipeText, isDarkTheme ? styles.textDark : styles.textLight])}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF4F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  swipeText: {
    fontWeight: 'bold',
  },
  textLight: {
    color: '#27374d', // цвет текста для светлой темы
  },
  textDark: {
    color: '#fff', // цвет текста для тёмной темы
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderColor: '#27374d',
    borderWidth: 1,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  infoContainerDark: {
    backgroundColor: '#333',
    borderColor: '#fff',
  },
  infoTitle: {
    fontSize: 16,
    color: '#27374d',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6f61',
    marginTop: 10,
  },
  textHighlightDark: {
    color: '#ff6f61',
  },
});
