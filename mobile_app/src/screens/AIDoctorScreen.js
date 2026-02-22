import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { DashboardStatusBar } from '../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../components/shared/DashboardHeader';
import { DashboardBottomNav } from '../components/shared/DashboardBottomNav';
import { CardBase } from '../components/ui/CardBase';
import { StandardButton } from '../components/ui/StandardButton';
import { StatusChip } from '../components/ui/StatusChip';

export default function AIDoctorScreen({ navigation }) {
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <DashboardStatusBar isOnline={true} />
            <DashboardHeader
                eyebrow="DISEASE DETECTION"
                title="AI Doctor"
            />

            {/* v3 Sub-tab switcher */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={[styles.tabText, styles.activeTabText]}>SCANNER</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => navigation.navigate('AIDoctorChat')}
                >
                    <Text style={styles.tabText}>CHAT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>HISTORY</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* Scanner Section */}
                <View style={styles.scannerWrapper}>
                    <View style={styles.viewfinder}>
                        {/* Brackets */}
                        <View style={[styles.bracket, styles.tl]} />
                        <View style={[styles.bracket, styles.tr]} />
                        <View style={[styles.bracket, styles.bl]} />
                        <View style={[styles.bracket, styles.br]} />

                        <Text style={styles.viewfinderHint}>Align leaf within frame</Text>

                        {/* Confidence Glass Panel */}
                        <View style={styles.confidenceGlass}>
                            <Text style={styles.confLabel}>CONFIDENCE</Text>
                            <Text style={styles.confValue}>94%</Text>
                            <StatusChip label="DETECTED" variant="warn" />
                        </View>
                    </View>
                    <StandardButton title="CAPTURE & ANALYZE" variant="primary" style={styles.scanBtn} />
                </View>

                {/* Analysis Result / Knowledge Card */}
                <CardBase style={styles.knowledgeCard}>
                    <View style={styles.knowledgeHeader}>
                        <View>
                            <Text style={styles.kEyebrow}>KNOWLEDGE CARD</Text>
                            <Text style={styles.kTitle}>Early Blight</Text>
                            <Text style={styles.kSci}>Alternaria solani</Text>
                        </View>
                        <View style={styles.kIconBox}>
                            <Text style={styles.kIcon}>🍄</Text>
                        </View>
                    </View>

                    <View style={styles.kDivider} />

                    <View style={styles.kSection}>
                        <Text style={styles.kSectionTitle}>Symptom Check</Text>
                        <Text style={styles.kText}>Dark brown spots with concentric rings. Starting on older, lower leaves.</Text>
                    </View>

                    <View style={styles.kSection}>
                        <Text style={styles.kSectionTitle}>Treatment Plan</Text>
                        <View style={styles.stepRow}>
                            <Text style={styles.stepDot}>•</Text>
                            <Text style={styles.stepText}>Prune infected foliage immediately.</Text>
                        </View>
                        <View style={styles.stepRow}>
                            <Text style={styles.stepDot}>•</Text>
                            <Text style={styles.stepText}>Avoid overhead irrigation.</Text>
                        </View>
                        <View style={styles.stepRow}>
                            <Text style={styles.stepDot}>•</Text>
                            <Text style={styles.stepText}>Apply copper-based fungicide.</Text>
                        </View>
                    </View>

                    <StandardButton
                        title="VIEW TREATMENT GUIDE"
                        variant="secondary"
                        size="small"
                        style={styles.guideBtn}
                    />
                </CardBase>
            </ScrollView>

            <DashboardBottomNav activeTab="AI_DOC" navigation={navigation} />
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
        paddingHorizontal: 22,
        paddingBottom: 16,
        gap: 12,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: AppColors.inputBg,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    activeTab: {
        backgroundColor: '#000',
        borderColor: '#000',
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
    contentScroll: {
        flex: 1,
    },
    scrollPadding: {
        paddingHorizontal: 22,
        paddingBottom: 30,
        gap: 20,
    },
    scannerWrapper: {
        gap: 15,
    },
    viewfinder: {
        height: 280,
        backgroundColor: '#000',
        borderRadius: AppSpacing.radiusLg,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    bracket: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: AppColors.primary,
        borderWidth: 4,
    },
    tl: { top: 30, left: 30, borderRightWidth: 0, borderBottomWidth: 0 },
    tr: { top: 30, right: 30, borderLeftWidth: 0, borderBottomWidth: 0 },
    bl: { bottom: 30, left: 30, borderRightWidth: 0, borderTopWidth: 0 },
    br: { bottom: 30, right: 30, borderLeftWidth: 0, borderTopWidth: 0 },
    viewfinderHint: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        fontWeight: '700',
        marginTop: 180,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    confidenceGlass: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 12,
        borderRadius: AppSpacing.radiusMd,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    confLabel: {
        fontSize: 9,
        fontWeight: '800',
        color: AppColors.txtMuted,
        letterSpacing: 0.5,
        fontFamily: AppTypography.fontPrimaryExtraBold,
    },
    confValue: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontMonoBold,
        marginVertical: 4,
    },
    scanBtn: {
        marginTop: 5,
    },
    knowledgeCard: {
        padding: 22,
        borderRadius: AppSpacing.radiusLg,
    },
    knowledgeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    kEyebrow: {
        fontSize: 10,
        fontWeight: '800',
        color: AppColors.txtMuted,
        letterSpacing: 1,
        fontFamily: AppTypography.fontPrimaryExtraBold,
        marginBottom: 6,
    },
    kTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    kSci: {
        fontSize: 14,
        color: AppColors.txtSecondary,
        fontStyle: 'italic',
        marginTop: 2,
        fontFamily: AppTypography.fontPrimary,
    },
    kIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: AppColors.inputBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    kIcon: {
        fontSize: 24,
    },
    kDivider: {
        height: 1,
        backgroundColor: AppColors.border,
        marginVertical: 20,
    },
    kSection: {
        marginBottom: 20,
    },
    kSectionTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
        marginBottom: 8,
    },
    kText: {
        fontSize: 14,
        color: AppColors.txtSecondary,
        lineHeight: 20,
        fontFamily: AppTypography.fontPrimary,
    },
    stepRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 6,
    },
    stepDot: {
        fontSize: 14,
        color: AppColors.primary,
        fontWeight: '900',
    },
    stepText: {
        flex: 1,
        fontSize: 14,
        color: AppColors.txtSecondary,
        lineHeight: 20,
        fontFamily: AppTypography.fontPrimary,
    },
    guideBtn: {
        marginTop: 10,
    },
});
