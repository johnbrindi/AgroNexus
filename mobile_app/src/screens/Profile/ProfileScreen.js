import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { DashboardStatusBar } from '../../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../../components/shared/DashboardHeader';
import { DashboardBottomNav } from '../../components/shared/DashboardBottomNav';
import { SavedLocallyBar } from '../../components/shared/SavedLocallyBar';
import { CardBase } from '../../components/ui/CardBase';
import { StandardButton } from '../../components/ui/StandardButton';

export default function ProfileScreen({ navigation, onLogout }) {
    const [offlineMode, setOfflineMode] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <DashboardStatusBar />
            <DashboardHeader
                subtitle="MEMBER SINCE JUNE 2024"
                title="My Profile 👤"
            />

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* User Stats Card */}
                <CardBase accentColor="forest">
                    <View style={styles.statsCard}>
                        <View style={styles.statsHeader}>
                            <View style={styles.avatarLarge}>
                                <Text style={styles.avatarLargeText}>AN</Text>
                            </View>
                            <View style={styles.userMeta}>
                                <Text style={styles.userName}>Amina Njoya</Text>
                                <Text style={styles.userRole}>Master Farmer · Bafoussam</Text>
                                <View style={styles.levelRow}>
                                    <Text style={styles.levelText}>Level 12</Text>
                                    <View style={styles.levelBar}>
                                        <View style={[styles.levelProgress, { width: '65%' }]} />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Impact Grid */}
                        <View style={styles.impactGrid}>
                            <ImpactItem label="Hectares" value="2.4" sub="Managed" icon="🚜" />
                            <ImpactItem label="Water Saved" value="12k" sub="Litres" icon="💧" />
                            <ImpactItem label="Yield" value="+22%" sub="vs Region" icon="📈" />
                        </View>
                    </View>
                </CardBase>

                {/* Achievements Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
                    <TouchableOpacity><Text style={styles.viewAll}>View All →</Text></TouchableOpacity>
                </View>

                <View style={styles.achievementGrid}>
                    <AchievementCard emoji="🎯" title="Irrigation Pro" date="Feb 12" gold />
                    <AchievementCard emoji="🔎" title="Blight Spotter" date="Feb 19" />
                    <AchievementCard emoji="🤝" title="Top Seller" date="Jan 28" />
                    <AchievementCard emoji="⚡" title="Early Adopter" date="Jun 24" />
                </View>

                {/* Settings & Tools */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>SETTINGS & TOOLS</Text>
                </View>

                <CardBase accentColor="slate">
                    <View style={styles.settingsBox}>
                        <SettingRow
                            icon="📶"
                            title="Offline First Mode"
                            desc="Save all scans and data locally first"
                            right={<Switch value={offlineMode} onValueChange={setOfflineMode} trackColor={{ true: AppColors.forest }} />}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon="☁️"
                            title="Cloud Sync"
                            desc="Last sync: 12 minutes ago"
                            right={<TouchableOpacity><Text style={styles.syncBtn}>SYNC NOW</Text></TouchableOpacity>}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon="🌐"
                            title="Language"
                            desc="English (UK) — Swahili available"
                            right={<Text style={styles.valText}>Change</Text>}
                        />
                    </View>
                </CardBase>

                {/* Danger Zone */}
                <StandardButton
                    title="🚪 LOG OUT"
                    variant="danger"
                    size="large"
                    onPress={() => navigation.navigate('Landing')}
                    style={styles.logoutBtn}
                />

                <SavedLocallyBar message="Settings saved on this device" />
            </ScrollView>

            <DashboardBottomNav activeTab="PROFILE" navigation={navigation} />
        </SafeAreaView>
    );
}

const ImpactItem = ({ label, value, sub, icon }) => (
    <View style={styles.impactItem}>
        <Text style={styles.impactIcon}>{icon}</Text>
        <Text style={styles.impactValue}>{value}</Text>
        <Text style={styles.impactLabel}>{label}</Text>
        <Text style={styles.impactSub}>{sub}</Text>
    </View>
);

const AchievementCard = ({ emoji, title, date, gold }) => (
    <View style={[styles.aCard, gold && styles.aCardGold]}>
        <Text style={styles.aEmoji}>{emoji}</Text>
        <Text style={styles.aTitle}>{title}</Text>
        <Text style={styles.aDate}>{date}</Text>
    </View>
);

const SettingRow = ({ icon, title, desc, right }) => (
    <View style={styles.settingRow}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingText}>
            <Text style={styles.settingTitle}>{title}</Text>
            <Text style={styles.settingDesc}>{desc}</Text>
        </View>
        {right}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.offwhite,
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
    statsCard: {
        padding: 18,
    },
    statsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    avatarLarge: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#795548',
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarLargeText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    userMeta: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    userRole: {
        fontSize: 12,
        color: AppColors.txtMuted,
        marginTop: 2,
        fontFamily: AppTypography.fontPrimary,
    },
    levelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    levelText: {
        fontSize: 11,
        fontWeight: '700',
        color: AppColors.forest,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    levelBar: {
        flex: 1,
        height: 6,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    levelProgress: {
        height: '100%',
        backgroundColor: AppColors.forest,
        borderRadius: 3,
    },
    impactGrid: {
        flexDirection: 'row',
        backgroundColor: AppColors.offwhiteWarm,
        borderRadius: AppSpacing.radiusSm,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    impactItem: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: AppColors.border,
    },
    impactIcon: { fontSize: 18, marginBottom: 4 },
    impactValue: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.forest,
        fontFamily: AppTypography.fontMonoBold,
    },
    impactLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: AppColors.txtMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 2,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    impactSub: {
        fontSize: 9,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: AppColors.txtMuted,
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    viewAll: {
        fontSize: 11,
        color: AppColors.forest,
        fontWeight: '700',
    },
    achievementGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    aCard: {
        width: '23%', // 4 items per row
        backgroundColor: AppColors.cream,
        borderRadius: 12,
        padding: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    aCardGold: {
        borderColor: AppColors.gold,
        backgroundColor: '#FFFDE7',
    },
    aEmoji: { fontSize: 24, marginBottom: 4 },
    aTitle: {
        fontSize: 8,
        fontWeight: '700',
        color: AppColors.txtPrimary,
        textAlign: 'center',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    aDate: {
        fontSize: 7,
        color: AppColors.txtMuted,
        marginTop: 2,
        fontFamily: AppTypography.fontPrimary,
    },
    settingsBox: {
        padding: 4,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
    },
    settingIcon: { fontSize: 20 },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    settingDesc: {
        fontSize: 10,
        color: AppColors.txtMuted,
        marginTop: 1,
        fontFamily: AppTypography.fontPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(121, 85, 72, 0.08)',
        marginHorizontal: 12,
    },
    syncBtn: {
        fontSize: 10,
        fontWeight: '900',
        color: AppColors.forest,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    valText: {
        fontSize: 11,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    logoutBtn: {
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: 'rgba(198,40,40,0.2)',
    },
});
