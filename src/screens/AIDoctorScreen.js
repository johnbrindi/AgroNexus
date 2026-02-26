import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';

import { DashboardHeader } from '../components/shared/DashboardHeader';
import { CardBase } from '../components/ui/CardBase';
import { StatusChip } from '../components/ui/StatusChip';
import {
    MapPin,
    Layers,
    Sprout,
    FileText,
    Zap,
} from 'lucide-react-native';

// ─────────────────────────────────────────────────────────────
// Demo farm list — replace with real API data from backend
// ─────────────────────────────────────────────────────────────
const DEMO_FARMS = [
    {
        id: 'f1',
        name: 'Green Valley Farm',
        location: 'Tamale',
        size: '0.5 acre',
        cropType: 'Maize',
        status: 'Optimal',
        statusVariant: 'success',
        imageUri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
        lastReport: 'Jan 12, 2026',
    },
    {
        id: 'f2',
        name: 'Sunset Wheat Fields',
        location: 'Kumasi',
        size: '1.2 acres',
        cropType: 'Wheat',
        status: 'Needs Water',
        statusVariant: 'warn',
        imageUri: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1200&auto=format&fit=crop',
        lastReport: 'Feb 01, 2026',
    },
    {
        id: 'f3',
        name: 'River Delta Plot',
        location: 'Accra',
        size: '2.0 acres',
        cropType: 'Soybean',
        status: 'Optimal',
        statusVariant: 'success',
        imageUri: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?q=80&w=1200&auto=format&fit=crop',
        lastReport: 'Dec 28, 2025',
    },
];

// ─────────────────────────────────────────────────────────────
// Farm Report Card Component
// ─────────────────────────────────────────────────────────────
function FarmReportCard({ farm, onGenerate }) {
    return (
        <CardBase style={card.wrapper}>
            {/* Banner Image */}
            <ImageBackground
                source={{ uri: farm.imageUri }}
                style={card.banner}
                imageStyle={card.bannerImage}
            >
                <View style={card.bannerOverlay}>
                    {/* Status badge top-left */}
                    <View style={[card.statusBadge,
                    farm.statusVariant === 'warn'
                        ? { backgroundColor: AppColors.warning }
                        : { backgroundColor: AppColors.success }
                    ]}>
                        <Text style={card.statusText}>{farm.status}</Text>
                    </View>

                    {/* Farm name bottom-left */}
                    <View>
                        <Text style={card.farmName}>{farm.name}</Text>
                        <View style={card.locationRow}>
                            <MapPin size={12} color="rgba(255,255,255,0.85)" />
                            <Text style={card.locationText}>{farm.location}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            {/* Info strip */}
            <View style={card.infoStrip}>
                <View style={card.infoItem}>
                    <Layers size={14} color={AppColors.primary} />
                    <Text style={card.infoValue}>{farm.size}</Text>
                    <Text style={card.infoLabel}>Size</Text>
                </View>
                <View style={card.infoDivider} />
                <View style={card.infoItem}>
                    <Sprout size={14} color={AppColors.success} />
                    <Text style={card.infoValue}>{farm.cropType}</Text>
                    <Text style={card.infoLabel}>Crop</Text>
                </View>
                <View style={card.infoDivider} />
                <View style={card.infoItem}>
                    <FileText size={14} color={AppColors.txtMuted} />
                    <Text style={card.infoValue}>{farm.lastReport}</Text>
                    <Text style={card.infoLabel}>Last Report</Text>
                </View>
            </View>

            {/* Action footer */}
            <View style={card.footer}>
                <Text style={card.footerHint}>Generate a new soil report for this farm</Text>
                <TouchableOpacity
                    style={card.generateBtn}
                    onPress={() => onGenerate(farm)}
                    activeOpacity={0.82}
                >
                    <Zap size={15} color={AppColors.txtOnPrimary} />
                    <Text style={card.generateBtnText}>Generate Report</Text>
                </TouchableOpacity>
            </View>
        </CardBase>
    );
}

