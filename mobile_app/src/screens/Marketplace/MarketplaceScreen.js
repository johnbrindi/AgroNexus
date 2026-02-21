import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Modal,
    Platform,
    StatusBar,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import { AppColors } from '../../styles/theme';
import {
    Plus,
    ChevronDown,
    MapPin,
    Package,
    X,
    Calendar,
    Star,
    Minus,
    User
} from 'lucide-react-native';
import { Button } from 'react-native';

// Mock Data matching the spec
const PRODUCTS = [
    {
        id: '1',
        name: 'Fresh Tomatoes',
        price: '500 XAF',
        quantity: '10 Crates',
        location: 'Bamenda, NW',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop',
        description: 'Freshly harvested organic tomatoes from the volcanic soils of Bamenda.',
        harvestDate: '12 Oct 2023',
        quality: 'Grade A',
        seller: 'Mama Fouda',
        rating: 4.8
    },
    {
        id: '2',
        name: 'Yellow Maize',
        price: '12,000 XAF',
        quantity: '5 Bags',
        location: 'Bafoussam, West',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1000&auto=format&fit=crop',
        description: 'High-quality yellow maize suitable for animal feed or processing.',
        harvestDate: '05 Sep 2023',
        quality: 'Grade B',
        seller: 'Coop West',
        rating: 4.5
    },
    {
        id: '3',
        name: 'Red Beans',
        price: '800 XAF',
        quantity: '20 kg',
        location: 'Buea, SW',
        image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?q=80&w=1000&auto=format&fit=crop',
        description: 'Dried red kidney beans, cleaned and sorted.',
        harvestDate: '20 Aug 2023',
        quality: 'Premium',
        seller: 'Green Valley',
        rating: 4.9
    },
    {
        id: '4',
        name: 'Irish Potatoes',
        price: '4,500 XAF',
        quantity: '3 Buckets',
        location: 'Santa, NW',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1000&auto=format&fit=crop',
        description: 'Large irish potatoes perfect for chips or boiling.',
        harvestDate: '01 Oct 2023',
        quality: 'Grade A',
        seller: 'Papa John',
        rating: 4.2
    },
];

