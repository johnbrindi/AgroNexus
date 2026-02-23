import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { DashboardStatusBar } from '../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../components/shared/DashboardHeader';
import { DashboardBottomNav } from '../components/shared/DashboardBottomNav';
import { CardBase } from '../components/ui/CardBase';
import { StandardButton } from '../components/ui/StandardButton';
import { StatusChip } from '../components/ui/StatusChip';

export default function MarketplaceScreen({ navigation }) {
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <DashboardStatusBar isOnline={true} />
            <DashboardHeader
                eyebrow="COMMUNITY TRADE"
                title="Marketplace"
            />

            {/* v3 Live Price Ticker */}
            <View style={styles.tickerContainer}>
                <View style={styles.tickerHeader}>
                    <Text style={styles.tickerLabel}>LIVE MARKET PRICES</Text>
                    <View style={styles.livePulse} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tickerContent}>
                    <PriceCard emoji="🍅" name="Tomato" price="520" trend="+4%" />
                    <PriceCard emoji="🌽" name="Maize" price="280" trend="-2%" trendDown />
                    <PriceCard emoji="🥔" name="Potato" price="450" trend="0%" />
                    <PriceCard emoji="🫘" name="Beans" price="800" trend="+1%" />
                </ScrollView>
            </View>

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search crops or sellers..."
                        placeholderTextColor={AppColors.txtMuted}
                    />
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
                    <TouchableOpacity style={[styles.catPill, styles.activeCat]}>
                        <Text style={[styles.catText, styles.activeCatText]}>ALL ITEMS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.catPill}>
                        <Text style={styles.catText}>CROPS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.catPill}>
                        <Text style={styles.catText}>FERTILIZER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.catPill}>
                        <Text style={styles.catText}>TOOLS</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Product List - Single Column v3 */}
                <ProductCard
                    title="Grade A Plum Tomatoes"
                    price="500"
                    unit="Crate"
                    seller="Mama Fouda"
                    location="Bamenda"
                    isVerified
                />
                <ProductCard
                    title="Yellow Maize (Dried)"
                    price="12,000"
                    unit="50kg Bag"
                    seller="Coop West"
                    location="Bafoussam"
                    isVerified
                />
                <ProductCard
                    title="Red Kidney Beans"
                    price="850"
                    unit="kg"
                    seller="Green Valley"
                    location="Buea"
                />
            </ScrollView>

            <DashboardBottomNav activeTab="MARKET" navigation={navigation} />
        </SafeAreaView>
    );
}

const PriceCard = ({ emoji, name, price, trend, trendDown }) => (
    <View style={styles.priceCard}>
        <Text style={styles.priceEmoji}>{emoji}</Text>
        <View>
            <Text style={styles.priceName}>{name}</Text>
            <View style={styles.priceMeta}>
                <Text style={styles.priceValue}>{price}</Text>
                <Text style={[styles.priceTrend, trendDown && styles.trendDown]}>{trend}</Text>
            </View>
        </View>
    </View>
);

const ProductCard = ({ title, price, unit, seller, location, isVerified }) => (
    <CardBase style={styles.productCard}>
        <View style={styles.productTop}>
            <View style={styles.productImgPlaceholder}>
                <Text style={styles.productImgEmoji}>📦</Text>
            </View>
            <View style={styles.productInfo}>
                <View style={styles.productHeader}>
                    <Text style={styles.productTitle}>{title}</Text>
                    {isVerified && <StatusChip label="VERIFIED" variant="ok" />}
                </View>
                <Text style={styles.productSeller}>{seller} · {location}</Text>
            </View>
        </View>
        <View style={styles.productDivider} />
        <View style={styles.productFooter}>
            <View>
                <Text style={styles.productPrice}>{price} XAF</Text>
                <Text style={styles.productUnit}>per {unit}</Text>
            </View>
            <StandardButton title="VIEW DEAL" variant="secondary" size="small" />
        </View>
    </CardBase>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    tickerContainer: {
        backgroundColor: AppColors.primary,
        paddingVertical: 18,
    },
    tickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 22,
        marginBottom: 12,
        gap: 8,
    },
    tickerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    livePulse: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#69F0AE',
    },
    tickerContent: {
        paddingHorizontal: 22,
        gap: 12,
    },
    priceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    priceEmoji: {
        fontSize: 18,
    },
    priceName: {
        fontSize: 10,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.8)',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    priceMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    priceValue: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        fontFamily: AppTypography.fontMonoBold,
    },
    priceTrend: {
        fontSize: 10,
        fontWeight: '700',
        color: '#69F0AE',
        fontFamily: AppTypography.fontMonoBold,
    },
    trendDown: {
        color: '#FF8A80',
    },
    contentScroll: {
        flex: 1,
    },
    scrollPadding: {
        paddingHorizontal: 22,
        paddingTop: 18,
        paddingBottom: 30,
        gap: 18,
    },
    searchWrapper: {
        flexDirection: 'row',
        gap: 12,
    },
    searchInput: {
        flex: 1,
        height: 52,
        backgroundColor: AppColors.inputBg,
        borderRadius: 12,
        paddingHorizontal: 18,
        fontSize: 15,
        color: AppColors.txtPrimary,
        borderWidth: 1,
        borderColor: AppColors.border,
        fontFamily: AppTypography.fontPrimary,
    },
    filterBtn: {
        width: 52,
        height: 52,
        backgroundColor: AppColors.white,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    filterIcon: {
        fontSize: 20,
    },
    catScroll: {
        gap: 10,
    },
    catPill: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: AppColors.inputBg,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    activeCat: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    catText: {
        fontSize: 11,
        fontWeight: '800',
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimaryExtraBold,
    },
    activeCatText: {
        color: '#FFF',
    },
    productCard: {
        padding: 18,
        borderRadius: AppSpacing.radiusLg,
    },
    productTop: {
        flexDirection: 'row',
        gap: 15,
    },
    productImgPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: AppColors.inputBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImgEmoji: {
        fontSize: 32,
    },
    productInfo: {
        flex: 1,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    productTitle: {
        fontSize: 17,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
        flex: 1,
        marginRight: 8,
    },
    productSeller: {
        fontSize: 13,
        color: AppColors.txtMuted,
        marginTop: 4,
        fontFamily: AppTypography.fontPrimary,
    },
    productDivider: {
        height: 1,
        backgroundColor: AppColors.border,
        marginVertical: 18,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontMonoBold,
    },
    productUnit: {
        fontSize: 11,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
        marginTop: 2,
    },
});
