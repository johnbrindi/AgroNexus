import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { LogOut, ShoppingBasket, Search, History } from 'lucide-react-native';

export default function UserLandingScreen() {
    const { logout, user } = useAuth();

    const CategoryItem = ({ name, icon: Icon, color }) => (
        <TouchableOpacity style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
                <Icon size={24} color={color} />
            </View>
            <Text style={styles.categoryName}>{name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'User'} 👋</Text>
                    <Text style={styles.subGreeting}>Fresh produce awaits you today.</Text>
                </View>
                <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <LogOut size={20} color={AppColors.clay} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Search Bar Placeholder */}
                <TouchableOpacity style={styles.searchBar}>
                    <Search size={20} color={AppColors.txtMuted} />
                    <Text style={styles.searchText}>Search fresh crops, sellers...</Text>
                </TouchableOpacity>

                {/* Featured Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                </View>

                <View style={styles.categoriesGrid}>
                    <CategoryItem name="Vegetables" icon={ShoppingBasket} color="#2D5A27" />
                    <CategoryItem name="Fruits" icon={ShoppingBasket} color="#D84315" />
                    <CategoryItem name="Grains" icon={ShoppingBasket} color="#F9A825" />
                    <CategoryItem name="History" icon={History} color="#455A64" />
                </View>

                {/* Placeholder for real content */}
                <View style={styles.promoCard}>
                    <View style={styles.promoTextContent}>
                        <Text style={styles.promoTitle}>Direct from Farm</Text>
                        <Text style={styles.promoSubtitle}>Supporting 200+ local farmers this month.</Text>
                        <TouchableOpacity style={styles.promoBtn}>
                            <Text style={styles.promoBtnText}>Browse Marketplace</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    subGreeting: {
        fontSize: 14,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
        marginTop: 4,
    },
    logoutBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFF1F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 14,
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchText: {
        marginLeft: 12,
        color: AppColors.txtMuted,
        fontSize: 14,
        fontFamily: AppTypography.fontPrimary,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 30,
    },
    categoryCard: {
        width: '48%',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    categoryIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '600',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    promoCard: {
        backgroundColor: AppColors.forest,
        borderRadius: 24,
        padding: 24,
        overflow: 'hidden',
    },
    promoTextContent: {
        zIndex: 1,
    },
    promoTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF',
        fontFamily: AppTypography.fontPrimaryBlack,
        marginBottom: 8,
    },
    promoSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        fontFamily: AppTypography.fontPrimary,
        marginBottom: 20,
        lineHeight: 20,
        maxWidth: '80%',
    },
    promoBtn: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    promoBtnText: {
        color: AppColors.forest,
        fontWeight: '700',
        fontSize: 14,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
