import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AppColors } from '../../styles/theme';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

export default function SignInScreen({ navigate, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // Mock login
        const user = {
            name: 'Jean Dupont',
            email: email,
        };
        onLogin(user);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate('landing')} style={styles.backButton}>
                <ArrowLeft size={24} color={AppColors.textDark} />
            </TouchableOpacity>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.inputContainer}>
                <Mail size={20} color={AppColors.textGrey} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Lock size={20} color={AppColors.textGrey} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <EyeOff size={20} color={AppColors.textGrey} />
                    ) : (
                        <Eye size={20} color={AppColors.textGrey} />
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: AppColors.background,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: AppColors.textDark,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: AppColors.textGrey,
        marginBottom: 32,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: AppColors.textDark,
    },
    button: {
        backgroundColor: AppColors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
