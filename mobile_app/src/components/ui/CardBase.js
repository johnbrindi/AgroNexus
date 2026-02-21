import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppColors, AppSpacing, CommonStyles } from '../../styles/theme';

export const CardBase = ({ children, style, accentColor = 'forest' }) => {
    const getGradient = () => {
        switch (accentColor) {
            case 'amber': return [AppColors.amber, AppColors.gold];
            case 'clay': return [AppColors.clay, AppColors.clayLight];
            case 'slate': return [AppColors.slate, AppColors.slateLight];
            case 'danger': return [AppColors.danger, AppColors.dangerLight];
            default: return [AppColors.forest, AppColors.forestLight];
        }
    };

    const [c1, c2] = getGradient();

    return (
        <View style={[styles.card, CommonStyles.shadowSm, style]}>
            <View style={[styles.accentStripe, { backgroundColor: c1 }]} />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: AppColors.cream,
        borderRadius: AppSpacing.radius,
        borderWidth: 1,
        borderColor: AppColors.border,
        overflow: 'hidden',
    },
    accentStripe: {
        height: 3,
        width: '100%',
    },
    content: {
        padding: 0, // Individual components handle their internal padding
    },
});
