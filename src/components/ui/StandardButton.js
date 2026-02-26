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
        let txtStyle = styles.txtOnGreen;

        if (variant === 'secondary') {
            btnStyle = styles.btnSecondary;
            txtStyle = styles.txtPrimary;
        } else if (variant === 'danger') {
            btnStyle = styles.btnDanger;
            txtStyle = styles.txtWhite;
        } else if (variant === 'white') {
            btnStyle = styles.btnWhite;
            txtStyle = styles.txtGreen;
        }

        if (size === 'small') {
            btnStyle = { ...btnStyle, minHeight: 48 }; // btn-sm in brief
            txtStyle = { ...txtStyle, fontSize: 14 };
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
        minHeight: 52,
        borderRadius: AppSpacing.radiusSm, // r12
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 20,
        width: '100%',
    },
    textBase: {
        fontWeight: '800',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    btnPrimary: {
        backgroundColor: AppColors.primary,
    },
    btnSecondary: {
        backgroundColor: AppColors.cardSecondary,
        borderWidth: 1.5,
        borderColor: AppColors.borderStrong,
    },
    btnDanger: {
        backgroundColor: AppColors.danger,
    },
    btnWhite: {
        backgroundColor: AppColors.card,
        borderWidth: 2,
        borderColor: AppColors.primarySubtle,
    },
    txtOnGreen: {
        color: AppColors.txtOnPrimary,
        fontSize: 16,
    },
    txtPrimary: {
        color: AppColors.txtPrimary,
        fontSize: 16,
    },
    txtGreen: {
        color: AppColors.primary,
        fontSize: 16,
    },
    txtWhite: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
