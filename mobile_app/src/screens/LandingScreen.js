import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../styles/theme';
import { Leaf } from 'lucide-react-native';

export default function LandingScreen({ navigate }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoBadge}>
                        <Leaf size={40} color={AppColors.primary} strokeWidth={2.5} />
                    </View>
                    <Text style={styles.title}>AgroNexus</Text>
                </View>

                <Text style={styles.subtitle}>Smart Farming Made Simple</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigate('signup')}
                >
                    <Text style={styles.buttonText}>Get Started Free</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => navigate('signin')}
                >
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: AppColors.background,
    },
    content: {
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoBadge: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: AppColors.textDark,
    },
    subtitle: {
        fontSize: 18,
        color: AppColors.textGrey,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: AppColors.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 14,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: AppColors.primary,
    },
    secondaryButtonText: {
        color: AppColors.primary,
    },
});
