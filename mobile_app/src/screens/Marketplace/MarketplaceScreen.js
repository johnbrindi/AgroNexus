import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { DashboardStatusBar } from '../../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../../components/shared/DashboardHeader';
import { DashboardBottomNav } from '../../components/shared/DashboardBottomNav';
import { SavedLocallyBar } from '../../components/shared/SavedLocallyBar';
import { CardBase } from '../../components/ui/CardBase';
import { StatusChip } from '../../components/ui/StatusChip';

export default function MarketplaceScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <DashboardStatusBar />
            <DashboardHeader
                subtitle="COMMUNITY TRADE HUB"
                title="Marketplace 🛒"
            />

            {/* Price Ticker */}
            <View style={styles.tickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tickerContent}>
                    <TickerItem emoji="🍅" name="TOMATO" price="520" trend="+4%" color="#EF5350" />
                    <TickerItem emoji="🌽" name="MAIZE" price="280" trend="-2%" color="#4CAF50" />
                    <TickerItem emoji="🥔" name="POTATO" price="450" trend="0%" color="#78909C" />
                    <TickerItem emoji="🫘" name="BEANS" price="800" trend="+1%" color="#4CAF50" />
                </ScrollView>
            </View>

            {/* Subheader: Category Picker */}
            <View style={styles.subHeader}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryPadding}>
                    <CategoryPill label="All Items" active />
                    <CategoryPill label="Fresh Crops" />
                    <CategoryPill label="Fertilizer" />
                    <CategoryPill label="Equipment" />
                    <CategoryPill label="Seeds" />
                </ScrollView>
            </View>

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput placeholder="Search crops, sellers, or locations…" style={styles.searchInput} placeholderTextColor={AppColors.txtMuted} />
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterIcon}>🎚️</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Grid - Manual wrap for high fidelity control */}
                <View style={styles.productGrid}>
                    <ProductCard
                        image="🍅"
                        name="Grade A Plum Tomatoes"
                        seller="Mama Fouda"
                        location="Bamenda, NW"
                        price="500"
                        unit="Crate"
                        rating="4.8"
                        verified
                    />
                    <ProductCard
                        image="🌽"
                        name="Yellow Maize (Dried)"
                        seller="Coop West"
                        location="Bafoussam, West"
                        price="12,000"
                        unit="50kg Bag"
                        rating="4.5"
                        verified
                    />
                    <ProductCard
                        image="🥔"
                        name="Irish Potatoes"
                        seller="Papa Santa"
                        location="Santa, NW"
                        price="4,500"
                        unit="Bucket"
                        rating="4.2"
                        verified={false}
                    />
                    <ProductCard
                        image="🫘"
                        name="Red Kidney Beans"
                        seller="Green Valley"
                        location="Buea, SW"
                        price="850"
                        unit="kg"
                        rating="4.9"
                        verified
                    />
                </View>

                <SavedLocallyBar message="Market prices cached for offline use" />
            </ScrollView>

            <DashboardBottomNav activeTab="MARKET" navigation={navigation} />
        </SafeAreaView>
    );
}

const TickerItem = ({ emoji, name, price, trend, color }) => (
    <View style={styles.tickerItem}>
        <Text style={styles.tickerEmoji}>{emoji}</Text>
        <Text style={styles.tickerName}>{name}</Text>
        <Text style={styles.tickerPrice}>{price} <Text style={styles.tickerUnit}>XAF</Text></Text>
        <Text style={[styles.tickerTrend, { color }]}>{trend}</Text>
    </View>
);

const CategoryPill = ({ label, active }) => (
    <TouchableOpacity style={[styles.catPill, active && styles.catPillActive]}>
        <Text style={[styles.catPillText, active && styles.catPillTextActive]}>{label}</Text>
    </TouchableOpacity>
);

