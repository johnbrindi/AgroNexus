import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';

export const StatusChip = ({ label, variant = 'ok', icon }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'warn':
                return {
                    bg: AppColors.warningBg,
                    border: AppColors.warningBorder,
                    txt: AppColors.warning
                };
            case 'crit':
                return {
                    bg: AppColors.dangerBg,
                    border: AppColors.dangerBorder,
                    txt: AppColors.danger
                };
            case 'neutral':
                return {
                    bg: AppColors.cardSecondary,
                    border: AppColors.borderStrong,
                    txt: AppColors.txtSecondary
                };
            default: // ok
                return {
                    bg: AppColors.successBg,
                    border: AppColors.successBorder,
                    txt: AppColors.success
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 13,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1.5,
    },
    text: {
        fontSize: 13,
        fontWeight: '800',
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
