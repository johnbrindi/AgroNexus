import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LandingColors, LandingSpacing } from '../constants';

export const GlassCard = ({ children, style }) => {
    return (
        <View style={[styles.glassCard, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        backgroundColor: LandingColors.glassWhite,
        borderRadius: LandingSpacing.cardRadius,
        borderWidth: 1,
        borderColor: LandingColors.glassBorder,
        padding: LandingSpacing.cardPadding,
        ...Platform.select({
            ios: {
                shadowColor: LandingColors.textPrimary,
                shadowOffset: { width: 0, height: 24 },
                shadowOpacity: 0.08,
                shadowRadius: 64,
            },
            android: {
                elevation: 8,
            },
            web: {
                backdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 24px 64px rgba(15, 23, 42, 0.08)',
            },
        }),
    },
});
