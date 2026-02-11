import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../styles/theme';

export default function ProfileScreen({ navigate, onLogout }) {
    return (
        <View style={styles.container}>
            <Text>Profile Placeholder</Text>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
                <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: AppColors.primary,
        padding: 10,
        marginTop: 20,
        borderRadius: 8
    }
});
