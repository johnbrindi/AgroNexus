import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppColors } from './src/styles/theme';

// Screens
import LandingScreen from './src/screens/LandingScreen';
import SignInScreen from './src/screens/Auth/SignInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import HomeScreen from './src/screens/Dashboard/HomeScreen';
import DevicesScreen from './src/screens/Devices/DevicesScreen';
import AIDoctorScreen from './src/screens/AIDoctor/AIDoctorScreen';
import AIDoctorChatScreen from './src/screens/AIDoctor/AIDoctorChatScreen';
import MarketplaceScreen from './src/screens/Marketplace/MarketplaceScreen';
import ProductDetailScreen from './src/screens/Marketplace/ProductDetailScreen';
import PaymentScreen from './src/screens/Marketplace/PaymentScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black
} from '@expo-google-fonts/roboto';
import {
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_700Bold
} from '@expo-google-fonts/roboto-mono';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={AppColors.background} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: AppColors.background }
            }}
          >
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Devices" component={DevicesScreen} />
            <Stack.Screen name="AIDoctor" component={AIDoctorScreen} />
            <Stack.Screen name="AIDoctorChat" component={AIDoctorChatScreen} />
            <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
});
