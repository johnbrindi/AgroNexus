import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppColors } from './src/styles/theme';
// Context
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';

// Screens
import LandingScreen from './src/screens/LandingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import RoleSelectionScreen from './src/screens/Auth/RoleSelectionScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserLandingScreen from './src/screens/Dashboard/UserLandingScreen';
import DevicesScreen from './src/screens/DevicesScreen';
import AIDoctorScreen from './src/screens/AIDoctorScreen';
import AIDoctorChatScreen from './src/screens/AIDoctorChatScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  Manrope_900Black,
} from '@expo-google-fonts/manrope';
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
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [forceReady, setForceReady] = React.useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    Manrope_900Black,
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
    // Safety Force Ready Timer
    const timer = setTimeout(() => {
      console.log("SAFETY: Force ready triggered");
      setForceReady(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded || fontError || forceReady) {
          console.log(fontsLoaded ? "FONTS: Loaded" : "FONTS: Using fallback (error or timeout)");
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn("SPLASH: Error", e);
      }
    }
    prepare();
  }, [fontsLoaded, fontError, forceReady]);

  if (!fontsLoaded && !fontError && !forceReady) {
    return <View style={{ flex: 1, backgroundColor: AppColors.page }} />;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <SafeAreaProvider>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={AppColors.page} />
            <NavigationRouter />
          </View>
        </SafeAreaProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

const NavigationRouter = () => {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontFamily: 'Manrope_700Bold', color: AppColors.forest }}>Loading AgroNexus...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: AppColors.page }
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : !userRole ? (
          // Role Selection Stack (Gateway)
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        ) : userRole === 'farmer' ? (
          // Farmer Stack
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Devices" component={DevicesScreen} />
            <Stack.Screen name="AIDoctor" component={AIDoctorScreen} />
            <Stack.Screen name="AIDoctorChat" component={AIDoctorChatScreen} />
            <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          // Consumer Stack
          <>
            <Stack.Screen name="UserLanding" component={UserLandingScreen} />
            <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.page,
  },
});
