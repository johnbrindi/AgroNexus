import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors, AppTypography, CommonStyles } from '../../styles/theme';

export const DashboardHeader = ({ subtitle, title, initials = "AN" }) => {
    return (
        <View style={styles.header}>
            <View style={styles.topRow}>
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>{subtitle}</Text>
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
        backgroundColor: AppColors.forestDark,
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 14,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
    },
    subtitle: {
        fontSize: 11,
        color: AppColors.txtOnDark3,
        fontWeight: '500',
        letterSpacing: 0.4,
        fontFamily: AppTypography.fontPrimaryMedium,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 19,
        fontWeight: '900',
        color: AppColors.txtOnDark,
        letterSpacing: -0.3,
        marginTop: 2,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#795548', // Fallback, will ideally use gradient
        borderWidth: 2,
        borderColor: 'rgba(245, 242, 238, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 15,
        fontWeight: '900',
        color: AppColors.txtOnDark,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
});
