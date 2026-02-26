import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null); // 'farmer' | 'consumer' | null
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load auth state from storage on mount
        const loadAuthState = async () => {
            try {
                const storedAuth = await AsyncStorage.getItem('@AgroNexus:auth');
                const storedRole = await AsyncStorage.getItem('@AgroNexus:role');
                const storedUser = await AsyncStorage.getItem('@AgroNexus:user');

                if (storedAuth === 'true') {
                    setIsAuthenticated(true);
                    setUserRole(storedRole);
                    setUser(storedUser ? JSON.parse(storedUser) : null);
                }
            } catch (error) {
                console.error('Failed to load auth state:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAuthState();
    }, []);

    // Dummy API simulation for Sign In
    const signIn = async (email, password) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                // Simulating successful auth
                const mockUser = { id: '1', name: 'Jean Dupont', email };

                setIsAuthenticated(true);
                setUser(mockUser);

                await AsyncStorage.setItem('@AgroNexus:auth', 'true');
                await AsyncStorage.setItem('@AgroNexus:user', JSON.stringify(mockUser));

                resolve({ success: true, user: mockUser });
            }, 1500);
        });
    };

    // Dummy API simulation for Role Selection
    const selectRole = async (role) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                setUserRole(role);
                await AsyncStorage.setItem('@AgroNexus:role', role);
                resolve({ success: true, role });
            }, 1000);
        });
    };

    const logout = async () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);

        await AsyncStorage.multiRemove([
            '@AgroNexus:auth',
            '@AgroNexus:role',
            '@AgroNexus:user'
        ]);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userRole,
                user,
                isLoading,
                signIn,
                logout,
                selectRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
