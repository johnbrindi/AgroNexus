import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    User,
    ShieldCheck,
    Wallet,
    ShoppingBag,
    History,
    Star,
    MapPin,
    CreditCard,
    Languages,
    Bell,
    LogOut,
    ChevronRight,
    RefreshCw
} from 'lucide-react-native';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../../styles/theme';

import { DashboardHeader } from '../../components/shared/DashboardHeader';
import { CardBase } from '../../components/ui/CardBase';
import { StandardButton } from '../../components/ui/StandardButton';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ConsumerProfileScreen({ navigation }) {
    const { t, toggleLanguage, locale } = useLanguage();
    const { logout, user } = useAuth();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>


            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. Identity Header */}
                <View style={styles.identityHeader}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <User size={40} color={AppColors.primary} />
                        </View>
                        <TouchableOpacity style={styles.editAvatarBtn}>
                            <RefreshCw size={14} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.nameSection}>
                        <Text style={styles.userName}>{user?.name || 'Jean Dupont'}</Text>
                        <View style={styles.badgeRow}>
                            <View style={styles.trustBadge}>
                                <ShieldCheck size={12} color={AppColors.success} />
                                <Text style={styles.trustBadgeText}>{t('verifiedBuyer')}</Text>
                            </View>
                            <Text style={styles.memberSince}>{t('memberSince')} 2026</Text>
                        </View>
                    </View>

                    <CardBase style={styles.walletCard}>
                        <View style={styles.walletInfo}>
                            <View style={styles.walletIconBox}>
                                <Wallet size={20} color={AppColors.primary} />
                            </View>
                            <View>
                                <Text style={styles.walletLabel}>{t('walletBalance')}</Text>
                                <Text style={styles.walletAmount}>15,500 XAF</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.topUpBtn}>
                            <Text style={styles.topUpText}>+ Top Up</Text>
                        </TouchableOpacity>
                    </CardBase>
                </View>

                {/* 2. Activity Hub */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('activityHub').toUpperCase()}</Text>

                    {/* Order Tracking */}
                    <CardBase style={styles.activityCard}>
                        <View style={styles.activityHeader}>
                            <ShoppingBag size={18} color={AppColors.primary} />
                            <Text style={styles.activityCardTitle}>{t('currentOrders')}</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <View style={styles.orderStatusDot} />
                            <View style={styles.orderInfo}>
                                <Text style={styles.orderPrimary}>Tomatoes (5kg)</Text>
                                <Text style={styles.orderSecondary}>Status: Being Prepared</Text>
                            </View>
                            <ChevronRight size={16} color={AppColors.txtMuted} />
                        </View>
                    </CardBase>

                    <View style={styles.hubGrid}>
                        <TouchableOpacity style={styles.hubItem}>
                            <CardBase style={styles.hubCard}>
                                <History size={20} color={AppColors.primary} />
                                <Text style={styles.hubLabel}>{t('purchaseHistory')}</Text>
                            </CardBase>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.hubItem}>
                            <CardBase style={styles.hubCard}>
                                <Star size={20} color={AppColors.primary} />
                                <Text style={styles.hubLabel}>{t('myReviews')}</Text>
                            </CardBase>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 3. Agro-Essentials (Settings) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('agroEssentials').toUpperCase()}</Text>
                    <CardBase style={styles.settingsContainer}>
                        <SettingRow
                            icon={<MapPin size={20} color={AppColors.txtSecondary} />}
                            label={t('savedAddresses')}
                            onPress={() => { }}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon={<CreditCard size={20} color={AppColors.txtSecondary} />}
                            label={t('paymentMethods')}
                            onPress={() => { }}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon={<Languages size={20} color={AppColors.txtSecondary} />}
                            label={`${t('languageLabel')}: ${t('language')}`}
                            onPress={toggleLanguage}
                        />
                        <View style={styles.divider} />
                        <View style={styles.settingRow}>
                            <View style={styles.settingInner}>
                                <Bell size={20} color={AppColors.txtSecondary} />
                                <Text style={styles.settingLabel}>{t('notificationSettings')}</Text>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ true: AppColors.primary, false: AppColors.border }}
                            />
                        </View>
                    </CardBase>
                </View>

                <StandardButton
                    title={t('logout')}
                    variant="danger"
                    onPress={logout}
                    icon={<LogOut size={18} color="#FFF" />}
                    style={styles.logoutBtn}
                />

                <View style={styles.bottomSpace} />
            </ScrollView>
        </SafeAreaView>
    );
}

const SettingRow = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
        <View style={styles.settingInner}>
            {icon}
            <Text style={styles.settingLabel}>{label}</Text>
        </View>
        <ChevronRight size={18} color={AppColors.txtMuted} />
    </TouchableOpacity>
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
    identityHeader: {
        alignItems: 'center',
        paddingVertical: 10,
        gap: 15,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: AppColors.primaryWash,
        borderWidth: 2,
        borderColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...CommonStyles.shadowSm,
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: AppColors.primary,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    nameSection: {
        alignItems: 'center',
        gap: 4,
    },
    userName: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    trustBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.successBg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: AppColors.successBorder,
        gap: 4,
    },
    trustBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: AppColors.success,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    memberSince: {
        fontSize: 12,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    walletCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        borderRadius: AppSpacing.radiusMd,
        marginTop: 5,
        borderWidth: 1,
        borderColor: AppColors.primarySubtle,
        backgroundColor: AppColors.primaryWash,
    },
    walletInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    walletIconBox: {
        backgroundColor: '#FFF',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: AppColors.primary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    walletAmount: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontMonoBold,
    },
    topUpBtn: {
        backgroundColor: AppColors.primary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
    },
    topUpText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '800',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: AppColors.txtMuted,
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryBlack,
        marginLeft: 4,
    },
    activityCard: {
        padding: 16,
        borderRadius: AppSpacing.radiusMd,
        gap: 12,
    },
    activityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    activityCardTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.page,
        padding: 12,
        borderRadius: 12,
        gap: 12,
    },
    orderStatusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: AppColors.warning,
    },
    orderInfo: {
        flex: 1,
    },
    orderPrimary: {
        fontSize: 14,
        fontWeight: '700',
        color: AppColors.txtPrimary,
    },
    orderSecondary: {
        fontSize: 11,
        color: AppColors.txtMuted,
    },
    hubGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    hubItem: {
        flex: 1,
    },
    hubCard: {
        padding: 16,
        borderRadius: AppSpacing.radiusMd,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 90,
    },
    hubLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: AppColors.txtPrimary,
        textAlign: 'center',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    settingsContainer: {
        borderRadius: AppSpacing.radiusMd,
        paddingVertical: 5,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    settingInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    settingLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: AppColors.txtPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: AppColors.border,
        marginHorizontal: 16,
    },
    logoutBtn: {
        marginTop: 10,
    },
    bottomSpace: {
        height: 40,
    }
});
