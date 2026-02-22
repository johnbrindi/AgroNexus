import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors, AppTypography, CommonStyles } from '../../styles/theme';

export const DashboardHeader = ({ eyebrow, title, initials = "AN" }) => {
    return (
        <View style={styles.header}>
            <View style={styles.topRow}>
                <View style={styles.textContainer}>
                    <Text style={styles.eyebrow}>{eyebrow}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: AppColors.surface,
        paddingHorizontal: 22,
        paddingTop: 6,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderColor: AppColors.border,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    textContainer: {
        flex: 1,
    },
    eyebrow: {
        fontSize: 12,
        fontWeight: '700',
        color: AppColors.txtMuted,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: 3,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        letterSpacing: -0.5,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: AppColors.primaryWash,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.txtOnPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
});
