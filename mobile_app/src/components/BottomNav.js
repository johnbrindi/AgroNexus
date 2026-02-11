import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Bluetooth, Leaf, ShoppingBag } from 'lucide-react-native';
import { AppColors } from '../styles/theme';

export default function BottomNav({ navigate, active }) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'devices', icon: Bluetooth, label: 'Devices' },
        { id: 'ai-doctor', icon: Leaf, label: 'AI Doctor' },
        { id: 'marketplace', icon: ShoppingBag, label: 'Market' }
    ];

    return (
        <View style={styles.bottomNav}>
            {navItems.map(item => {
                const isActive = active === item.id;
                const Icon = item.icon;
                return (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.navItem}
                        onPress={() => navigate(item.id)}
                    >
                        <Icon
                            size={24}
                            color={isActive ? AppColors.primary : '#999'}
                            strokeWidth={isActive ? 2.5 : 2}
                        />
                        <Text style={[styles.navLabel, { color: isActive ? AppColors.primary : '#999' }]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingVertical: 12,
        justifyContent: 'space-around',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navLabel: {
        fontSize: 10,
        marginTop: 4,
        fontWeight: '600',
    },
});
