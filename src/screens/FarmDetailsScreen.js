import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { ArrowLeft, MapPin, Layers, Tag } from 'lucide-react-native';
import { CardBase } from '../components/ui/CardBase';

const STATUS_COLORS = {
    low: AppColors.danger,
    moderate: AppColors.warning,
    adequate: AppColors.success,
    high: '#7C3AED',
};

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

export default function FarmDetailsScreen({ navigation, route }) {
    const farm = route?.params?.farm ?? {
        name: 'Green Valley Farm',
        location: 'North Sector, Block A',
        size: '0.5 acre',
        cropType: 'Maize',
    };

    // Dummy report data mirroring SoilReportScreen.js
    const basicReport = {
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
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={22} color={AppColors.txtOnPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>
                    Farm Details: {farm.name}
                </Text>
            </View>

            <View style={styles.metaRow}>
                <View style={styles.metaChip}>
                    <MapPin size={12} color={AppColors.txtOnPrimary} />
                    <Text style={styles.metaText}>{farm.location}</Text>
                </View>
                <View style={styles.metaChip}>
                    <Layers size={12} color={AppColors.txtOnPrimary} />
                    <Text style={styles.metaText}>{farm.size}</Text>
                </View>
                <View style={styles.metaChip}>
                    <Tag size={12} color={AppColors.txtOnPrimary} />
                    <Text style={styles.metaText}>{farm.cropType}</Text>
                </View>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <CardBase style={styles.reportCard}>
                    <Text style={styles.sectionTitle}>Basic Report</Text>
                    <View style={styles.nutrientGrid}>
                        {basicReport.nutrients.map((n, i) => (
                            <NutrientCard key={i} {...n} />
                        ))}
                    </View>

                    <View style={styles.physicalGrid}>
                        {basicReport.physical.map((p, i) => (
                            <View key={i} style={styles.physicalItem}>
                                <Text style={styles.physicalLabel}>{p.label}</Text>
                                <Text style={styles.physicalValue}>{p.value}</Text>
                            </View>
                        ))}
                    </View>
                </CardBase>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: AppColors.page },
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
    scroll: { flex: 1 },
    scrollContent: { padding: 16 },
    reportCard: {
        padding: 16,
        borderRadius: AppSpacing.radiusMd,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: AppTypography.fontPrimaryBlack,
        color: AppColors.txtPrimary,
        marginBottom: 16,
    },
    nutrientGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    physicalGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
});
