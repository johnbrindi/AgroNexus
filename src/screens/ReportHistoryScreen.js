import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { FileText, ChevronRight, Clock } from 'lucide-react-native';

const HISTORY_DATA = [
    {
        id: '1',
        farm: 'Green Valley Farm',
        date: 'Jan 12, 2026',
        status: 'Optimal',
        type: 'Soil Analysis'
    },
    {
        id: '2',
        farm: 'Sunset Wheat Fields',
        date: 'Feb 01, 2026',
        status: 'Needs Water',
        type: 'Soil Analysis'
    },
    {
        id: '3',
        farm: 'Mesa Orchard',
        date: 'Dec 28, 2025',
        status: 'Adequate',
        type: 'Soil Analysis'
    },
];

export default function ReportHistoryScreen({ navigation }) {
    const { t } = useLanguage();

    const handleReportPress = (report) => {
        // Logic to view old report if needed
        // For now, it stays on history
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header / Sub-tabs */}
            <View style={styles.header}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() => navigation.navigate('Report')}
                    >
                        <Text style={styles.tabText}>{t('report')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() => navigation.navigate('ReportChat')}
                    >
                        <Text style={styles.tabText}>CHAT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                        <Text style={[styles.tabText, styles.activeTabText]}>HISTORY</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Report History</Text>
                    <Text style={styles.subtitle}>View your previous soil analysis results</Text>
                </View>

                {HISTORY_DATA.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.historyItem}
                        onPress={() => handleReportPress(item)}
                    >
                        <View style={styles.iconContainer}>
                            <Clock size={20} color={AppColors.primary} />
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.farmName}>{item.farm}</Text>
                            <Text style={styles.itemMeta}>{item.type} • {item.date}</Text>
                        </View>
                        <View style={styles.statusSection}>
                            <View style={[
                                styles.statusBadge,
                                { backgroundColor: item.status === 'Needs Water' ? AppColors.warningBg : AppColors.successBg }
                            ]}>
                                <Text style={[
                                    styles.statusText,
                                    { color: item.status === 'Needs Water' ? AppColors.warning : AppColors.success }
                                ]}>
                                    {item.status}
                                </Text>
                            </View>
                            <ChevronRight size={18} color={AppColors.txtMuted} />
                        </View>
                    </TouchableOpacity>
                ))}
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
        backgroundColor: AppColors.surface,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.border,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: AppColors.page,
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: AppColors.surface,
        ...CommonStyles.shadowSm,
    },
    tabText: {
        fontSize: 12,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtMuted,
    },
    activeTabText: {
        color: AppColors.primary,
    },
    content: {
        flex: 1,
        padding: AppSpacing.pagePadding,
    },
    titleSection: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontFamily: AppTypography.fontPrimaryBlack,
        color: AppColors.txtPrimary,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtSecondary,
        marginTop: 4,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        borderRadius: AppSpacing.radiusLg,
        padding: 16,
        marginBottom: 12,
        ...CommonStyles.shadowSm,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: AppColors.primaryWash,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    farmName: {
        fontSize: 16,
        fontFamily: AppTypography.fontPrimaryBold,
        color: AppColors.txtPrimary,
        marginBottom: 2,
    },
    itemMeta: {
        fontSize: 12,
        fontFamily: AppTypography.fontPrimaryMedium,
        color: AppColors.txtMuted,
    },
    statusSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 10,
        fontFamily: AppTypography.fontPrimaryBold,
        textTransform: 'uppercase',
    },
});
