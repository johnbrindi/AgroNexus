import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView as RNSafeAreaView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import {
    ArrowLeft,
    Trash2,
    MapPin,
    Layers,
    Tag,
    ChevronUp,
    ChevronDown,
    Cpu,
} from 'lucide-react-native';

// ─────────────────────────────────────────────────────────────
// Static / placeholder colours for status indicators
// ─────────────────────────────────────────────────────────────
const STATUS_COLORS = {
    low: AppColors.danger,
    moderate: AppColors.warning,
    adequate: AppColors.success,
    high: '#7C3AED',
};

// ─────────────────────────────────────────────────────────────
// Reusable sub-components
// ─────────────────────────────────────────────────────────────

/** Collapsible section with a bold title and chevron toggle */
function SectionAccordion({ title, subtitle, defaultOpen = true, children }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <View style={acc.wrapper}>
            <TouchableOpacity
                style={acc.header}
                onPress={() => setOpen((v) => !v)}
                activeOpacity={0.7}
            >
                <View>
                    <Text style={acc.title}>{title}</Text>
                    {subtitle ? <Text style={acc.subtitle}>{subtitle}</Text> : null}
                </View>
                {open
                    ? <ChevronUp size={20} color={AppColors.txtSecondary} />
                    : <ChevronDown size={20} color={AppColors.txtSecondary} />}
            </TouchableOpacity>
            {open && <View style={acc.body}>{children}</View>}
        </View>
    );
}

const acc = StyleSheet.create({
    wrapper: {
        backgroundColor: AppColors.card,
        borderRadius: AppSpacing.radiusMd,
        marginBottom: 14,
        overflow: 'hidden',
        ...CommonStyles.shadowSm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.border,
    },
    title: {
        fontSize: 16,
        fontFamily: AppTypography.fontPrimaryBlack,
        color: AppColors.txtPrimary,
    },
    subtitle: {
        fontSize: 11,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
        marginTop: 2,
    },
    body: {
        padding: 16,
    },
});

/** Two-column nutrient card used in Basic Report */
function NutrientCard({ label, value, unit, status }) {
    const dot = STATUS_COLORS[status?.toLowerCase()] ?? AppColors.txtMuted;
    return (
        <View style={nc.card}>
            <Text style={nc.label}>{label}</Text>
            <Text style={nc.value}>
                {value} <Text style={nc.unit}>{unit}</Text>
            </Text>
            {status ? (
                <View style={nc.statusRow}>
                    <View style={[nc.dot, { backgroundColor: dot }]} />
                    <Text style={[nc.statusText, { color: dot }]}>{status}</Text>
                </View>
            ) : null}
        </View>
    );
}

const nc = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: AppColors.card,
        borderRadius: AppSpacing.radiusSm,
        padding: 14,
        marginBottom: 12,
        ...CommonStyles.shadowXs,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    label: {
        fontSize: 12,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
        marginBottom: 4,
    },
    value: {
        fontSize: 20,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
    },
    unit: {
        fontSize: 12,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 6,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    statusText: {
        fontSize: 12,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});

/** Single row in the Advanced Report table */
function AdvancedTableRow({ label, value, last }) {
    return (
        <View style={[atr.row, last && { borderBottomWidth: 0 }]}>
            <Text style={atr.label}>{label}</Text>
            <Text style={atr.value}>{value}</Text>
        </View>
    );
}

const atr = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.border,
    },
    label: {
        fontSize: 13,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtSecondary,
    },
    value: {
        fontSize: 13,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
    },
});

/** Numbered fertiliser recommendation row */
function FertiliserRow({ step, title, detail }) {
    return (
        <View style={fr.row}>
            <View style={fr.badge}>
                <Text style={fr.badgeNum}>{step}</Text>
            </View>
            <View style={fr.textBlock}>
                <Text style={fr.title}>{title}</Text>
                {detail ? <Text style={fr.detail}>{detail}</Text> : null}
            </View>
        </View>
    );
}

const fr = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: AppColors.card,
        borderRadius: AppSpacing.radiusSm,
        padding: 14,
        marginBottom: 10,
        ...CommonStyles.shadowXs,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    badge: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: AppColors.primaryWash,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeNum: {
        fontSize: 14,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.primary,
    },
    textBlock: { flex: 1 },
    title: {
        fontSize: 14,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
        lineHeight: 20,
    },
    detail: {
        fontSize: 12,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
        marginTop: 2,
    },
});

// ─────────────────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────────────────

/**
 * SoilReportScreen
 *
 * Props (passed via navigation.navigate):
 *   farm  – { name, location, size, cropType }
 *   report – {
 *     basicReport:   { nutrients: [{ label, value, unit, status }], physical: [...] },
 *     insights:      { text: string },
 *     nutrientPlan:  { targetYield, basalItems: [...], topdressItems: [...] },
 *     advancedReport: { sections: [{ heading, rows: [{ label, value }] }] }
 *   }
 *
 * Falls back to demo data if props are absent.
 */
