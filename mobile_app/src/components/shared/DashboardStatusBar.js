import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';

export const DashboardStatusBar = ({ isOnline = false }) => {
    return (
        <View style={styles.statusBar}>
            <Text style={styles.time}>09:41</Text>
            <View style={styles.rightContainer}>
                <View style={styles.savedPill}>
                    <View style={styles.goldDot} />
                    <Text style={styles.savedText}>SAVED</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: AppColors.forestDeep,
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: 15,
        fontWeight: '700',
        color: AppColors.txtOnDark,
        letterSpacing: 0.3,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    savedPill: {
        backgroundColor: 'rgba(249, 168, 37, 0.18)',
        borderWidth: 1,
        borderColor: 'rgba(249, 168, 37, 0.4)',
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    goldDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: AppColors.gold,
    },
    savedText: {
        fontSize: 9,
        fontWeight: '700',
        color: AppColors.gold,
        letterSpacing: 0.5,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
