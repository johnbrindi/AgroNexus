import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../styles/theme';
import { ArrowLeft } from 'lucide-react-native';

export default function SignUpScreen({ navigate }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate('landing')} style={styles.backButton}>
                <ArrowLeft size={24} color={AppColors.textDark} />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigate('signin')}>
                <Text style={styles.buttonText}>Already have an account? Sign In</Text>
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
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
    buttonText: {
        color: AppColors.primary,
        textAlign: 'center',
        fontSize: 16,
    }
});
