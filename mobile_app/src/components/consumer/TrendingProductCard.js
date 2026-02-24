import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppColors, AppTypography } from '../../styles/theme';

export const TrendingProductCard = ({ id, title, price, images, quarter, town, unit, stock, sellerName, sellerRating }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ProductDetail', {
            productId: id,
            title,
            price,
            images,
            unit,
            location: `${quarter}, ${town}`,
            stock,
            sellerName,
            sellerRating
        });
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={handlePress}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                {images && images[0] ? (
                    <Image source={{ uri: images[0] }} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderEmoji}>🌱</Text>
                    </View>
                )}
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.location}>{quarter}, {town}</Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{parseInt(price).toLocaleString()} XAF</Text>
                    <Text style={styles.unit}> / {unit}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: AppColors.inputBg,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderEmoji: {
        fontSize: 32,
    },
    detailsContainer: {
        padding: 10, // Compacted padding
    },
    title: {
        fontSize: 13, // Slightly smaller title to save space
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    location: {
        fontSize: 9, // Smaller location text
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
        marginTop: 2,
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: 14,
        fontWeight: '900',
        color: AppColors.forest,
        fontFamily: AppTypography.fontMonoBold,
    },
    unit: {
        fontSize: 9,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
        marginLeft: 2,
    },
});