export default function SoilReportScreen({ navigation, route }) {
    const farm = route?.params?.farm ?? DEMO.farm;
    const report = route?.params?.report ?? DEMO.report;

    const { basicReport, insights, nutrientPlan, advancedReport } = report;

    return (
        <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
            {/* ── Header ── */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={22} color={AppColors.txtOnPrimary} />
                </TouchableOpacity>
                <Text style={s.headerTitle} numberOfLines={1}>
                    Soil Report for {farm.name}
                </Text>
                <TouchableOpacity style={s.deleteBtn}>
                    <Trash2 size={20} color={AppColors.txtOnPrimary} />
                </TouchableOpacity>
            </View>

            {/* ── Farm Meta Chips ── */}
            <View style={s.metaRow}>
                <View style={s.metaChip}>
                    <MapPin size={12} color={AppColors.txtOnPrimary} />
                    <Text style={s.metaText}>{farm.location}</Text>
                </View>
                <View style={s.metaChip}>
                    <Layers size={12} color={AppColors.txtOnPrimary} />
                    <Text style={s.metaText}>{farm.size}</Text>
                </View>
                <View style={s.metaChip}>
                    <Tag size={12} color={AppColors.txtOnPrimary} />
                    <Text style={s.metaText}>{farm.cropType}</Text>
                </View>
            </View>

            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── 1. Basic Report ── */}
                <SectionAccordion title="Basic Report" defaultOpen>
                    <View style={s.nutrientGrid}>
                        {(basicReport.nutrients ?? []).map((n, i) => (
                            <NutrientCard key={i} {...n} />
                        ))}
                    </View>

                    {basicReport.physical?.length > 0 && (
                        <View style={s.physicalGrid}>
                            {basicReport.physical.map((p, i) => (
                                <View key={i} style={s.physicalItem}>
                                    <Text style={s.physicalLabel}>{p.label}</Text>
                                    <Text style={s.physicalValue}>{p.value}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </SectionAccordion>

                {/* ── 2. Report Insights ── */}
                <SectionAccordion title="Report Insights" subtitle="Powered by AgroNexus AI">
                    <View style={s.insightsCard}>
                        <View style={s.insightsAvatarRow}>
                            <View style={s.insightsAvatar}>
                                <Cpu size={18} color={AppColors.primary} />
                            </View>
                            <Text style={s.insightsAvatarLabel}>AgroNexus AI</Text>
                        </View>
                        <Text style={s.insightsText}>{insights.text}</Text>
                    </View>
                </SectionAccordion>

                {/* ── 3. Nutrient Management Plan ── */}
                <SectionAccordion title="Nutrient Management Plan">
                    <Text style={s.planIntro}>
                        You should be targeting a yield of{' '}
                        <Text style={s.planBold}>{nutrientPlan.targetYield}</Text>.{'\n'}
                        To achieve this, you should apply the following fertilisers and nutrients:
                    </Text>

                    {nutrientPlan.basalItems?.length > 0 && (
                        <>
                            <Text style={s.planSubHead}>Basal fertiliser application</Text>
                            {nutrientPlan.basalItems.map((it, i) => (
                                <FertiliserRow key={i} step={i + 1} title={it.title} detail={it.detail} />
                            ))}
                        </>
                    )}

                    {nutrientPlan.topdressItems?.length > 0 && (
                        <>
                            <Text style={s.planSubHead}>Topdress fertiliser</Text>
                            {nutrientPlan.topdressItems.map((it, i) => (
                                <FertiliserRow
                                    key={i}
                                    step={nutrientPlan.basalItems.length + i + 1}
                                    title={it.title}
                                    detail={it.detail}
                                />
                            ))}
                        </>
                    )}
                </SectionAccordion>

                {/* ── 4. Advanced Report ── */}
                <SectionAccordion title="Advanced Report" defaultOpen={false}>
                    {(advancedReport.sections ?? []).map((sec, si) => (
                        <View key={si} style={s.advSection}>
                            <Text style={s.advSectionHead}>{sec.heading}</Text>
                            {sec.rows.map((r, ri) => (
                                <AdvancedTableRow
                                    key={ri}
                                    label={r.label}
                                    value={r.value}
                                    last={ri === sec.rows.length - 1}
                                />
                            ))}
                        </View>
                    ))}
                </SectionAccordion>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

// ─────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: AppColors.page },

    // Header
    header: {
        backgroundColor: AppColors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 12,
    },
    backBtn: { padding: 4 },
    headerTitle: {
        flex: 1,
        fontSize: 17,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtOnPrimary,
    },
    deleteBtn: {
        width: 38,
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Meta chips row
    metaRow: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: AppColors.primaryLight,
        flexWrap: 'wrap',
    },
    metaChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtOnPrimary,
        opacity: 0.9,
    },

    // Scroll
    scroll: { flex: 1 },
    scrollContent: {
        padding: 16,
        paddingTop: 20,
    },

    // Basic Report – nutrient grid
    nutrientGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    // Basic Report – physical metrics
    physicalGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 0,
        backgroundColor: AppColors.surface,
        borderRadius: AppSpacing.radiusSm,
        borderWidth: 1,
        borderColor: AppColors.border,
        overflow: 'hidden',
    },
    physicalItem: {
        width: '50%',
        padding: 14,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: AppColors.border,
    },
    physicalLabel: {
        fontSize: 11,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
        marginBottom: 4,
    },
    physicalValue: {
        fontSize: 15,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
    },

    // Insights
    insightsCard: {
        backgroundColor: AppColors.card,
        borderRadius: AppSpacing.radiusSm,
        padding: 16,
        ...CommonStyles.shadowXs,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    insightsAvatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },
    insightsAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: AppColors.primaryWash,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: AppColors.primarySubtle,
    },
    insightsAvatarLabel: {
        fontSize: 15,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
    },
    insightsText: {
        fontSize: 14,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtSecondary,
        lineHeight: 22,
    },

    // Nutrient Management
    planIntro: {
        fontSize: 13,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtSecondary,
        lineHeight: 20,
        marginBottom: 16,
    },
    planBold: {
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
    },
    planSubHead: {
        fontSize: 13,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
        marginBottom: 10,
        marginTop: 4,
    },

    // Advanced Report
    advSection: {
        marginBottom: 20,
    },
    advSectionHead: {
        fontSize: 14,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.borderStrong,
    },
});

// ─────────────────────────────────────────────────────────────
// Demo data  — used when no route.params are present
// ─────────────────────────────────────────────────────────────
const DEMO = {
    farm: {
        name: 'Green Valley Field 3',
        location: 'Tamale',
        size: '0.5 acre',
        cropType: 'Maize Field',
    },
    report: {
        basicReport: {
            nutrients: [
                { label: 'Nitrogen', value: '1.0', unit: 'g/kg', status: 'Low' },
                { label: 'Phosphorus', value: '9', unit: 'mg/kg', status: 'Low' },
                { label: 'Potassium', value: '74', unit: 'mg/kg', status: 'Moderate' },
                { label: 'Soil pH', value: '6.0', unit: '', status: 'Adequate' },
            ],
            physical: [
                { label: 'Temperature', value: '96.5°C' },
                { label: 'Moisture', value: '6.0%' },
                { label: 'EC', value: '0.0 uS/cm' },
                { label: 'Soil Texture', value: 'Sandy loam' },
            ],
        },
        insights: {
            text:
                'Your soil test shows low nitrogen and phosphorus, which will reduce soybean growth and yield if not corrected, while potassium and soil pH are adequate and support good nutrient uptake.\n\nTo achieve the target yield of 3,150 kg, apply the recommended NPK 12-30-17 fertiliser as a basal application placed 10 cm deep and 10 cm away from the planting hills to reduce losses, especially in your sandy loam soil where nutrients can leach easily.\n\nTopdress at the 9 to 10 leaf stage or during second weeding so the crop can use nitrogen efficiently, and apply manure before planting if available to improve soil organic matter and help retain nutrients through the season.',
        },
        nutrientPlan: {
            targetYield: '0.5 tonnes',
            basalItems: [
                { title: '3 kilograms of Urea (GHS 32).', detail: 'Apply 0.2 grams per hill.' },
                { title: '5 kilograms of NPK 12-30-17 (GHS 55).', detail: 'Apply 10 cm deep.' },
            ],
            topdressItems: [
                { title: '18 kilograms of Urea (GHS 207).', detail: 'Apply 1.3 grams per hill.' },
            ],
        },
        advancedReport: {
            sections: [
                {
                    heading: 'Soil Chemical Properties',
                    rows: [
                        { label: 'Organic Carbon', value: '5.7 g/kg' },
                        { label: 'Total Carbon', value: '7.2 g/kg' },
                        { label: 'Nitrogen', value: '1.1 g/km' },
                        { label: 'pH', value: '5.9' },
                        { label: 'CEC', value: '18.4 cmol/kg' },
                    ],
                },
                {
                    heading: 'Soil Physical Properties',
                    rows: [
                        { label: 'Sand', value: '62%' },
                        { label: 'Silt', value: '18%' },
                        { label: 'Clay', value: '20%' },
                        { label: 'Texture Class', value: 'Sandy Loam' },
                        { label: 'Bulk Density', value: '1.48 g/cm³' },
                    ],
                },
            ],
        },
    },
};
