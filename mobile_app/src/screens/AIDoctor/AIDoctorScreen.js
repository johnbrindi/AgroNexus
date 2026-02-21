import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { DashboardStatusBar } from '../../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../../components/shared/DashboardHeader';
import { DashboardBottomNav } from '../../components/shared/DashboardBottomNav';
import { SavedLocallyBar } from '../../components/shared/SavedLocallyBar';
import { StandardButton } from '../../components/ui/StandardButton';

export default function AIDoctorScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <DashboardStatusBar />
            <DashboardHeader
                subtitle="DISEASE DETECTION ENGINE"
                title="AI Doctor 🔬"
            />

            {/* 3-Tab Switcher */}
            <View style={styles.tabHeader}>
                <View style={styles.tabSwitcher}>
                    <TouchableOpacity style={[styles.tabBtn, styles.tabBtnActive]}>
                        <Text style={[styles.tabBtnText, styles.tabBtnTextActive]}>📸 Scan Crop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tabBtn}
                        onPress={() => navigation.navigate('AIDoctorChat')}
                    >
                        <Text style={styles.tabBtnText}>💬 Ask AI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn}>
                        <Text style={styles.tabBtnText}>🕓 History</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.resnetPill}>
                    <Text style={styles.resnetText}>ResNet-9</Text>
                </View>
            </View>

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* Scanner Dark Card */}
                <View style={styles.scannerCard}>
                    <Text style={styles.scannerLabel}>LIVE SCANNER — TOMATO FIELD</Text>
                    <Text style={styles.scannerTitle}>Point at tomato leaf to detect</Text>

                    <View style={styles.scanViewport}>
                        {/* Grid Overlay placeholder */}
                        <View style={styles.viewportGrid} />
                        <Text style={styles.viewportEmoji}>🍅</Text>

                        {/* Scan Line placeholder */}
                        <View style={styles.scanLine} />

                        {/* Bounding Box */}
                        <View style={styles.boundingBox}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />

                            <View style={styles.detectionTag}>
                                <Text style={styles.detectionTagText}>⚠️ EARLY BLIGHT</Text>
                            </View>
                        </View>

                        {/* Confidence Panel */}
                        <View style={styles.confidencePanel}>
                            <Text style={styles.confLabel}>CONFIDENCE</Text>
                            <Text style={styles.confValue}>94%</Text>
                            <Text style={styles.confModel}>ResNet-9</Text>
                        </View>
                    </View>

                    <StandardButton
                        title="📸 SCAN TOMATO NOW"
                        variant="primary"
                        size="large"
                        style={styles.scanBtn}
                    />
                </View>

                {/* Tomato Knowledge Card */}
                <View style={styles.knowledgeCard}>
                    <View style={styles.knowledgeHeader}>
                        <View style={styles.knowledgeHeaderText}>
                            <Text style={styles.knowledgeLabel}>🌿 PLANT KNOWLEDGE CARD</Text>
                            <Text style={styles.knowledgeTitle}>Tomato / Tomate</Text>
                            <Text style={styles.knowledgeSci}>Solanum lycopersicum</Text>
                            <Text style={styles.knowledgeLocal}>मराठी: टोमॅटो (Ṭomāṭo)</Text>
                        </View>
                        <Text style={styles.knowledgeEmoji}>🍅</Text>
                    </View>

                    <View style={styles.diseaseBox}>
                        <Text style={styles.diseaseTitle}>Early Blight (Alternaria solani)</Text>
                        <Text style={styles.diseaseDesc}>
                            Dark brown concentric ring lesions on older leaves. Spreads rapidly in warm (24–29°C), humid conditions. Can cause up to 80% yield loss if untreated.
                        </Text>
                    </View>

                    <Text style={styles.treatmentLabel}>TREATMENT STEPS</Text>
                    <TreatmentStep num="1" text="Remove infected leaves at base — bag and dispose, never compost." />
                    <TreatmentStep num="2" text="Apply copper-based fungicide (Bordeaux mixture) every 7–10 days." />
                    <TreatmentStep num="3" text="Water at soil level only — avoid wetting foliage, especially evenings." />
                    <TreatmentStep num="4" text="Mulch around base to prevent soil splash spreading spores upward." />
                </View>

                {/* Scan History Row */}
                <View style={styles.historySection}>
                    <View style={styles.historyHeader}>
                        <Text style={styles.historyTitle}>RECENT SCANS</Text>
                        <TouchableOpacity><Text style={styles.viewAllText}>View All →</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.historyContent}>
                        <HistoryItem emoji="🍅" name="Tomato Today" date="Blight 94%" status="danger" />
                        <HistoryItem emoji="🍅" name="Tomato Feb 19" date="✓ Healthy" status="success" />
                        <HistoryItem emoji="🌿" name="Cassava Feb 17" date="Mosaic 91%" status="danger" />
                        <HistoryItem emoji="🫘" name="Cowpea Feb 14" date="✓ Healthy" status="success" />
                    </ScrollView>
                </View>

                <SavedLocallyBar message="All scan results saved locally" />
            </ScrollView>

            <DashboardBottomNav activeTab="AI_DOC" navigation={navigation} />
        </SafeAreaView>
    );
}

const TreatmentStep = ({ num, text }) => (
    <View style={styles.stepRow}>
        <View style={styles.stepNum}>
            <Text style={styles.stepNumText}>{num}</Text>
        </View>
        <Text style={styles.stepText}>{text}</Text>
    </View>
);

