import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';

export const DashboardBottomNav = ({ activeTab = 'HOME', navigation }) => {
    const tabs = [
        { id: 'HOME', label: 'HOME', icon: '🏡', route: 'Home' },
        { id: 'DEVICES', label: 'DEVICES', icon: '📡', route: 'Devices', badge: '2' },
        { id: 'AI_DOC', label: 'AI DOC', icon: '🔬', route: 'AIDoctor' },
        { id: 'MARKET', label: 'MARKET', icon: '🛒', route: 'Marketplace' },
        { id: 'PROFILE', label: 'PROFILE', icon: '👤', route: 'Profile' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tab}
                        onPress={() => navigation && navigation.navigate(tab.route)}
                        activeOpacity={0.7}
                    >
                        {isActive && <View style={styles.activeLine} />}
                        <View style={isActive ? styles.activeTabBg : null}>
                            <Text style={styles.icon}>{tab.icon}</Text>
                            <Text style={[styles.label, isActive && styles.activeLabel]}>
                                {tab.label}
                            </Text>
                        </View>
                        {tab.badge && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{tab.badge}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.card,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: AppColors.border,
        minHeight: 60,
        paddingBottom: 12, // For safe area
    },
    tab: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    activeLine: {
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: 3,
        backgroundColor: AppColors.primary,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    activeTabBg: {
        // No background tint in v3 for the tab itself, just the line and text color
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 22,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: AppColors.txtMuted,
        letterSpacing: 0.2,
        fontFamily: AppTypography.fontPrimaryBold,
        marginTop: 3,
    },
    activeLabel: {
        color: AppColors.primary,
        fontWeight: '900',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: '20%',
        minWidth: 17,
        height: 17,
        borderRadius: 9,
        backgroundColor: AppColors.danger,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: AppColors.card,
        paddingHorizontal: 3,
    },
    badgeText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#FFFFFF',
        fontFamily: AppTypography.fontPrimaryExtraBold,
    },
});
