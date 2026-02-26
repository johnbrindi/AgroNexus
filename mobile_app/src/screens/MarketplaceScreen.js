import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    Modal,
    KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Search, Sliders, Check, LayoutGrid, List, X, Star,
    ArrowUpNarrowWide, ArrowDownWideNarrow, Info, Plus, ShoppingCart
} from 'lucide-react-native';
import { AppColors, AppTypography, AppSpacing, CommonStyles } from '../styles/theme';
import { DashboardStatusBar } from '../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../components/shared/DashboardHeader';
import { TrendingProductCard } from '../components/consumer/TrendingProductCard';
import { useCart } from '../context/CartContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Data Constants
const CATEGORIES = [
    { id: '1', title: 'Crops', items: ['Maize', 'Beans', 'Rice', 'Tomato', 'Onions', 'Potatoes', 'Yam'] },
    { id: '2', title: 'Processed', items: ['Garri', 'Palm Oil', 'Honey', 'Dried Fish', 'Coffee'] },
    { id: '3', title: 'Livestock', items: ['Chicken', 'Beef', 'Eggs', 'Pork'] },
    { id: '4', title: 'Supplies', items: ['Fertilizer', 'Seeds', 'Pesticides'] },
];

const ALL_PRODUCTS = [
    {
        id: '1', title: 'Organic Bell Peppers', quarter: 'Nkwen', town: 'Bamenda', price: '1200', unit: 'bucket', category: 'Crops', itemType: 'Peppers',
        images: ['https://images.unsplash.com/photo-1566275529824-cca6d008f373?q=80&w=800&auto=format&fit=crop'], stock: '15', sellerName: 'Mamma Mary', sellerRating: '4.8'
    },
    {
        id: '2', title: 'Farm Fresh Eggs', quarter: 'Bastos', town: 'Yaounde', price: '3500', unit: 'crate', category: 'Livestock', itemType: 'Eggs',
        images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop'], stock: '50', sellerName: 'Farmer Joe', sellerRating: '4.9'
    },
    {
        id: '3', title: 'Sun-dried Maize', quarter: 'Tam-Tam', town: 'Bafoussam', price: '12000', unit: 'bag', category: 'Crops', itemType: 'Maize',
        images: ['https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop'], stock: '120', sellerName: 'Bafoussam Coop', sellerRating: '4.7'
    },
    {
        id: '4', title: 'Highland Coffee', quarter: 'Djissum', town: 'Foumban', price: '4500', unit: 'kg', category: 'Processed', itemType: 'Coffee',
        images: ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop'], stock: '250', sellerName: 'Foumban Estates', sellerRating: '5.0'
    },
    {
        id: '5', title: 'Red Onions', quarter: 'Mvog-Ada', town: 'Yaounde', price: '1500', unit: 'bucket', category: 'Crops', itemType: 'Onions',
        images: ['https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop'], stock: '40', sellerName: 'Mama Central', sellerRating: '4.6'
    },
    {
        id: '6', title: 'Organic Garri', quarter: 'Bonaberi', town: 'Douala', price: '8000', unit: 'bag', category: 'Processed', itemType: 'Garri',
        images: ['https://images.unsplash.com/photo-1590088029783-690227918f67?q=80&w=800&auto=format&fit=crop'], stock: '85', sellerName: 'Coastal Farms', sellerRating: '4.8'
    },
];

