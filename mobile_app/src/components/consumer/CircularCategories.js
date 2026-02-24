import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { Sprout, Apple, Carrot, Wheat, Hammer } from 'lucide-react-native';

const CATEGORIES = [
    { name: 'Grains', icon: Wheat, color: '#F9A825' },
    { name: 'Fruits', icon: Apple, color: '#D84315' },
    { name: 'Vegetables', icon: Carrot, color: '#2D5A27' },
    { name: 'Livestock', icon: Sprout, color: '#8D6E63' },
    { name: 'Tools', icon: Hammer, color: '#455A64' },
];

export const CircularCategories = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {CATEGORIES.map((cat, index) => (
                    <TouchableOpacity key={index} style={styles.catItem}>
                        <View style={[styles.iconWrapper, { backgroundColor: cat.color + '15' }]}>
                            <cat.icon size={26} color={cat.color} />
                        </View>
                        <Text style={styles.catName}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 35,
    },
    scrollContent: {
        paddingHorizontal: 24,
        gap: 20,
    },
    catItem: {
        alignItems: 'center',
    },
    iconWrapper: {
        width: 65,
        height: 65,
        borderRadius: 33,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    catName: {
        fontSize: 12,
        fontWeight: '700',
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
