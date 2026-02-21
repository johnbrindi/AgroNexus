import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';

export const SavedLocallyBar = ({ message = "All data saved locally" }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>💾</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        backgroundColor: 'rgba(249, 168, 37, 0.10)',
        borderWidth: 1,
        borderColor: 'rgba(249, 168, 37, 0.22)',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 14,
        marginBottom: 10,
    },
    icon: {
        fontSize: 14,
    },
    text: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B4F00',
        letterSpacing: 0.3,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
