import React, { useState, useEffect } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import * as ScreenOrientation from 'expo-screen-orientation';

import HomeScreen from './HomeScreen';
import DeliveriesScreen from './DeliveriesScreen';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import WelcomeScreen from './WelcomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = ({ onAuthenticated }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login">
      {(props) => <LoginScreen {...props} onAuthenticated={onAuthenticated} />}
    </Stack.Screen>
    <Stack.Screen name="Register">
      {(props) => <RegisterScreen {...props} onAuthenticated={onAuthenticated} />}
    </Stack.Screen>
    <Stack.Screen name="Welcome">
      {(props) => <WelcomeScreen {...props} onAuthenticated={onAuthenticated} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const MainStack = ({ setIsAuthenticated }) => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconPath;

          if (route.name === 'Головна') {
            iconPath = require('./src/icons/home.png');
          } else if (route.name === 'Замовлення') {
            iconPath = require('./src/icons/deliveries.png');
          } else if (route.name === 'Профіль') {
            iconPath = require('./src/icons/user.png');
          }

          return (
            <Animatable.Image
              animation="bounceIn"
              duration={1000}
              source={iconPath}
              style={[styles.icon, { width: size, height: size, tintColor: color }]}
            />
          );
        },
        tabBarActiveTintColor: colorScheme === 'dark' ? '#ff6f61' : '#ff6f61',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#888' : '#888',
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: colorScheme === 'dark' ? '#333' : '#EBF4F6', borderTopColor: colorScheme === 'dark' ? '#333' : '#EBF4F6' }
        ],
        headerStyle: [
          styles.header,
          { backgroundColor: colorScheme === 'dark' ? '#27374d' : '#f0f0f0', borderBottomColor: colorScheme === 'dark' ? '#27374D' : '#f0f0f0' }
        ],
        headerTitleStyle: [
          styles.headerTitle,
          { color: colorScheme === 'dark' ? '#fff' : '#000' }
        ],
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen name="Головна" component={HomeScreen} />
      <Tab.Screen name="Замовлення" component={DeliveriesScreen} />
      <Tab.Screen name="Профіль">
        {(props) => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const colorScheme = useColorScheme();

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
    lockOrientation();
  }, []);

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {isAuthenticated ? <MainStack setIsAuthenticated={setIsAuthenticated} /> : <AuthStack onAuthenticated={handleAuthentication} />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
  tabBar: {
    borderTopWidth: 1,
    paddingBottom: 35,
    height: 90,
    paddingVertical: 5,
  },
  header: {
    height: 80,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
});
