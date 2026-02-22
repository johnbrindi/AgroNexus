import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch, useWindowDimensions } from 'react-native';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { DashboardStatusBar } from '../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../components/shared/DashboardHeader';
import { DashboardBottomNav } from '../components/shared/DashboardBottomNav';
import { CardBase } from '../components/ui/CardBase';
import { StandardButton } from '../components/ui/StandardButton';

import { useLanguage } from '../context/LanguageContext';

export default function ProfileScreen({ navigation }) {
    const { width } = useWindowDimensions();
    const { t, locale, toggleLanguage } = useLanguage();
    const [offlineMode, setOfflineMode] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <DashboardStatusBar isOnline={true} />
            <DashboardHeader
                eyebrow={t('memberProfile')}
                title="Amina Njoya"
            />

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* User Info / Avatar */}
                <View style={styles.userSection}>
                    <View style={styles.avatarBox}>
                        <Text style={styles.avatarText}>AN</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Amina Njoya</Text>
                        <Text style={styles.userLoc}>Bafoussam, Cameroon</Text>
                        <View style={styles.badgeRow}>
                            <Text style={styles.badge}>{t('masterFarmer')}</Text>
                        </View>
                    </View>
                </View>

                {/* Impact Tiles 2x2 Grid */}
                <View style={styles.impactGrid}>
                    <ImpactTile label={t('hectares')} value="2.4" unit={t('unitHa')} />
                    <ImpactTile label={t('waterSaved')} value="12k" unit={t('unitLitres')} />
                    <ImpactTile label={t('yieldStreak')} value="7" unit={t('unitWeeks')} />
                    <ImpactTile label={t('healthScore')} value="87" unit="/100" />
                </View>

                {/* Achievements */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('achievements').toUpperCase()}</Text>
                    <View style={styles.achievementGrid}>
                        <AchievementItem emoji="🌾" />
                        <AchievementItem emoji="💧" />
                        <AchievementItem emoji="🏆" />
                        <AchievementItem emoji="🌱" />
                    </View>
                </View>

                {/* Account Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('systemSettings')}</Text>
                    <CardBase style={styles.settingsCard}>
                        <View style={styles.settingRow}>
                            <View style={styles.settingInfo}>
                                <Text style={styles.settingLabel}>{t('offlineFirst')}</Text>
                                <Text style={styles.settingDesc}>{t('offlineDesc')}</Text>
                            </View>
                            <Switch
                                value={offlineMode}
                                onValueChange={setOfflineMode}
                                trackColor={{ true: AppColors.primary, false: AppColors.border }}
                                thumbColor={offlineMode ? '#FFF' : '#FFF'}
                            />
                        </View>
                        <View style={styles.rowDivider} />
                        <View style={styles.settingRow}>
                            <View style={styles.settingInfo}>
                                <Text style={styles.settingLabel}>{t('languageLabel')}</Text>
                                <Text style={styles.settingDesc}>{t('language')}</Text>
                            </View>
                            <TouchableOpacity onPress={toggleLanguage}>
                                <Text style={styles.changeAction}>{t('change')}</Text>
                            </TouchableOpacity>
                        </View>
                    </CardBase>
                </View>

                <StandardButton
                    title={t('logout')}
                    variant="danger"
                    onPress={() => navigation.navigate('Landing')}
                    style={styles.logoutBtn}
                />
            </ScrollView>

            <DashboardBottomNav activeTab="PROFILE" navigation={navigation} />
        </SafeAreaView>
    );
}

const ImpactTile = ({ label, value, unit }) => (
    <CardBase style={styles.impactTile}>
        <Text style={styles.impactLabel}>{label}</Text>
        <View style={styles.impactValueRow}>
            <Text style={styles.impactValue}>{value}</Text>
            <Text style={styles.impactUnit}>{unit}</Text>
        </View>
    </CardBase>
);

const AchievementItem = ({ emoji }) => (
    <View style={styles.achievementBox}>
        <Text style={styles.achievementEmoji}>{emoji}</Text>
    </View>
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
        paddingHorizontal: 22,
        paddingTop: 18,
        paddingBottom: 30,
        gap: 25,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    avatarBox: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: AppColors.surface,
        borderWidth: 1,
        borderColor: AppColors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 28,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 22,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    userLoc: {
        fontSize: 14,
        color: AppColors.txtSecondary,
        marginTop: 2,
        fontFamily: AppTypography.fontPrimary,
    },
    badgeRow: {
        marginTop: 10,
        flexDirection: 'row',
    },
    badge: {
        fontSize: 10,
        fontWeight: '900',
        backgroundColor: AppColors.primaryWash,
        color: AppColors.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    impactGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    impactTile: {
        width: '47.5%', // 2 columns approx
        padding: 18,
        borderRadius: AppSpacing.radiusMd,
    },
    impactLabel: {
        fontSize: 9,
        fontWeight: '800',
        color: AppColors.txtMuted,
        letterSpacing: 0.5,
        fontFamily: AppTypography.fontPrimaryExtraBold,
        marginBottom: 8,
    },
    impactValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    impactValue: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontMonoBold,
    },
    impactUnit: {
        fontSize: 11,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: AppColors.txtMuted,
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryExtraBold,
    },
    achievementGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    achievementBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: AppColors.surface,
        borderWidth: 1,
        borderColor: AppColors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    achievementEmoji: {
        fontSize: 28,
    },
    settingsCard: {
        borderRadius: AppSpacing.radiusMd,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
    },
    settingInfo: {
        flex: 1,
    },
    settingLabel: {
        fontSize: 13,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    settingDesc: {
        fontSize: 11,
        color: AppColors.txtMuted,
        marginTop: 2,
        fontFamily: AppTypography.fontPrimary,
    },
    rowDivider: {
        height: 1,
        backgroundColor: AppColors.border,
        marginHorizontal: 18,
    },
    changeAction: {
        fontSize: 12,
        fontWeight: '700',
        color: AppColors.primary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    logoutBtn: {
        marginTop: 10,
    },
});
