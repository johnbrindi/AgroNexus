import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';

export const StatusChip = ({ label, variant = 'green', icon }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'amber':
                return {
                    bg: 'rgba(216, 67, 21, 0.10)',
                    border: 'rgba(216, 67, 21, 0.25)',
                    txt: AppColors.amber
                };
            case 'slate':
                return {
                    bg: 'rgba(84, 110, 122, 0.12)',
                    border: 'rgba(84, 110, 122, 0.25)',
                    txt: AppColors.slate
                };
            case 'gold':
                return {
                    bg: 'rgba(249, 168, 37, 0.15)',
                    border: 'rgba(249, 168, 37, 0.35)',
                    txt: '#7B5000'
                };
            case 'danger':
                return {
                    bg: 'rgba(198, 40, 40, 0.10)',
                    border: 'rgba(198, 40, 40, 0.25)',
                    txt: AppColors.danger
                };
            default: // green
                return {
                    bg: 'rgba(45, 90, 39, 0.12)',
                    border: 'rgba(45, 90, 39, 0.25)',
                    txt: AppColors.forest
                };
        }
    };

    const { bg, border, txt } = getVariantStyles();

    return (
        <View style={[styles.container, { backgroundColor: bg, borderColor: border }]}>
            {icon}
            <Text style={[styles.text, { color: txt }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 20,
        borderWidth: 1,
    },
    text: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.4,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
