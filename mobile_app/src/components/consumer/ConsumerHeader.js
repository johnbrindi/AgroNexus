import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Search } from 'lucide-react-native';
import { AppColors } from '../../styles/theme';

export const ConsumerHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.glassContainer}>
                <Search size={20} color={AppColors.txtMuted} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for Seedlings, Fertilizers..."
                    placeholderTextColor={AppColors.txtMuted}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 20,
        zIndex: 10,
    },
    glassContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 25,
        paddingHorizontal: 16,
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: AppColors.txtPrimary,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    },
});
