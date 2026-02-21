import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';

export const StandardButton = ({
    title,
    onPress,
    variant = 'primary',
    size = 'large',
    icon,
    style
}) => {
    const getStyles = () => {
        let btnStyle = styles.btnPrimary;
        let txtStyle = styles.txtOnDark;

        if (variant === 'secondary') {
            btnStyle = styles.btnSecondary;
            txtStyle = styles.txtPrimary;
        } else if (variant === 'danger') {
            btnStyle = styles.btnDanger;
            txtStyle = styles.txtWhite;
        }

        if (size === 'small') {
            btnStyle = { ...btnStyle, minHeight: 40 };
            txtStyle = { ...txtStyle, fontSize: 12 };
        }

        return { btnStyle, txtStyle };
    };

    const { btnStyle, txtStyle } = getStyles();

    return (
        <TouchableOpacity
            style={[styles.base, btnStyle, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {icon}
            <Text style={[styles.textBase, txtStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        minHeight: 48,
        borderRadius: AppSpacing.radiusSm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 16,
    },
    textBase: {
        fontWeight: '700',
        letterSpacing: 0.3,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    btnPrimary: {
        backgroundColor: AppColors.forest,
    },
    btnSecondary: {
        backgroundColor: AppColors.offwhiteWarm,
        borderWidth: 1.5,
        borderColor: AppColors.borderStrong,
    },
    btnDanger: {
        backgroundColor: AppColors.danger,
    },
    txtOnDark: {
        color: AppColors.txtOnDark,
        fontSize: 14,
    },
    txtPrimary: {
        color: AppColors.txtPrimary,
        fontSize: 13,
    },
    txtWhite: {
        color: '#FFFFFF',
        fontSize: 13,
    },
});
