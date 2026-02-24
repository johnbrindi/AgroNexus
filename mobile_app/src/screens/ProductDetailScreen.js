import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Platform,
    Dimensions,
    StatusBar
} from 'react-native';
import {
    ChevronLeft,
    Plus,
    Minus,
    ShoppingBag,
    MapPin,
    Info,
    Star,
    Package,
    User,
    CheckCircle2
} from 'lucide-react-native';
import { AppColors, AppTypography } from '../styles/theme';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
    const { productId, title, price, images, unit, location, stock, sellerName, sellerRating } = route.params || {};
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const scrollRef = useRef(null);

    // Fallback for missing images array
    const productImages = Array.isArray(images) ? images : [images];
    const totalPrice = parseInt(price) * quantity;

    const handleScroll = (event) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / SCREEN_WIDTH);
        setActiveImageIndex(index);
    };

    const handleAddToCart = () => {
        addToCart({
            id: productId,
            title,
            price,
            image: productImages[0],
            unit,
            location
        }, quantity);

        showToast(`${quantity} ${unit}(s) of ${title} added to cart!`, 'success');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={false}
            >
                {/* Hero Image Carousel Section */}
                <View style={styles.carouselContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        ref={scrollRef}
                    >
                        {productImages.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={styles.heroImage}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>

                    {/* Pagination Indicators */}
                    <View style={styles.paginationDots}>
                        {productImages.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    activeImageIndex === index && styles.activeDot
                                ]}
                            />
                        ))}
                    </View>

                    {/* Safe Area Header Overlay */}
                    <SafeAreaView style={styles.headerOverlay}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <ChevronLeft size={24} color={AppColors.txtPrimary} />
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>

                {/* Details Section */}
                <View style={styles.detailsContainer}>
                    <View style={styles.headerRow}>
                        <View style={styles.titleArea}>
                            <Text style={styles.title}>{title}</Text>
                            <View style={styles.locationRow}>
                                <MapPin size={14} color={AppColors.txtMuted} />
                                <Text style={styles.locationText}>{location}</Text>
                            </View>
                        </View>
                        <View style={styles.stockBadge}>
                            <Package size={14} color={AppColors.forest} />
                            <Text style={styles.stockText}>{stock} in stock</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Seller Profile Section */}
                    <View style={styles.sellerSection}>
                        <View style={styles.sellerInfo}>
                            <View style={styles.avatarContainer}>
                                <User size={24} color={AppColors.primary} />
                            </View>
                            <View>
                                <View style={styles.sellerNameRow}>
                                    <Text style={styles.sellerName}>{sellerName || 'Local Farmer'}</Text>
                                    <CheckCircle2 size={14} color={AppColors.primary} />
                                </View>
                                <Text style={styles.sellerSubtext}>Verified Professional Farmer</Text>
                            </View>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Star size={16} color="#FFB300" fill="#FFB300" />
                            <Text style={styles.ratingText}>{sellerRating || '4.5'}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.sectionHeader}>
                        <Info size={18} color={AppColors.primary} />
                        <Text style={styles.sectionTitle}>Product Description</Text>
                    </View>
                    <Text style={styles.description}>
                        This premium {title.toLowerCase()} is harvested directly from our volcanic soils in the highlands.
                        Carefully handled and packed to ensure the freshest quality reaches your table.
                        No industrial chemicals used. Support local sustainable farming while enjoying the best nature has to offer.
                        Perfect for healthy home meals and organic diets. This batch has been checked for quality and ripeness before transit.
                    </Text>

                    {/* Filling the page with more substantial info */}
                    <View style={styles.detailGrid}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Origin</Text>
                            <Text style={styles.detailValue}>{location ? location.split(',')[1]?.trim() : 'Local Region'}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Farming</Text>
                            <Text style={styles.detailValue}>100% Organic</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Delivery</Text>
                            <Text style={styles.detailValue}>24-48 Hours</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Calculator Area (Sticky Bottom) */}
            <View style={styles.calculatorSection}>
                <SafeAreaView edges={['bottom']}>
                    <View style={styles.calculatorRow}>
                        <View>
                            <Text style={styles.priceLabel}>Price per {unit}</Text>
                            <Text style={styles.unitPrice}>{parseInt(price).toLocaleString()} XAF</Text>
                        </View>

                        <View style={styles.qtyCalculator}>
                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => setQuantity(q => Math.max(1, q - 1))}
                            >
                                <Minus size={20} color={AppColors.primary} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{quantity}</Text>
                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => setQuantity(q => q + 1)}
                            >
                                <Plus size={20} color={AppColors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.footerRow}>
                        <View>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>{totalPrice.toLocaleString()} XAF</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addToCartBtn}
                            onPress={handleAddToCart}
                        >
                            <ShoppingBag size={20} color="#FFF" />
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    carouselContainer: {
        height: 400,
        width: SCREEN_WIDTH,
        position: 'relative',
    },
    heroImage: {
        width: SCREEN_WIDTH,
        height: 400,
    },
    headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    paginationDots: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    activeDot: {
        width: 24,
        backgroundColor: '#FFF',
    },
    backButton: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
        marginLeft: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.92)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
    },
    detailsContainer: {
        padding: 24,
        marginTop: -36,
        backgroundColor: AppColors.page,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        minHeight: 550, // Ensures content feels substantial
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    titleArea: {
        flex: 1,
        marginRight: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 6,
    },
    locationText: {
        fontSize: 14,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    stockBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.forest + '15',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 14,
        gap: 6,
    },
    stockText: {
        fontSize: 12,
        fontWeight: '700',
        color: AppColors.forest,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.08)',
        marginVertical: 20,
    },
    sellerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sellerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: AppColors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sellerNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    sellerName: {
        fontSize: 16,
        fontWeight: '900',
        color: AppColors.txtPrimary,
    },
    sellerSubtext: {
        fontSize: 12,
        color: AppColors.txtMuted,
        marginTop: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBE6',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFE58F',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#D48806',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    description: {
        fontSize: 16,
        lineHeight: 26,
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimary,
    },
    detailGrid: {
        flexDirection: 'row',
        marginTop: 32,
        gap: 12,
    },
    detailItem: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    detailLabel: {
        fontSize: 11,
        color: AppColors.txtMuted,
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    detailValue: {
        fontSize: 13,
        fontWeight: '800',
        color: AppColors.txtPrimary,
    },
    calculatorSection: {
        backgroundColor: '#FFF',
        padding: 24,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        marginTop: 10,
    },
    calculatorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    priceLabel: {
        fontSize: 13,
        color: AppColors.txtMuted,
        marginBottom: 4,
    },
    unitPrice: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.forest,
        fontFamily: AppTypography.fontMonoBold,
    },
    qtyCalculator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.page,
        borderRadius: 16,
        padding: 4,
    },
    qtyBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    qtyText: {
        fontSize: 20,
        fontWeight: '900',
        marginHorizontal: 16,
        color: AppColors.txtPrimary,
        minWidth: 32,
        textAlign: 'center',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 0 : 20,
    },
    totalLabel: {
        fontSize: 13,
        color: AppColors.txtMuted,
        marginBottom: 4,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontMonoBold,
        lineHeight: 30,
    },
    addToCartBtn: {
        flexDirection: 'row',
        backgroundColor: AppColors.primary,
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: 'center',
        gap: 10,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
        elevation: 8,
    },
    addToCartText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
