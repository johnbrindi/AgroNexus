import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';
import { TrendingProductCard } from './TrendingProductCard';

const TRENDING_ITEMS = [
    {
        id: '1',
        title: 'Organic Bell Peppers',
        quarter: 'Nkwen',
        town: 'Bamenda',
        price: '1200',
        unit: 'bucket',
        images: [
            'https://images.unsplash.com/photo-1566275529824-cca6d008f373?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?q=80&w=800&auto=format&fit=crop'
        ],
        stock: '15',
        sellerName: 'Mamma Mary',
        sellerRating: '4.8'
    },
    {
        id: '2',
        title: 'Farm Fresh Eggs',
        quarter: 'Bastos',
        town: 'Yaounde',
        price: '3500',
        unit: 'crate',
        images: [
            'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=800&auto=format&fit=crop'
        ],
        stock: '50',
        sellerName: 'Farmer Joe',
        sellerRating: '4.9'
    },
    {
        id: '3',
        title: 'Sun-dried Maize',
        quarter: 'Tam-Tam',
        town: 'Bafoussam',
        price: '12000',
        unit: 'bag',
        images: [
            'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1550085422-9654199c0dae?q=80&w=800&auto=format&fit=crop'
        ],
        stock: '120',
        sellerName: 'Bafoussam Coop',
        sellerRating: '4.7'
    },
    {
        id: '4',
        title: 'Highland Coffee',
        quarter: 'Djissum',
        town: 'Foumban',
        price: '4500',
        unit: 'kg',
        images: [
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop'
        ],
        stock: '250',
        sellerName: 'Foumban Estates',
        sellerRating: '5.0'
    },
];

export const TrendingGrid = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Trending Near You</Text>
            <View style={styles.grid}>
                {TRENDING_ITEMS.map((item) => (
                    <TrendingProductCard key={item.id} {...item} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
