import React, { useState, useRef, useMemo } from 'react';
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
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Sliders, ChevronDown, Check, LayoutGrid, List } from 'lucide-react-native';
import { AppColors, AppTypography, AppSpacing } from '../styles/theme';
import { DashboardStatusBar } from '../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../components/shared/DashboardHeader';
import { TrendingProductCard } from '../components/consumer/TrendingProductCard';

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

export default function ConsumerMarketScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterMode, setFilterMode] = useState('all'); // 'all' or 'categories'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState(null);

    const filteredProducts = useMemo(() => {
        return ALL_PRODUCTS.filter(product => {
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
    }, [searchQuery, filterMode, selectedCategory, selectedItemType]);

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
            <DashboardHeader
                eyebrow="FRESH DEALS"
                title="Marketplace"
            />

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
                    <TouchableOpacity style={styles.filterBtn}>
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
                stickyHeaderIndices={[]}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    stickyHeader: {
        backgroundColor: AppColors.page,
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        zIndex: 10,
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
        backgroundColor: AppColors.forest,
        borderColor: AppColors.forest,
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
});
