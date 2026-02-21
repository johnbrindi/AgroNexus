import { View, Text, StyleSheet, ScrollView, Platform, useWindowDimensions } from 'react-native';
import { LandingColors, LandingSpacing, LandingTypography } from '../../constants';
import { GlassCard } from '../../ui/GlassCard';
import { AnimatedLeaf } from './AnimatedLeaf';
import { Bot, Cpu, ShoppingCart, Activity, Droplet, Thermometer } from 'lucide-react-native';

export const SystemIntelligenceSection = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1100;

    return (
        <View style={[styles.section, { paddingHorizontal: isMobile ? 16 : 48 }]}>
            <View style={styles.header}>
                <View style={styles.sectionBadge}>
                    <Text style={styles.badgeText}>🔬 System Intelligence</Text>
                </View>
                <Text style={[styles.title, { fontSize: isMobile ? 32 : 48 }]}>Built on Proven AgTech Architecture</Text>
                <Text style={[styles.subtitle, { fontSize: isMobile ? 16 : 18 }]}>
                    Our platform integrates cutting-edge AI, field-hardened IoT sensors, and real-time analytics to deliver actionable insights directly to your farm.
                </Text>
            </View>

            <View style={styles.grid}>
                {/* Card 1 - AI Engine */}
                <GlassCard style={[styles.cardAIEngine, { minWidth: isMobile ? '100%' : 400, flex: isTablet ? 0 : 2 }]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconBox, { backgroundColor: '#4CAF5015' }]}>
                            <Bot color={LandingColors.leafGreen} size={24} />
                        </View>
                        <Text style={styles.cardTitle}>AI Engine</Text>
                    </View>
                    <Text style={styles.cardDesc}>
                        Deep learning models trained on 2M+ crop images detect diseases, pests, and nutrient deficiencies with clinical precision.
                    </Text>
                    <View style={styles.animContainer}>
                        <AnimatedLeaf />
                        <View style={styles.confidenceBadge}>
                            <Text style={styles.confText}>DETECTION CONFIDENCE</Text>
                            <Text style={styles.confValue}>98%</Text>
                        </View>
                    </View>
                </GlassCard>

                <View style={[styles.rightCol, { minWidth: isMobile ? '100%' : 400 }]}>
                    <View style={styles.topRow}>
                        {/* Card 2 - Field Hardware */}
                        <GlassCard style={[styles.cardHardware, { minWidth: isMobile ? '100%' : 200 }]}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: '#4CAF5015' }]}>
                                    <Cpu color={LandingColors.leafGreen} size={24} />
                                </View>
                                <Text style={styles.cardTitle}>Field Hardware</Text>
                            </View>
                            <Text style={styles.cardDescSmall}>
                                Military-grade sensors monitor soil, weather, and crop health 24/7.
                            </Text>
                            <View style={styles.hardwareGrid}>
                                <HardwareItem emoji="🌡️" label="Soil Sensors" />
                                <HardwareItem emoji="☁️" label="Weather Stations" />
                            </View>
                        </GlassCard>

                        {/* Card 3 - Marketplace */}
                        <View style={[styles.cardMarket, { minWidth: isMobile ? '100%' : 200 }]}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: '#FFFFFF20' }]}>
                                    <ShoppingCart color="#FFFFFF" size={24} />
                                </View>
                                <Text style={[styles.cardTitle, { color: '#FFFFFF' }]}>Agro Marketplace</Text>
                            </View>
                            <Text style={[styles.cardDescSmall, { color: 'rgba(255, 255, 255, 0.7)' }]}>
                                Connect directly with verified buyers and sellers. Fair pricing, zero middlemen.
                            </Text>
                            <View style={styles.marketPreview}>
                                <MarketItem label="Organic Maize" price="450 FCFA/kg" emoji="🌽" />
                                <MarketItem label="Fresh Tomatoes" price="1,200 FCFA/kg" emoji="🍅" />
                            </View>
                        </View>
                    </View>

                    {/* Card 4 - IoT Dashboard */}
                    <GlassCard style={styles.cardDashboard}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconBox, { backgroundColor: '#4CAF5015' }]}>
                                <Activity color={LandingColors.leafGreen} size={24} />
                            </View>
                            <Text style={styles.cardTitle}>Real-Time IoT Dashboard</Text>
                        </View>
                        <Text style={styles.cardDescDashboard}>
                            High-contrast, sunlight-readable metrics designed for field use. Monitor NPK levels, soil moisture, and more at a glance.
                        </Text>
                        <View style={styles.metricsRow}>
                            <MetricProgress label="Soil Moisture" value="62%" icon={<Droplet size={16} color={LandingColors.leafGreen} />} color={LandingColors.leafGreen} />
                            <MetricProgress label="NPK Balance" value="Optimal" icon={<Activity size={16} color={LandingColors.leafGreen} />} color={LandingColors.leafGreen} />
                        </View>
                    </GlassCard>
                </View>
            </View>
        </View>
    );
};

