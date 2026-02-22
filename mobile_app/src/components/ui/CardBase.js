import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppColors, AppSpacing, CommonStyles } from '../../styles/theme';

export const CardBase = ({ children, style, accentColor }) => {
    return (
        <View style={[styles.card, CommonStyles.shadowSm, style]}>
            {accentColor && (
                <View style={[styles.accentStripe, { backgroundColor: AppColors[accentColor] || AppColors.primary }]} />
            )}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: AppColors.card,
        borderRadius: AppSpacing.radiusMd, // r16
        borderWidth: 1,
        borderColor: AppColors.border,
        overflow: 'hidden',
    },
    accentStripe: {
        height: 4,
        width: '100%',
    },
    content: {
        padding: 0,
    },
});