const HistoryItem = ({ emoji, name, date, status }) => (
    <View style={styles.historyItem}>
        <Text style={styles.historyEmoji}>{emoji}</Text>
        <Text style={styles.historyName}>{name}</Text>
        <Text style={[styles.historyStatus, { color: status === 'success' ? AppColors.success : AppColors.dangerLight }]}>{date}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.offwhite,
    },
    tabHeader: {
        backgroundColor: AppColors.forestDark,
        paddingHorizontal: 18,
        paddingBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    tabSwitcher: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(245, 242, 238, 0.07)',
        borderRadius: 8,
        padding: 3,
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 6,
    },
    tabBtnActive: {
        backgroundColor: 'rgba(245, 242, 238, 0.13)',
    },
    tabBtnText: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(245, 242, 238, 0.50)',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    tabBtnTextActive: {
        color: AppColors.txtOnDark,
    },
    resnetPill: {
        backgroundColor: 'rgba(249, 168, 37, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(249, 168, 37, 0.3)',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    resnetText: {
        fontSize: 10,
        fontWeight: '700',
        color: AppColors.gold,
        letterSpacing: 0.5,
        fontFamily: AppTypography.fontPrimaryBold,
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
    scannerCard: {
        backgroundColor: '#0D1F0A', // Dark linear gradient placeholder
        padding: 18,
        borderRadius: AppSpacing.radius,
    },
    scannerLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: 'rgba(245, 242, 238, 0.5)',
        letterSpacing: 1.2,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    scannerTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: AppColors.txtOnDark,
        marginTop: 3,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    scanViewport: {
        height: 160,
        borderRadius: AppSpacing.radiusSm,
        backgroundColor: '#0A1208',
        marginVertical: 12,
        overflow: 'hidden',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewportEmoji: {
        fontSize: 100,
        opacity: 0.12,
        // blur would be applied via Expo-Blur or Image
    },
    scanLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(249, 168, 37, 0.8)',
        // Animation scan-sweep placeholder
    },
    boundingBox: {
        position: 'absolute',
        top: 22,
        left: 52,
        width: 100,
        height: 86,
        borderWidth: 2,
        borderColor: AppColors.gold,
        borderRadius: 6,
    },
    corner: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderColor: AppColors.goldLight,
        borderWidth: 2,
    },
    topLeft: { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 },
    topRight: { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 },
    bottomLeft: { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 },
    bottomRight: { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 },
    detectionTag: {
        position: 'absolute',
        bottom: -26,
        left: 0,
        backgroundColor: AppColors.danger,
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 3,
    },
    detectionTagText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '700',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    confidencePanel: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(245, 242, 238, 0.96)',
        borderRadius: AppSpacing.radiusSm,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(45, 90, 39, 0.2)',
    },
    confLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: AppColors.txtMuted,
        letterSpacing: 0.5,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    confValue: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.forest,
        fontFamily: AppTypography.fontMonoBold,
        lineHeight: 24,
    },
    confModel: {
        fontSize: 9,
        color: AppColors.txtMuted,
        fontWeight: '500',
        fontFamily: AppTypography.fontPrimaryMedium,
    },
    scanBtn: {
        shadowColor: AppColors.forest,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 8,
    },
    knowledgeCard: {
        backgroundColor: '#3E2723', // Dark cocoa linear gradient placeholder
        padding: 16,
        borderRadius: AppSpacing.radius,
    },
    knowledgeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    knowledgeLabel: {
        fontSize: 9,
        color: 'rgba(245, 242, 238, 0.5)',
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    knowledgeTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: AppColors.goldLight,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    knowledgeSci: {
        fontSize: 12,
        color: 'rgba(245, 242, 238, 0.65)',
        fontStyle: 'italic',
        fontFamily: AppTypography.fontPrimary,
    },
    knowledgeLocal: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(249, 168, 37, 0.9)',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    knowledgeEmoji: {
        fontSize: 40,
    },
    diseaseBox: {
        backgroundColor: 'rgba(198, 40, 40, 0.18)',
        borderWidth: 1,
        borderColor: 'rgba(198, 40, 40, 0.3)',
        borderRadius: AppSpacing.radiusSm,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
    },
    diseaseTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#FF8A80',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    diseaseDesc: {
        fontSize: 11,
        color: 'rgba(245, 242, 238, 0.80)',
        marginTop: 3,
        lineHeight: 16.5,
        fontFamily: AppTypography.fontPrimary,
    },
    treatmentLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: 'rgba(245, 242, 238, 0.5)',
        letterSpacing: 1,
        marginBottom: 8,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    stepRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    stepNum: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(45, 90, 39, 0.45)',
        borderWidth: 1,
        borderColor: 'rgba(45, 90, 39, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepNumText: {
        fontSize: 10,
        fontWeight: '700',
        color: AppColors.goldLight,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    stepText: {
        flex: 1,
        fontSize: 11,
        color: 'rgba(245, 242, 238, 0.84)',
        lineHeight: 15,
        fontFamily: AppTypography.fontPrimary,
    },
    historySection: {
        backgroundColor: AppColors.cream,
        borderRadius: AppSpacing.radius,
        borderWidth: 1,
        borderColor: AppColors.border,
        padding: 14,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    historyTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: AppColors.txtMuted,
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    viewAllText: {
        fontSize: 11,
        color: AppColors.forest,
        fontWeight: '700',
    },
    historyContent: {
        gap: 10,
    },
    historyItem: {
        width: 80,
        alignItems: 'center',
        backgroundColor: AppColors.offwhite,
        padding: 8,
        borderRadius: AppSpacing.radiusSm,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    historyEmoji: {
        fontSize: 28,
    },
    historyName: {
        fontSize: 10,
        fontWeight: '700',
        color: AppColors.txtPrimary,
        marginTop: 4,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    historyStatus: {
        fontSize: 9,
        fontWeight: '700',
        marginTop: 2,
        fontFamily: AppTypography.fontPrimaryBold,
    },
});
