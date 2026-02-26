import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LandingColors, LandingSpacing } from '../constants';

export const Button = ({ title, onPress, variant = 'primary', style }) => {
    const isPrimary = variant === 'primary';
    const isYellow = variant === 'yellow';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isPrimary && styles.primary,
                isYellow && styles.yellow,
                variant === 'outline' && styles.outline,
                style
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.text,
                (isPrimary || isYellow) ? styles.textWhite : styles.textDark
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: LandingSpacing.buttonRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: LandingColors.leafGreen,
    },
    yellow: {
        backgroundColor: LandingColors.sunshineYellow,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: LandingColors.deepSlate,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
    },
    textWhite: {
        color: '#FFFFFF',
    },
    textDark: {
        color: LandingColors.textPrimary,
    },
});