const card = StyleSheet.create({
    wrapper: {
        padding: 0,
        borderRadius: AppSpacing.radiusLg,
        overflow: 'hidden',
        ...CommonStyles.shadowSm,
    },
    banner: {
        height: 170,
        width: '100%',
        justifyContent: 'flex-end',
    },
    bannerImage: {
        borderTopLeftRadius: AppSpacing.radiusLg,
        borderTopRightRadius: AppSpacing.radiusLg,
    },
    bannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.48)',
        padding: 14,
        justifyContent: 'space-between',
        borderTopLeftRadius: AppSpacing.radiusLg,
        borderTopRightRadius: AppSpacing.radiusLg,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#FFF',
        fontSize: 10,
        fontFamily: AppTypography.fontPrimaryBold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    farmName: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: AppTypography.fontPrimaryBlack,
        marginBottom: 3,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 12,
        fontFamily: AppTypography.fontPrimaryMedium,
    },

    // Info strip
    infoStrip: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: AppColors.card,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.border,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
        gap: 3,
    },
    infoDivider: {
        width: 1,
        backgroundColor: AppColors.border,
        marginVertical: 4,
    },
    infoValue: {
        fontSize: 13,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
        marginTop: 2,
    },
    infoLabel: {
        fontSize: 10,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
    },

    // Footer
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: AppColors.card,
        borderBottomLeftRadius: AppSpacing.radiusLg,
        borderBottomRightRadius: AppSpacing.radiusLg,
        gap: 10,
    },
    footerHint: {
        flex: 1,
        fontSize: 11,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
        lineHeight: 16,
    },
    generateBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: AppColors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: AppSpacing.radiusSm,
    },
    generateBtnText: {
        color: AppColors.txtOnPrimary,
        fontSize: 13,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});

// ─────────────────────────────────────────────────────────────
// FARMS Sub-tab Content
// ─────────────────────────────────────────────────────────────
function FarmsTab({ navigation }) {
    // Replace DEMO_FARMS with your real fetched farms array
    const farms = DEMO_FARMS;

    function handleGenerate(farm) {
        // Navigate to the soil report screen, passing farm data.
        // `report` prop can be passed once you have real backend data.
        navigation.navigate('SoilReport', { farm });
    }

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={farmsTab.scroll}
            showsVerticalScrollIndicator={false}
        >
            <Text style={farmsTab.sectionLabel}>YOUR FARMS</Text>
            {farms.map((farm) => (
                <FarmReportCard key={farm.id} farm={farm} onGenerate={handleGenerate} />
            ))}
            <View style={{ height: 30 }} />
        </ScrollView>
    );
}

const farmsTab = StyleSheet.create({
    scroll: {
        paddingHorizontal: 20,
        paddingTop: 16,
        gap: 18,
    },
    sectionLabel: {
        fontSize: 11,
        fontFamily: AppTypography.fontPrimaryExtraBold,
        color: AppColors.txtMuted,
        letterSpacing: 1,
        marginBottom: 4,
    },
});

// ─────────────────────────────────────────────────────────────
// Main Report Screen
// ─────────────────────────────────────────────────────────────
const TABS = ['FARMS', 'CHAT', 'HISTORY'];

export default function AIDoctorScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('FARMS');

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

            <DashboardHeader
                eyebrow="SOIL ANALYSIS"
                title="Report"
            />

            {/* Sub-tab switcher */}
            <View style={styles.tabContainer}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => {
                            if (tab === 'CHAT') {
                                navigation.navigate('AIDoctorChat');
                            } else {
                                setActiveTab(tab);
                            }
                        }}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tab Content */}
            {activeTab === 'FARMS' && <FarmsTab navigation={navigation} />}

            {activeTab === 'HISTORY' && (
                <View style={styles.emptyState}>
                    <FileText size={42} color={AppColors.txtMuted} />
                    <Text style={styles.emptyTitle}>No History Yet</Text>
                    <Text style={styles.emptyBody}>
                        Reports you generate will appear here for easy reference.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 14,
        gap: 10,
    },
    tab: {
        paddingVertical: 7,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: AppColors.surface,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    activeTab: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
    },
    tabText: {
        fontSize: 11,
        fontWeight: '800',
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimaryExtraBold,
    },
    activeTabText: {
        color: '#FFF',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        gap: 12,
    },
    emptyTitle: {
        fontSize: 18,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
    },
    emptyBody: {
        fontSize: 13,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
        textAlign: 'center',
        lineHeight: 20,
    },
});