const HardwareItem = ({ emoji, label }) => (
    <View style={styles.hItem}>
        <Text style={styles.hEmoji}>{emoji}</Text>
        <Text style={styles.hLabel}>{label}</Text>
    </View>
);

const MarketItem = ({ label, price, emoji }) => (
    <View style={styles.mItem}>
        <Text style={styles.mEmoji}>{emoji}</Text>
        <View>
            <Text style={styles.mLabel}>{label}</Text>
            <Text style={styles.mPrice}>{price}</Text>
        </View>
    </View>
);

const MetricProgress = ({ label, value, icon, color }) => (
    <View style={styles.metricItem}>
        <View style={styles.metricTop}>
            <Text style={styles.metricLabel}>{label}</Text>
            <Text style={[styles.metricValue, { color }]}>{value}</Text>
        </View>
        <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '70%', backgroundColor: color }]} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    section: {
        paddingVertical: LandingSpacing.sectionPaddingV,
        paddingHorizontal: LandingSpacing.sectionPaddingH,
        backgroundColor: '#FFFFFF',
    },
    header: {
        alignItems: 'center',
        marginBottom: 80,
    },
    sectionBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: LandingColors.leafGreen + '15',
        marginBottom: 24,
    },
    badgeText: {
        fontSize: 14,
        fontWeight: '700',
        color: LandingColors.leafGreen,
    },
    title: {
        fontSize: LandingTypography.sectionTitleSize,
        fontWeight: '800',
        color: LandingColors.textPrimary,
        textAlign: 'center',
        letterSpacing: -1.5,
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 18,
        color: LandingColors.textSecondary,
        textAlign: 'center',
        maxWidth: 800,
        lineHeight: 28,
    },
    grid: {
        flexDirection: 'row',
        gap: 24,
        flexWrap: 'wrap',
    },
    cardAIEngine: {
        flex: 2,
        minHeight: 800,
        minWidth: 400,
    },
    rightCol: {
        flex: 3,
        gap: 24,
        minWidth: 400,
    },
    topRow: {
        flexDirection: 'row',
        gap: 24,
        flexWrap: 'wrap',
    },
    cardHardware: {
        flex: 1,
        minHeight: 400,
    },
    cardMarket: {
        flex: 1,
        minHeight: 400,
        backgroundColor: LandingColors.deepSlate,
        borderRadius: LandingSpacing.cardRadius,
        padding: LandingSpacing.cardPadding,
    },
    cardDashboard: {
        minHeight: 400,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: LandingColors.textPrimary,
    },
    cardDesc: {
        fontSize: 16,
        color: LandingColors.textSecondary,
        lineHeight: 24,
        marginBottom: 40,
    },
    cardDescSmall: {
        fontSize: 14,
        color: LandingColors.textSecondary,
        lineHeight: 20,
        marginBottom: 32,
    },
    cardDescDashboard: {
        fontSize: 16,
        color: LandingColors.textSecondary,
        lineHeight: 24,
        marginBottom: 32,
        maxWidth: 600,
    },
    animContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LandingColors.softGray,
        borderRadius: 20,
        position: 'relative',
    },
    confidenceBadge: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    confText: {
        fontSize: 10,
        fontWeight: '800',
        color: LandingColors.textSecondary,
        marginBottom: 4,
    },
    confValue: {
        fontSize: 24,
        fontWeight: '800',
        color: LandingColors.leafGreen,
    },
    hardwareGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    hItem: {
        flex: 1,
        backgroundColor: LandingColors.softGray,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    hEmoji: {
        fontSize: 24,
        marginBottom: 8,
    },
    hLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: LandingColors.textPrimary,
        textAlign: 'center',
    },
    marketPreview: {
        gap: 12,
        marginTop: 24,
    },
    mItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 12,
        borderRadius: 12,
    },
    mEmoji: {
        fontSize: 24,
    },
    mLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    mPrice: {
        fontSize: 12,
        color: LandingColors.sunshineYellow,
        fontWeight: '600',
    },
    metricsRow: {
        gap: 20,
    },
    metricItem: {
        gap: 12,
    },
    metricTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metricLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: LandingColors.textPrimary,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: '700',
    },
    progressBar: {
        height: 8,
        backgroundColor: LandingColors.softGray,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
});
