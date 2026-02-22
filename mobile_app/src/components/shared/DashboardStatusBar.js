import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';

export const DashboardStatusBar = ({ isOnline = false }) => {
    return (
        <View style={styles.statusBar}>
            <View style={styles.rightContainer}>
                {isOnline ? (
                    <View style={[styles.statusChip, styles.chipOnline]}>
                        <View style={[styles.dot, styles.dotOk]} />
                        <Text style={[styles.chipText, styles.txtOk]}>LIVE DATA</Text>
                    </View>
                ) : (
                    <View style={[styles.statusChip, styles.chipOffline]}>
                        <View style={[styles.dot, styles.dotWarn]} />
                        <Text style={[styles.chipText, styles.txtWarn]}>OFFLINE</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: AppColors.surface,
        paddingHorizontal: 26,
        paddingTop: 14,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align status chip to right
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    chipOffline: {
        backgroundColor: AppColors.warningBg,
        borderColor: AppColors.warningBorder,
    },
    chipOnline: {
        backgroundColor: AppColors.successBg,
        borderColor: AppColors.successBorder,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    dotWarn: { backgroundColor: AppColors.warning },
    dotOk: { backgroundColor: AppColors.success },
    chipText: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.3,
        fontFamily: AppTypography.fontPrimaryExtraBold || AppTypography.fontPrimaryBold,
    },
    txtWarn: { color: AppColors.warning },
    txtOk: { color: AppColors.success },
});