// Product Detail Modal Component
const ProductDetailModal = ({ product, visible, onClose, navigation }) => {
    const [qty, setQty] = useState(1);

    useEffect(() => {
        if (visible) setQty(1);
    }, [visible]);

    if (!product) return null;

    // Price calculation
    const priceVal = parseInt(product.price.replace(/[^0-9]/g, '')) || 0;
    const total = priceVal * qty;

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.container}>
                <ScrollView contentContainerStyle={modalStyles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Header Image */}
                    <View style={modalStyles.imageContainer}>
                        <Image source={{ uri: product.image }} style={modalStyles.image} />
                        <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
                            <X size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <View style={modalStyles.content}>
                        <View style={modalStyles.headerRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={modalStyles.name}>{product.name}</Text>
                                <Text style={modalStyles.price}>{product.price} / unit</Text>
                            </View>
                            <View style={modalStyles.locationBadge}>
                                <MapPin size={14} color="#FFF" />
                                <Text style={modalStyles.locationText}>{product.location}</Text>
                            </View>
                        </View>

                        {/* Info Cluster */}
                        <View style={modalStyles.infoGrid}>
                            <View style={modalStyles.infoItem}>
                                <Calendar size={18} color={AppColors.textGrey} />
                                <Text style={modalStyles.infoText}>{product.harvestDate}</Text>
                            </View>
                            <View style={modalStyles.infoItem}>
                                <Star size={18} color="#FFD700" fill="#FFD700" />
                                <Text style={modalStyles.infoText}>{product.quality}</Text>
                            </View>
                        </View>

                        {/* Seller */}
                        <View style={modalStyles.sellerRow}>
                            <View style={modalStyles.sellerLeft}>
                                <User size={20} color={AppColors.textDark} />
                                <Text style={modalStyles.sellerName}>{product.seller}</Text>
                            </View>
                            <View style={modalStyles.ratingBadge}>
                                <Star size={12} color="#FFF" fill="#FFF" />
                                <Text style={modalStyles.ratingText}>{product.rating}</Text>
                            </View>
                        </View>

                        {/* Description */}
                        <Text style={modalStyles.description}>{product.description}</Text>
                    </View>
                </ScrollView>

                {/* Sticky Purchase Section */}
                <View style={modalStyles.footer}>
                    <View style={modalStyles.footerTop}>
                        <View style={modalStyles.qtyRow}>
                            <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={modalStyles.qtyBtn}>
                                <Minus size={20} color={AppColors.textDark} />
                            </TouchableOpacity>
                            <Text style={modalStyles.qtyText}>{qty}</Text>
                            <TouchableOpacity onPress={() => setQty(qty + 1)} style={modalStyles.qtyBtn}>
                                <Plus size={20} color={AppColors.textDark} />
                            </TouchableOpacity>
                        </View>
                        <Text style={modalStyles.totalText}>Total: {total.toLocaleString()} XAF</Text>
                    </View>
                    <TouchableOpacity
                        style={modalStyles.payButton}
                        onPress={() => {
                            onClose();
                            navigation.navigate('Payment', { product, quantity: qty, totalCost: total });
                        }}
                    >
                        <Text style={modalStyles.payButtonText}>Proceed to Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default function MarketplaceScreen({ navigation }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('sell');

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.topRow}>
                <Text style={styles.title}>Marketplace</Text>
                <TouchableOpacity style={styles.addBtn}>
                    <Plus size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'sell' && styles.activeTab]}
                    onPress={() => setActiveTab('sell')}
                >
                    <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}>Sell Fresh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'process' && styles.activeTab]}
                    onPress={() => setActiveTab('process')}
                >
                    <Text style={[styles.tabText, activeTab === 'process' && styles.activeTabText]}>Process & Transform</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>All Listings</Text>
                <TouchableOpacity style={styles.categoryDropdown}>
                    <Text style={styles.categoryText}>Category</Text>
                    <ChevronDown size={16} color={AppColors.textDark} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {renderHeader()}
                <FlatList
                    data={PRODUCTS}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => setSelectedProduct(item)}>
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardPrice}>{item.price}</Text>
                                <View style={styles.cardRow}>
                                    <Package size={12} color={AppColors.textGrey} />
                                    <Text style={styles.cardDetail}>{item.quantity}</Text>
                                </View>
                                <View style={styles.cardRow}>
                                    <MapPin size={12} color={AppColors.textGrey} />
                                    <Text style={styles.cardDetail} numberOfLines={1}>{item.location}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <ProductDetailModal
                product={selectedProduct}
                visible={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                navigation={navigation}
            />

            <BottomNav navigation={navigation} active="marketplace" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
        flex: 1,
        paddingHorizontal: 4,
    },
    header: {
        marginBottom: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: AppColors.textDark,
    },
    addBtn: {
        backgroundColor: AppColors.primary,
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        padding: 4,
        marginBottom: 12,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: '#FFF',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: AppColors.textGrey,
    },
    activeTabText: {
        color: AppColors.primary,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppColors.textDark,
    },
    categoryDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        backgroundColor: '#FFF',
    },
    categoryText: {
        fontSize: 12,
        color: AppColors.textDark,
        marginRight: 4,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    listContent: {
        paddingBottom: 80,
    },
    card: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: '100%',
        height: 110,
        backgroundColor: '#EEE',
    },
    cardInfo: {
        padding: 8,
    },
    cardPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: AppColors.primary,
        marginBottom: 4,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    cardDetail: {
        fontSize: 11,
        color: AppColors.textGrey,
        marginLeft: 4,
    },
});

const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        paddingBottom: 150,
    },
    imageContainer: {
        height: 250,
        backgroundColor: '#EEE',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#FFF',
        padding: 6,
        borderRadius: 20,
    },
    content: {
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: AppColors.textDark,
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppColors.primary,
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.textGrey,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    locationText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    infoGrid: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    infoText: {
        fontSize: 13,
        fontWeight: '600',
        color: AppColors.textGrey,
        marginLeft: 6,
    },
    sellerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
    },
    sellerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sellerName: {
        marginLeft: 8,
        fontWeight: 'bold',
        color: AppColors.textDark,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.primary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    ratingText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    description: {
        fontSize: 14,
        color: AppColors.textGrey,
        lineHeight: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        borderTopWidth: 1,
        borderColor: '#EEE',
        elevation: 10,
    },
    footerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 4,
    },
    qtyBtn: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
    qtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 12,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppColors.primary,
    },
    payButton: {
        backgroundColor: AppColors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

