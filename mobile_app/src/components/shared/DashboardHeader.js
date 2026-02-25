import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MoreVertical } from 'lucide-react-native';
import { AppColors, AppTypography } from '../../styles/theme';

export const DashboardHeader = ({ title, isOnline = true }) => {
    return (
        <View style={styles.header}>
            {/* Title */}
            <Text style={styles.title} numberOfLines={1}>{title}</Text>

            {/* Live data chip */}
            <View style={[styles.statusChip, isOnline ? styles.chipOnline : styles.chipOffline]}>
                <View style={[styles.dot, isOnline ? styles.dotOk : styles.dotWarn]} />
                <Text style={[styles.chipText, isOnline ? styles.txtOk : styles.txtWarn]}>
                    {isOnline ? 'LIVE DATA' : 'OFFLINE'}
                </Text>
            </View>

            {/* 3-pin menu */}
            <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => {
                    // fill use this later
                }}
            >
                <MoreVertical size={24} color={AppColors.txtPrimary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: AppColors.surface,
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: AppColors.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        flex: 1,
        fontSize: 23,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        letterSpacing: -0.5,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    statusChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
    },
    chipOnline: {
        backgroundColor: AppColors.successBg,
        borderColor: AppColors.successBorder,
    },
    chipOffline: {
        backgroundColor: AppColors.warningBg,
        borderColor: AppColors.warningBorder,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    dotOk: { backgroundColor: AppColors.success },
    dotWarn: { backgroundColor: AppColors.warning },
    chipText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.3,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    txtOk: { color: AppColors.success },
    txtWarn: { color: AppColors.warning },
    menuIcon: {
        padding: 4,
    },
});
