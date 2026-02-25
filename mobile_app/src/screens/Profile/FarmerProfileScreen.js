import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    LayoutGrid,
    ShieldCheck,
    Star,
    Clock,
    MapPin,
    Package,
    Users,
    TrendingUp,
    ChevronRight,
    Bell,
    Heart,
    Share2,
    Settings
} from 'lucide-react-native';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../../styles/theme';

import { DashboardHeader } from '../../components/shared/DashboardHeader';
import { CardBase } from '../../components/ui/CardBase';
import { StandardButton } from '../../components/ui/StandardButton';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock Data for the Showcase
const MOCK_LISTINGS = [
    { id: '1', title: 'Fresh Maize', price: '12,000 XAF', unit: 'bag', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400', status: 'active' },
    { id: '2', title: 'Organic Beans', price: '8,500 XAF', unit: 'bucket', image: 'https://images.unsplash.com/photo-1551462147-3a88236b446a?q=80&w=400', status: 'active' },
    { id: '3', title: 'Dry Plantains', price: '4,000 XAF', unit: 'bunch', image: 'https://images.unsplash.com/photo-1528823331199-69964b074e6f?q=80&w=400', status: 'sold_out' },
];

export default function FarmerProfileScreen({ navigation }) {
    const { t, locale } = useLanguage();
    const { logout, user } = useAuth();
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>


            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. Farmer Identity Header */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View style={styles.farmLogoContainer}>
                            <View style={styles.farmLogo}>
                                <LayoutGrid size={40} color={AppColors.primary} />
                            </View>
                            <View style={styles.verifiedBadge}>
                                <ShieldCheck size={16} color="#FFF" />
                            </View>
                        </View>
                        <View style={styles.headerActions}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Share2 size={20} color={AppColors.txtPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn} onPress={() => { }}>
                                <Settings size={20} color={AppColors.txtPrimary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.identityText}>
                        <View style={styles.farmTitleRow}>
                            <Text style={styles.farmName}>Green Valley Organic Farm</Text>
                        </View>

                        <View style={styles.ratingRow}>
                            <Star size={16} color="#EAB308" fill="#EAB308" />
                            <Text style={styles.ratingText}>4.8</Text>
                            <Text style={styles.reviewCount}>(120 {t('myReviews')})</Text>
                            <View style={styles.dot} />
                            <Text style={styles.experienceText}>{t('experienceVal')}</Text>
                        </View>

                        <View style={styles.cropTags}>
                            {['#Maize', '#Poultry', '#Organic'].map((tag, idx) => (
                                <View key={idx} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* 2. Farm Stats (Trust Building) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('farmStats').toUpperCase()}</Text>
                    <View style={styles.statsGrid}>
                        <StatCard
                            icon={<Package size={20} color={AppColors.primary} />}
                            value="500+"
                            label={t('ordersCompleted')}
                        />
                        <StatCard
                            icon={<Clock size={20} color={AppColors.primary} />}
                            value="< 1 hr"
                            label={t('responseTimeLabel')}
                        />
                    </View>

                    <CardBase style={styles.locationCard}>
                        <View style={styles.locLeft}>
                            <View style={styles.locIconBox}>
                                <MapPin size={20} color={AppColors.primary} />
                            </View>
                            <View>
                                <Text style={styles.locLabel}>{t('locationZone')}</Text>
                                <Text style={styles.locValue}>Foumbot, West Region</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.mapBtn}>
                            <Text style={styles.mapBtnText}>View Map</Text>
                        </TouchableOpacity>
                    </CardBase>
                </View>

                {/* 3. Product Showcase */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{t('productShowcase').toUpperCase()}</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>{t('change')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.showcaseList}>
                        {MOCK_LISTINGS.map((item) => (
                            <CardBase key={item.id} style={styles.productCard}>
                                <Image source={{ uri: item.image }} style={styles.productImg} />
                                {item.status === 'sold_out' && (
                                    <View style={styles.soldOutOverlay}>
                                        <Text style={styles.soldOutText}>{t('soldOut')}</Text>
                                    </View>
                                )}
                                <View style={styles.productInfo}>
                                    <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.productPrice}>{item.price} <Text style={styles.productUnit}>/ {item.unit}</Text></Text>

                                    {item.status === 'active' ? (
                                        <TouchableOpacity style={styles.manageBtn}>
                                            <Text style={styles.manageBtnText}>Manage</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={[styles.followBtn, isFollowing && styles.followingBtn]}
                                            onPress={() => setIsFollowing(!isFollowing)}
                                        >
                                            <Bell size={12} color={isFollowing ? AppColors.primary : "#FFF"} />
                                            <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>
                                                {isFollowing ? "Following" : t('followRestock')}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </CardBase>
                        ))}
                    </View>
                </View>

                <StandardButton
                    title={t('logout')}
                    variant="danger"
                    onPress={logout}
                    style={styles.logoutBtn}
                />

                <View style={styles.bottomSpace} />
            </ScrollView>
        </SafeAreaView>
    );
}

const StatCard = ({ icon, value, label }) => (
    <CardBase style={styles.statCard}>
        <View style={styles.statIconBox}>{icon}</View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </CardBase>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    contentScroll: {
        flex: 1,
    },
    scrollPadding: {
        paddingHorizontal: 20,
        paddingTop: 10,
        gap: 25,
    },
    header: {
        gap: 15,
        paddingVertical: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    farmLogoContainer: {
        position: 'relative',
    },
    farmLogo: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: AppColors.border,
        alignItems: 'center',
        justifyContent: 'center',
        ...CommonStyles.shadowSm,
    },
    verifiedBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: AppColors.success,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 10,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    identityText: {
        gap: 8,
    },
    farmName: {
        fontSize: 22,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '800',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    reviewCount: {
        fontSize: 12,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: AppColors.txtMuted,
        marginHorizontal: 4,
    },
    experienceText: {
        fontSize: 12,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    cropTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 5,
    },
    tag: {
        backgroundColor: AppColors.primaryWash,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '800',
        color: AppColors.primary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    section: {
        gap: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: AppColors.txtMuted,
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '700',
        color: AppColors.primary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 15,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: AppSpacing.radiusMd,
        alignItems: 'center',
        gap: 6,
    },
    statIconBox: {
        backgroundColor: AppColors.page,
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontMonoBold,
    },
    statLabel: {
        fontSize: 10,
        color: AppColors.txtMuted,
        textAlign: 'center',
        fontFamily: AppTypography.fontPrimary,
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: AppSpacing.radiusMd,
    },
    locLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    locIconBox: {
        backgroundColor: AppColors.page,
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: AppColors.txtMuted,
        textTransform: 'uppercase',
    },
    locValue: {
        fontSize: 14,
        fontWeight: '700',
        color: AppColors.txtPrimary,
    },
    mapBtnText: {
        fontSize: 12,
        fontWeight: '800',
        color: AppColors.primary,
    },
    showcaseList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    productCard: {
        width: (SCREEN_WIDTH - 52) / 2,
        borderRadius: AppSpacing.radiusMd,
        overflow: 'hidden',
    },
    productImg: {
        width: '100%',
        height: 100,
        backgroundColor: AppColors.page,
    },
    soldOutOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    soldOutText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    productInfo: {
        padding: 10,
        gap: 4,
    },
    productTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: AppColors.txtPrimary,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '900',
        color: AppColors.success,
    },
    productUnit: {
        fontSize: 10,
        color: AppColors.txtMuted,
        fontWeight: '400',
    },
    manageBtn: {
        marginTop: 6,
        backgroundColor: AppColors.page,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    manageBtnText: {
        fontSize: 11,
        fontWeight: '800',
        color: AppColors.txtPrimary,
    },
    followBtn: {
        marginTop: 6,
        backgroundColor: AppColors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    followingBtn: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: AppColors.primary,
    },
    followBtnText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#FFF',
    },
    followingBtnText: {
        color: AppColors.primary,
    },
    logoutBtn: {
        marginTop: 10,
    },
    bottomSpace: {
        height: 30,
    }
});
