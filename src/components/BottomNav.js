import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Bluetooth, FileText, ShoppingBag } from 'lucide-react-native';
import { AppColors } from '../styles/theme';

export default function BottomNav({ navigation, active }) {
    const navItems = [
        { id: 'Home', icon: Home, label: 'Home' },
        { id: 'Devices', icon: Bluetooth, label: 'Devices' },
        { id: 'Report', icon: FileText, label: 'Report' },
        { id: 'Marketplace', icon: ShoppingBag, label: 'Market' }
    ];

    return (
        <View style={styles.bottomNav}>
            {navItems.map(item => {
                const isActive = active.toLowerCase() === item.id.toLowerCase();
                const Icon = item.icon;
                return (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.navItem}
                        onPress={() => navigation.navigate(item.id)}
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
