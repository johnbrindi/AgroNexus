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
        backgroundColor: AppColors.forestDeep,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.06)',
        height: 70, // Exact height from design if possible, else padding based
    },
    tab: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    activeLine: {
        position: 'absolute',
        top: 0,
        left: '22%',
        right: '22%',
        height: 2.5,
        backgroundColor: AppColors.forestLight,
        borderRadius: 2,
    },
    activeTabBg: {
        backgroundColor: 'rgba(245, 242, 238, 0.09)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 20,
        lineHeight: 20,
    },
    label: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: 'rgba(245, 242, 238, 0.4)',
        fontFamily: AppTypography.fontPrimaryBold,
        marginTop: 3,
    },
    activeLabel: {
        color: AppColors.txtOnDark,
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 'calc(50% - 18px)', // This might need adjustment for RN
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#EF5350',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: AppColors.forestDeep,
    },
    badgeText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
