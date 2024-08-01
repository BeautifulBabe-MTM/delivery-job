import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

const MainStack = ({ setIsAuthenticated }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconPath;

        if (route.name === 'Home') {
          iconPath = require('./src/icons/home.png');
        } else if (route.name === 'Deliveries') {
          iconPath = require('./src/icons/deliveries.png');
        } else if (route.name === 'Profile') {
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
      tabBarActiveTintColor: '#ff6f61',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: styles.tabBar,
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerTitleAlign: 'center',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Deliveries" component={DeliveriesScreen} />
    <Tab.Screen name="Profile">
      {(props) => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <NavigationContainer>
      <StatusBar style="dark" />
      {isAuthenticated ? <MainStack setIsAuthenticated={setIsAuthenticated} /> : <AuthStack onAuthenticated={handleAuthentication} />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
  tabBar: {
    backgroundColor: '#fff5e1',
    borderTopColor: '#e6e6fa',
    borderTopWidth: 1,
    paddingBottom: 35,
    height: 90,
    paddingVertical: 5,
  },
  header: {
    backgroundColor: '#a89ca9',
    height: 80,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
