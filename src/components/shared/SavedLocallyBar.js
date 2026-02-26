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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        paddingHorizontal: 18,
        backgroundColor: AppColors.card,
        borderTopWidth: 1,
        borderColor: AppColors.border,
        width: '100%',
    },
    icon: {
        fontSize: 16,
    },
    text: {
        fontSize: 13,
        fontWeight: '700',
        color: AppColors.success,
        letterSpacing: 0.1,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
