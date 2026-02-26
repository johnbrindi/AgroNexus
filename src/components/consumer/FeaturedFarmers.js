import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { Star } from 'lucide-react-native';

const FARMERS = [
    { id: '1', name: 'Amina Njoya', location: 'Bafoussam', rating: 5, avatar: null },
    { id: '2', name: 'Dr. John', location: 'Bamenda', rating: 4, avatar: null },
    { id: '3', name: 'Papa Fouda', location: 'Yaounde', rating: 5, avatar: null },
];

export const FeaturedFarmers = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Featured Farmers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {FARMERS.map((farmer) => (
                    <View key={farmer.id} style={styles.farmerCard}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>{farmer.name[0]}</Text>
                            </View>
                            <View style={styles.ratingBadge}>
                                <Star size={10} color="#FFD700" fill="#FFD700" />
                                <Text style={styles.ratingText}>{farmer.rating}</Text>
                            </View>
                        </View>
                        <Text style={styles.name}>{farmer.name}</Text>
                        <Text style={styles.location}>{farmer.location}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 35,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    scrollContent: {
        paddingHorizontal: 24,
        gap: 16,
    },
    farmerCard: {
        width: 140,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: AppColors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.primary,
    },
    ratingBadge: {
        position: 'absolute',
        bottom: -5,
        right: -8,
        backgroundColor: '#000',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    ratingText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '900',
    },
    name: {
        fontSize: 14,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
        textAlign: 'center',
    },
    location: {
        fontSize: 11,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
        marginTop: 2,
    },
});
