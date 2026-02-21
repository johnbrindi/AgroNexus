import React, { useState } from 'react';
import { View, StyleSheet,StatusBar, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from './src/styles/theme';

// Screens
import LandingScreen from './src/screens/LandingScreen';
import SignInScreen from './src/screens/Auth/SignInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import HomeScreen from './src/screens/Dashboard/HomeScreen';
import DevicesScreen from './src/screens/Devices/DevicesScreen';
import AIDoctorScreen from './src/screens/AIDoctor/AIDoctorScreen';
import MarketplaceScreen from './src/screens/Marketplace/MarketplaceScreen';
import ProductDetailScreen from './src/screens/Marketplace/ProductDetailScreen';
import PaymentScreen from './src/screens/Marketplace/PaymentScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = (screen, data = null) => {
    setCurrentScreen(screen);
    if (data) {
      if (screen === 'product-detail' || screen === 'payment') {
        setSelectedProduct(data);
      }
    }
  };

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
    navigate('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    navigate('landing');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen navigate={navigate} />;
      case 'signin':
        return <SignInScreen navigate={navigate} onLogin={handleLogin} />;
      case 'signup':
        return <SignUpScreen navigate={navigate} />;
      case 'home':
        return <HomeScreen navigate={navigate} userData={userData} />;
      case 'devices':
        return <DevicesScreen navigate={navigate} />;
      case 'ai-doctor':
        return <AIDoctorScreen navigate={navigate} />;
      case 'marketplace':
        return <MarketplaceScreen navigate={navigate} />;
      case 'product-detail':
        return <ProductDetailScreen navigate={navigate} product={selectedProduct} />;
      case 'payment':
        return <PaymentScreen navigate={navigate} product={selectedProduct} />;
      case 'profile':
        return <ProfileScreen navigate={navigate} userData={userData} onLogout={handleLogout} />;
      default:
        return <LandingScreen navigate={navigate} />;
    }
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={AppColors.background} />
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    flex: 1,
  },
});
