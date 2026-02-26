import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppColors, AppTypography } from './src/styles/theme';
import {
  Home,
  Map,
  FileText,
  ShoppingCart,
  User as UserIcon,
  ShoppingBag
} from 'lucide-react-native';
// Context
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { CartProvider } from './src/context/CartContext';
import { ToastProvider } from './src/context/ToastContext';

// Screens
import LandingScreen from './src/screens/LandingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import RoleSelectionScreen from './src/screens/Auth/RoleSelectionScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserLandingScreen from './src/screens/Dashboard/UserLandingScreen';
import FarmsScreen from './src/screens/FarmsScreen';
import ReportScreen from './src/screens/ReportScreen';
import ReportChatScreen from './src/screens/ReportChatScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import ConsumerMarketScreen from './src/screens/ConsumerMarketScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import { FarmerProfileScreen, ConsumerProfileScreen } from './src/screens/Profile';
import CartScreen from './src/screens/CartScreen';
import SoilReportScreen from './src/screens/SoilReportScreen';
import FarmDetailsScreen from './src/screens/FarmDetailsScreen';
import ReportHistoryScreen from './src/screens/ReportHistoryScreen';

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
const Tab = createBottomTabNavigator();

const TabBarIcon = ({ Icon, color, size, focused }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Icon size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
  </View>
);

const FarmerTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: AppColors.primary,
      tabBarInactiveTintColor: AppColors.txtMuted,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabBarLabel,
      backBehavior: 'initialRoute',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: (props) => <TabBarIcon Icon={Home} {...props} />
      }}
    />
    <Tab.Screen
      name="Farms"
      component={FarmsScreen}
      options={{
        tabBarLabel: 'Farms',
        tabBarIcon: (props) => <TabBarIcon Icon={Map} {...props} />
      }}
    />
    <Tab.Screen
      name="Report"
      component={ReportScreen}
      options={{
        tabBarLabel: 'Report',
        tabBarIcon: (props) => <TabBarIcon Icon={FileText} {...props} />
      }}
    />
    <Tab.Screen
      name="Marketplace"
      component={MarketplaceScreen}
      options={{
        tabBarLabel: 'Market',
        tabBarIcon: (props) => <TabBarIcon Icon={ShoppingCart} {...props} />,
        tabBarBadge: 3,
        tabBarBadgeStyle: {
          backgroundColor: AppColors.primary,
          color: '#FFF',
          fontSize: 8,
          lineHeight: 14,
          minWidth: 14,
          height: 14,
          borderRadius: 7,
          textAlign: 'center',
          textAlignVertical: 'center',
          padding: 0,
        }
      }}
    />
    <Tab.Screen
      name="Profile"
      component={FarmerProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: (props) => <TabBarIcon Icon={UserIcon} {...props} />
      }}
    />
  </Tab.Navigator>
);

const ConsumerTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: AppColors.primary,
      tabBarInactiveTintColor: AppColors.txtMuted,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabBarLabel,
      backBehavior: 'initialRoute',
    }}
  >
    <Tab.Screen
      name="UserLanding"
      component={UserLandingScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: (props) => <TabBarIcon Icon={Home} {...props} />
      }}
    />
    <Tab.Screen
      name="Marketplace"
      component={ConsumerMarketScreen}
      options={{
        tabBarLabel: 'Market',
        tabBarIcon: (props) => <TabBarIcon Icon={ShoppingCart} {...props} />,
        tabBarBadge: 3,
        tabBarBadgeStyle: {
          backgroundColor: AppColors.primary,
          color: '#FFF',
          fontSize: 8,
          lineHeight: 14,
          minWidth: 14,
          height: 14,
          borderRadius: 7,
          textAlign: 'center',
          textAlignVertical: 'center',
          padding: 0,
        }
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarLabel: 'Cart',
        tabBarIcon: (props) => <TabBarIcon Icon={ShoppingBag} {...props} />
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ConsumerProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: (props) => <TabBarIcon Icon={UserIcon} {...props} />
      }}
    />
  </Tab.Navigator>
);

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
        <CartProvider>
          <ToastProvider>
            <SafeAreaProvider>
              <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={AppColors.page} />
                <NavigationRouter />
              </View>
            </SafeAreaProvider>
          </ToastProvider>
        </CartProvider>
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
            <Stack.Screen name="FarmerMain" component={FarmerTabs} />
            <Stack.Screen name="ReportChat" component={ReportChatScreen} />
            <Stack.Screen name="ReportHistory" component={ReportHistoryScreen} />
            <Stack.Screen name="SoilReport" component={SoilReportScreen} />
            <Stack.Screen name="FarmDetails" component={FarmDetailsScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
          </>
        ) : (
          // Consumer Stack
          <>
            <Stack.Screen name="ConsumerMain" component={ConsumerTabs} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
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
  tabBar: {
    backgroundColor: AppColors.card,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    marginTop: -5,
  },
});