export default function MarketplaceScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterMode, setFilterMode] = useState('all'); // 'all' or 'categories'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState(null);

    // Modals
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
    const [isCartModalVisible, setIsCartModalVisible] = useState(false);
    const { cartCount } = useCart();

    const [sortBy, setSortBy] = useState('newest');

    const filteredProducts = useMemo(() => {
        let result = ALL_PRODUCTS.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sellerName.toLowerCase().includes(searchQuery.toLowerCase());

            if (filterMode === 'all') {
                return matchesSearch;
            } else {
                const matchesCategory = selectedCategory ? product.category === selectedCategory.title : true;
                const matchesItemType = selectedItemType ? product.itemType === selectedItemType : true;
                return matchesSearch && matchesCategory && matchesItemType;
            }
        });

        // Sorting Logic
        switch (sortBy) {
            case 'low-to-high':
                return result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
            case 'high-to-low':
                return result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
            case 'rating':
                return result.sort((a, b) => parseFloat(b.sellerRating) - parseFloat(a.sellerRating));
            case 'stock':
                return result.sort((a, b) => parseInt(b.stock) - parseInt(a.stock));
            case 'newest':
            default:
                return result.sort((a, b) => b.id.localeCompare(a.id));
        }
    }, [searchQuery, filterMode, selectedCategory, selectedItemType, sortBy]);

    const handleCategoryPress = (cat) => {
        setSelectedCategory(cat);
        setSelectedItemType(null);
    };

    const handleAllListingsPress = () => {
        setFilterMode('all');
        setSelectedCategory(null);
        setSelectedItemType(null);
    };

    const handleCategoriesToggle = () => {
        setFilterMode('categories');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <DashboardStatusBar isOnline={true} />

            <View style={styles.customHeader}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerEyebrow}>COMMUNITY TRADE</Text>
                    <Text style={styles.headerTitle}>Marketplace</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.headerIconBtn}
                        onPress={() => setIsAddProductModalVisible(true)}
                    >
                        <Plus size={24} color={AppColors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerIconBtn}
                        onPress={() => setIsCartModalVisible(true)}
                    >
                        <ShoppingCart size={24} color={AppColors.txtPrimary} />
                        {cartCount > 0 && (
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{cartCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Sticky Search Area */}
            <View style={styles.stickyHeader}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search size={20} color={AppColors.txtMuted} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Find fresh produce..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor={AppColors.txtMuted}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Check size={18} color={AppColors.primary} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.filterBtn}
                        onPress={() => setIsFilterModalVisible(true)}
                    >
                        <Sliders size={20} color={AppColors.txtPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Filter Toggles */}
                <View style={styles.toggleRow}>
                    <TouchableOpacity
                        style={[styles.toggleBtn, filterMode === 'all' && styles.activeToggleBtn]}
                        onPress={handleAllListingsPress}
                    >
                        <LayoutGrid size={16} color={filterMode === 'all' ? '#FFF' : AppColors.txtMuted} />
                        <Text style={[styles.toggleText, filterMode === 'all' && styles.activeToggleText]}>
                            All Listings
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleBtn, filterMode === 'categories' && styles.activeToggleBtn]}
                        onPress={handleCategoriesToggle}
                    >
                        <List size={16} color={filterMode === 'categories' ? '#FFF' : AppColors.txtMuted} />
                        <Text style={[styles.toggleText, filterMode === 'categories' && styles.activeToggleText]}>
                            Categories
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {filterMode === 'categories' && (
                    <View style={styles.categoriesArea}>
                        {/* Parent Categories */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catNav}>
                            {CATEGORIES.map(cat => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[styles.catPill, selectedCategory?.id === cat.id && styles.activeCatPill]}
                                    onPress={() => handleCategoryPress(cat)}
                                >
                                    <Text style={[styles.catText, selectedCategory?.id === cat.id && styles.activeCatText]}>
                                        {cat.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Sub-item Tabular Selection */}
                        {selectedCategory && (
                            <View style={styles.subItemGrid}>
                                <Text style={styles.subItemTitle}>Specific {selectedCategory.title}</Text>
                                <View style={styles.tabularContainer}>
                                    {selectedCategory.items.map((item, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[styles.tabularItem, selectedItemType === item && styles.activeTabularItem]}
                                            onPress={() => setSelectedItemType(item)}
                                        >
                                            <Text style={[styles.tabularText, selectedItemType === item && styles.activeTabularText]}>
                                                {item}
                                            </Text>
                                            {selectedItemType === item && <Check size={14} color="#FFF" />}
                                        </TouchableOpacity>
                                    ))}
                                    <TouchableOpacity
                                        style={[styles.tabularItem, !selectedItemType && styles.activeTabularItem]}
                                        onPress={() => setSelectedItemType(null)}
                                    >
                                        <Text style={[styles.tabularText, !selectedItemType && styles.activeTabularText]}>
                                            Full List
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                )}

                {/* Results Header */}
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsCount}>
                        {filteredProducts.length} results {selectedItemType ? `for ${selectedItemType}` : selectedCategory ? `in ${selectedCategory.title}` : ''}
                    </Text>
                </View>

                {/* Grid Layout */}
                <View style={styles.productsGrid}>
                    {filteredProducts.map((product) => (
                        <TrendingProductCard key={product.id} {...product} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <View style={styles.emptyResults}>
                            <Text style={styles.emptyText}>No matches found</Text>
                        </View>
                    )}
                </View>

                <View style={styles.bottomGap} />
            </ScrollView>

            {/* Filter Modal */}
            <Modal
                visible={isFilterModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsFilterModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Filter & Sort</Text>
                            <TouchableOpacity onPress={() => setIsFilterModalVisible(false)} style={styles.closeBtn}>
                                <X size={24} color={AppColors.txtPrimary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.filterSectionTitle}>Sort By</Text>
                        <View style={styles.sortOptions}>
                            <SortOption
                                icon={<ArrowUpNarrowWide size={18} color={sortBy === 'low-to-high' ? '#FFF' : AppColors.txtMuted} />}
                                label="Price: Low to High"
                                active={sortBy === 'low-to-high'}
                                onPress={() => setSortBy('low-to-high')}
                            />
                            <SortOption
                                icon={<ArrowDownWideNarrow size={18} color={sortBy === 'high-to-low' ? '#FFF' : AppColors.txtMuted} />}
                                label="Price: High to Low"
                                active={sortBy === 'high-to-low'}
                                onPress={() => setSortBy('high-to-low')}
                            />
                            <SortOption
                                icon={<Star size={18} color={sortBy === 'rating' ? '#FFF' : AppColors.txtMuted} />}
                                label="Highest Rated"
                                active={sortBy === 'rating'}
                                onPress={() => setSortBy('rating')}
                            />
                            <SortOption
                                icon={<Info size={18} color={sortBy === 'stock' ? '#FFF' : AppColors.txtMuted} />}
                                label="In Stock"
                                active={sortBy === 'stock'}
                                onPress={() => setSortBy('stock')}
                            />
                            <SortOption
                                icon={<LayoutGrid size={18} color={sortBy === 'newest' ? '#FFF' : AppColors.txtMuted} />}
                                label="Latest Arrivals"
                                active={sortBy === 'newest'}
                                onPress={() => setSortBy('newest')}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.applyBtn}
                            onPress={() => setIsFilterModalVisible(false)}
                        >
                            <Text style={styles.applyBtnText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Add Product Modal */}
            <Modal
                visible={isAddProductModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsAddProductModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <View style={[styles.modalContent, styles.modalContentFull]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Create Listing</Text>
                            <TouchableOpacity onPress={() => setIsAddProductModalVisible(false)} style={styles.closeBtn}>
                                <X size={24} color={AppColors.txtPrimary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Product Name</Text>
                                <TextInput style={styles.formInput} placeholder="e.g. Organic Bell Peppers" placeholderTextColor={AppColors.txtMuted} />
                            </View>

                            <View style={styles.formGroupRow}>
                                <View style={[styles.formGroup, { flex: 1 }]}>
                                    <Text style={styles.formLabel}>Price (XAF)</Text>
                                    <TextInput style={styles.formInput} placeholder="e.g. 1200" keyboardType="numeric" placeholderTextColor={AppColors.txtMuted} />
                                </View>
                                <View style={[styles.formGroup, { flex: 1 }]}>
                                    <Text style={styles.formLabel}>Unit</Text>
                                    <TextInput style={styles.formInput} placeholder="e.g. bucket" placeholderTextColor={AppColors.txtMuted} />
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Category</Text>
                                <View style={styles.selectInput}>
                                    <Text style={{ color: AppColors.txtPrimary }}>Crops</Text>
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Stock / Quantity Available</Text>
                                <TextInput style={styles.formInput} placeholder="e.g. 15" keyboardType="numeric" placeholderTextColor={AppColors.txtMuted} />
                            </View>

                            <TouchableOpacity style={styles.applyBtn} onPress={() => setIsAddProductModalVisible(false)}>
                                <Text style={styles.applyBtnText}>Publish Listing</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* Cart Modal */}
            <Modal
                visible={isCartModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsCartModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, styles.modalContentFull]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Your Cart</Text>
                            <TouchableOpacity onPress={() => setIsCartModalVisible(false)} style={styles.closeBtn}>
                                <X size={24} color={AppColors.txtPrimary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cartContent}>
                            <View style={styles.cartItem}>
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1566275529824-cca6d008f373?q=80&w=200&auto=format&fit=crop' }} style={styles.cartItemImg} />
                                <View style={styles.cartItemInfo}>
                                    <Text style={styles.cartItemTitle}>Organic Bell Peppers</Text>
                                    <Text style={styles.cartItemPrice}>1,200 XAF</Text>
                                    <View style={styles.qtyControls}>
                                        <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
                                        <Text style={styles.qtyText}>1</Text>
                                        <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.cartItem}>
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200&auto=format&fit=crop' }} style={styles.cartItemImg} />
                                <View style={styles.cartItemInfo}>
                                    <Text style={styles.cartItemTitle}>Farm Fresh Eggs</Text>
                                    <Text style={styles.cartItemPrice}>3,500 XAF</Text>
                                    <View style={styles.qtyControls}>
                                        <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
                                        <Text style={styles.qtyText}>2</Text>
                                        <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.cartTotalRow}>
                                <Text style={styles.cartTotalLabel}>Total</Text>
                                <Text style={styles.cartTotalValue}>8,200 XAF</Text>
                            </View>

                            <TouchableOpacity style={styles.applyBtn} onPress={() => setIsCartModalVisible(false)}>
                                <Text style={styles.applyBtnText}>Proceed to Checkout</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const SortOption = ({ icon, label, active, onPress }) => (
    <TouchableOpacity
        style={[styles.sortBtn, active && styles.activeSortBtn]}
        onPress={onPress}
    >
        {icon}
        <Text style={[styles.sortText, active && styles.activeSortText]}>{label}</Text>
        {active && <Check size={16} color="#FFF" />}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: AppColors.page,
    },
    headerLeft: {
        flex: 1,
    },
    headerEyebrow: {
        fontSize: 10,
        fontWeight: '800',
        color: AppColors.txtMuted,
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryExtraBold,
        textTransform: 'uppercase',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
        marginTop: 2,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingTop: 8,
    },
    headerIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: AppColors.border,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    cartBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: AppColors.danger,
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#FFF',
    },
    cartBadgeText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: '900',
        fontFamily: AppTypography.fontMonoBold,
    },
    stickyHeader: {
        backgroundColor: AppColors.page,
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        zIndex: 10,
        marginTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 5,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: AppColors.border,
        gap: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimary,
    },
    filterBtn: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    toggleRow: {
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: AppColors.inputBg,
        padding: 5,
        borderRadius: 12,
        gap: 5,
    },
    toggleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        gap: 8,
    },
    activeToggleBtn: {
        backgroundColor: AppColors.primary,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    toggleText: {
        fontSize: 13,
        fontWeight: '700',
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    activeToggleText: {
        color: '#FFF',
    },
    contentScroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    categoriesArea: {
        marginBottom: 20,
    },
    catNav: {
        gap: 10,
        marginBottom: 15,
    },
    catPill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    activeCatPill: {
        borderColor: AppColors.primary,
        backgroundColor: AppColors.primary + '05',
    },
    catText: {
        fontSize: 14,
        fontWeight: '800',
        color: AppColors.txtMuted,
    },
    activeCatText: {
        color: AppColors.primary,
    },
    subItemGrid: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    subItemTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: AppColors.txtMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 5,
    },
    tabularContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tabularItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: AppColors.page,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        gap: 6,
    },
    activeTabularItem: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
    },
    tabularText: {
        fontSize: 13,
        fontWeight: '700',
        color: AppColors.txtPrimary,
    },
    activeTabularText: {
        color: '#FFF',
    },
    resultsHeader: {
        marginBottom: 15,
        paddingLeft: 5,
    },
    resultsCount: {
        fontSize: 13,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    emptyResults: {
        width: '100%',
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    bottomGap: {
        height: 100,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        paddingBottom: 40,
        maxHeight: '90%',
    },
    modalContentFull: {
        height: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    closeBtn: {
        padding: 5,
    },
    filterSectionTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: AppColors.txtMuted,
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    sortOptions: {
        gap: 10,
        marginBottom: 30,
    },
    sortBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: AppColors.inputBg,
        borderRadius: 15,
        gap: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeSortBtn: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
    },
    sortText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '700',
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    activeSortText: {
        color: '#FFF',
    },
    applyBtn: {
        backgroundColor: AppColors.primary,
        height: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: AppColors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    applyBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    // Form Styles for Add Product
    formContent: {
        gap: 15,
        paddingBottom: 20,
    },
    formGroup: {
        gap: 8,
    },
    formGroupRow: {
        flexDirection: 'row',
        gap: 15,
    },
    formLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    formInput: {
        backgroundColor: AppColors.inputBg,
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        color: AppColors.txtPrimary,
        borderWidth: 1,
        borderColor: AppColors.border,
        fontFamily: AppTypography.fontPrimary,
    },
    selectInput: {
        backgroundColor: AppColors.inputBg,
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    // Cart Styles
    cartContent: {
        gap: 20,
    },
    cartItem: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    cartItemImg: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: AppColors.page,
    },
    cartItemInfo: {
        flex: 1,
        gap: 5,
    },
    cartItemTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    cartItemPrice: {
        fontSize: 16,
        fontWeight: '900',
        color: AppColors.success,
        fontFamily: AppTypography.fontMonoBold,
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginTop: 5,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: AppColors.page,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    qtyBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: AppColors.txtPrimary,
    },
    qtyText: {
        fontSize: 15,
        fontWeight: '800',
        color: AppColors.txtPrimary,
    },
    cartTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: AppColors.border,
    },
    cartTotalLabel: {
        fontSize: 16,
        fontWeight: '800',
        color: AppColors.txtSecondary,
    },
    cartTotalValue: {
        fontSize: 22,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontMonoBold,
    }
});