const ProductCard = ({ image, name, seller, location, price, unit, rating, verified }) => (
    <CardBase style={styles.pCard} accentColor={verified ? "forest" : "clay"}>
        <View style={styles.pImageOverlay}>
            <Text style={styles.pEmoji}>{image}</Text>
            {verified && (
                <View style={styles.vBadge}>
                    <Text style={styles.vIcon}>✔️</Text>
                    <Text style={styles.vText}>VERIFIED</Text>
                </View>
            )}
        </View>
        <View style={styles.pContent}>
            <Text style={styles.pName} numberOfLines={1}>{name}</Text>
            <View style={styles.pSellerRow}>
                <Text style={styles.pSeller}>{seller}</Text>
                <View style={styles.pRating}>
                    <Text style={styles.pStar}>⭐</Text>
                    <Text style={styles.pRatingText}>{rating}</Text>
                </View>
            </View>
            <Text style={styles.pLoc}>📍 {location}</Text>

            <View style={styles.pPriceRow}>
                <View>
                    <Text style={styles.pPriceValue}>{price}</Text>
                    <Text style={styles.pPriceUnit}>XAF / {unit}</Text>
                </View>
                <TouchableOpacity style={styles.pAddBtn}>
                    <Text style={styles.pAddIcon}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    </CardBase>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.offwhite,
    },
    tickerContainer: {
        backgroundColor: AppColors.forestDark,
        paddingBottom: 10,
    },
    tickerContent: {
        paddingLeft: 16,
        gap: 12,
    },
    tickerItem: {
        backgroundColor: 'rgba(245, 242, 238, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(245, 242, 238, 0.15)',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    tickerEmoji: { fontSize: 13 },
    tickerName: {
        fontSize: 9,
        fontWeight: '700',
        color: AppColors.txtOnDark3,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    tickerPrice: {
        fontSize: 12,
        fontWeight: '900',
        color: AppColors.txtOnDark,
        fontFamily: AppTypography.fontMonoBold,
    },
    tickerUnit: { fontSize: 8, fontWeight: '400' },
    tickerTrend: {
        fontSize: 10,
        fontWeight: '700',
        fontFamily: AppTypography.fontMonoBold,
    },
    subHeader: {
        backgroundColor: AppColors.forestDark,
        paddingBottom: 14,
    },
    categoryPadding: {
        paddingLeft: 16,
        gap: 8,
    },
    catPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: 'rgba(245, 242, 238, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(245, 242, 238, 0.2)',
    },
    catPillActive: {
        backgroundColor: AppColors.gold,
        borderColor: AppColors.gold,
    },
    catPillText: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(245, 242, 238, 0.7)',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    catPillTextActive: {
        color: AppColors.forestDark,
    },
    contentScroll: {
        flex: 1,
        backgroundColor: '#EAEAE2',
    },
    scrollPadding: {
        padding: 14,
        gap: 14,
        paddingBottom: 30,
    },
    searchBar: {
        backgroundColor: AppColors.cream,
        borderWidth: 1.5,
        borderColor: AppColors.borderStrong,
        borderRadius: AppSpacing.radiusSm,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        height: 44,
    },
    searchIcon: { fontSize: 16 },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        fontFamily: AppTypography.fontPrimary,
    },
    filterBtn: {
        width: 32,
        height: 32,
        backgroundColor: AppColors.offwhiteWarm,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterIcon: { fontSize: 14 },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    pCard: {
        width: '48%', // Adjusted for gap
    },
    pImageOverlay: {
        height: 100,
        backgroundColor: AppColors.offwhiteWarm,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    pEmoji: { fontSize: 50 },
    vBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: 'rgba(45, 90, 39, 0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
    },
    vIcon: { fontSize: 8, color: '#FFF' },
    vText: { fontSize: 7, fontWeight: '900', color: '#FFF', letterSpacing: 0.5 },
    pContent: {
        padding: 10,
    },
    pName: {
        fontSize: 13,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    pSellerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 3,
    },
    pSeller: {
        fontSize: 10,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    pRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    pStar: { fontSize: 9 },
    pRatingText: { fontSize: 9, fontWeight: '700', color: AppColors.clay },
    pLoc: {
        fontSize: 9,
        color: AppColors.txtMuted,
        marginTop: 2,
        fontFamily: AppTypography.fontPrimary,
    },
    pPriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    pPriceValue: {
        fontSize: 15,
        fontWeight: '900',
        color: AppColors.forest,
        fontFamily: AppTypography.fontMonoBold,
    },
    pPriceUnit: {
        fontSize: 8,
        color: AppColors.txtMuted,
        fontWeight: '500',
        fontFamily: AppTypography.fontPrimaryMedium,
    },
    pAddBtn: {
        width: 28,
        height: 28,
        backgroundColor: AppColors.forest,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pAddIcon: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
