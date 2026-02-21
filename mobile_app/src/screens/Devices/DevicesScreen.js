import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { DashboardStatusBar } from '../../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../../components/shared/DashboardHeader';
import { DashboardBottomNav } from '../../components/shared/DashboardBottomNav';
import { SavedLocallyBar } from '../../components/shared/SavedLocallyBar';
import { CardBase } from '../../components/ui/CardBase';
import { StatusChip } from '../../components/ui/StatusChip';
import { StandardButton } from '../../components/ui/StandardButton';
import { DeviceStatusPulse } from '../../components/ui/DeviceStatusPulse';

export default function DevicesScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <DashboardStatusBar />
            <DashboardHeader
                subtitle="IOT CONTROL CENTER"
                title="My Devices 📡"
            />

            {/* Subheader info */}
            <View style={styles.subHeader}>
                <View style={styles.liveBadge}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE DATA</Text>
                </View>
                <StatusChip variant="amber" label="⚠️ 1 OFFLINE" />
                <StatusChip variant="slate" label="4 DEVICES" />
            </View>

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* Device 1: Soil Sensor */}
                <CardBase accentColor="forest">
                    <View style={styles.cardPadding}>
                        <View style={styles.deviceTopRow}>
                            <View style={[styles.illustrationBox, { backgroundColor: '#E8F5E9' }]}>
                                <Text style={styles.illustrationEmoji}>🌱</Text>
                            </View>
                            <View style={styles.deviceNameSection}>
                                <Text style={styles.deviceName}>Soil Sensor — Zone A</Text>
                                <Text style={styles.deviceLoc}>North Field · 12 m from gate</Text>
                                <View style={styles.statusRow}>
                                    <DeviceStatusPulse status="online" />
                                    <Text style={styles.statusTextOnline}>ONLINE · 2 min ago</Text>
                                    <View style={styles.batteryContainer}>
                                        <View style={styles.batteryBody}>
                                            <View style={[styles.batteryFill, { width: '75%', backgroundColor: AppColors.success }]} />
                                        </View>
                                        <View style={styles.batteryNib} />
                                        <Text style={styles.batteryPercent}>75%</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Metric Grid */}
                        <View style={styles.metricGrid}>
                            <View style={styles.metricCell}>
                                <View style={styles.metricTop}>
                                    <Text style={[styles.metricValue, { color: AppColors.forest }]}>62%</Text>
                                    <Text style={styles.metricUnit}>MOISTURE</Text>
                                </View>
                                <View style={styles.progressTrack}>
                                    <View style={[styles.progressFill, { width: '62%', backgroundColor: AppColors.forest }]} />
                                </View>
                            </View>
                            <View style={styles.metricCell}>
                                <View style={styles.metricTop}>
                                    <Text style={[styles.metricValue, { color: AppColors.amber }]}>28°C</Text>
                                    <Text style={styles.metricUnit}>SOIL TEMP</Text>
                                </View>
                                <View style={styles.progressTrack}>
                                    <View style={[styles.progressFill, { width: '45%', backgroundColor: AppColors.amber }]} />
                                </View>
                            </View>
                        </View>

                        {/* NPK Balance */}
                        <View style={styles.npkContainer}>
                            <View style={styles.npkHeader}>
                                <Text style={styles.npkLabel}>NPK BALANCE</Text>
                                <StatusChip variant="green" label="OPTIMAL" />
                            </View>
                            <View style={styles.barChart}>
                                <View style={styles.barGroup}>
                                    <View style={styles.barTrack}>
                                        <View style={[styles.barFill, { height: '72%', backgroundColor: AppColors.forest }]} />
                                    </View>
                                    <Text style={styles.barLabel}>N</Text>
                                    <Text style={styles.barValue}>72</Text>
                                </View>
                                <View style={styles.barGroup}>
                                    <View style={styles.barTrack}>
                                        <View style={[styles.barFill, { height: '45%', backgroundColor: AppColors.amber }]} />
                                    </View>
                                    <Text style={styles.barLabel}>P</Text>
                                    <Text style={[styles.barValue, { color: AppColors.amber }]}>45</Text>
                                </View>
                                <View style={styles.barGroup}>
                                    <View style={styles.barTrack}>
                                        <View style={[styles.barFill, { height: '88%', backgroundColor: AppColors.slate }]} />
                                    </View>
                                    <Text style={styles.barLabel}>K</Text>
                                    <Text style={styles.barValue}>88</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.btnRow}>
                            <StandardButton title="⚙️ Configure" variant="primary" size="small" style={{ flex: 1 }} />
                            <StandardButton title="📊 Full Log" variant="secondary" size="small" style={{ flex: 1 }} />
                        </View>
                    </View>
                </CardBase>

                {/* Device 2: Weather Station */}
                <CardBase accentColor="amber">
                    <View style={styles.cardPadding}>
                        <View style={styles.deviceTopRow}>
                            <View style={[styles.illustrationBox, { backgroundColor: '#E3F2FD' }]}>
                                <Text style={styles.illustrationEmoji}>🌦️</Text>
                            </View>
                            <View style={styles.deviceNameSection}>
                                <Text style={styles.deviceName}>Weather Station</Text>
                                <Text style={styles.deviceLoc}>Farm Perimeter · East Side</Text>
                                <View style={styles.statusRow}>
                                    <DeviceStatusPulse status="online" />
                                    <Text style={styles.statusTextOnline}>ONLINE · Live</Text>
                                    <View style={styles.batteryContainer}>
                                        <View style={styles.batteryBody}>
                                            <View style={[styles.batteryFill, { width: '90%', backgroundColor: AppColors.success }]} />
                                        </View>
                                        <View style={styles.batteryNib} />
                                        <Text style={styles.batteryPercent}>90%</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Metric Grid */}
                        <View style={styles.metricGrid}>
                            <View style={styles.metricCell}>
                                <View style={styles.metricTop}>
                                    <Text style={[styles.metricValue, { color: AppColors.amber }]}>27°C</Text>
                                    <Text style={styles.metricUnit}>TEMP</Text>
                                </View>
                            </View>
                            <View style={styles.metricCell}>
                                <View style={styles.metricTop}>
                                    <Text style={[styles.metricValue, { color: AppColors.slate }]}>68%</Text>
                                    <Text style={styles.metricUnit}>HUMIDITY</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.btnRow}>
                            <StandardButton title="📡 Live Feed" variant="primary" size="small" style={{ flex: 1 }} />
                            <StandardButton title="🌤️ Forecast" variant="secondary" size="small" style={{ flex: 1 }} />
                        </View>
                    </View>
                </CardBase>

                {/* Device 3: Irrigation Pump (OFFLINE) */}
                <CardBase accentColor="danger">
                    <View style={styles.cardPadding}>
                        <View style={styles.deviceTopRow}>
                            <View style={[styles.illustrationBox, { backgroundColor: '#FFF8E1' }]}>
                                <Text style={styles.illustrationEmoji}>💧</Text>
                            </View>
                            <View style={styles.deviceNameSection}>
                                <Text style={styles.deviceName}>Irrigation Pump — Zone B</Text>
                                <Text style={styles.deviceLoc}>Water Source · South Pod</Text>
                                <View style={styles.statusRow}>
                                    <DeviceStatusPulse status="offline" />
                                    <Text style={styles.statusTextOffline}>OFFLINE · 3h ago</Text>
                                    <View style={styles.batteryContainer}>
                                        <View style={styles.batteryBody}>
                                            <View style={[styles.batteryFill, { width: '18%', backgroundColor: AppColors.dangerLight }]} />
                                        </View>
                                        <View style={styles.batteryNib} />
                                        <Text style={styles.batteryPercent}>18%</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Offline Warning */}
                        <View style={styles.offlineWarning}>
                            <Text style={styles.offlineWarningTitle}>⚠️ DEVICE OFFLINE</Text>
                            <Text style={styles.offlineWarningText}>Last reading: Zone B moisture at 28%. Manual irrigation check required immediately.</Text>
                        </View>

                        <StandardButton title="🔄 Attempt Reconnect" variant="danger" size="large" style={{ width: '100%', minHeight: 44 }} />
                    </View>
                </CardBase>

                <SavedLocallyBar message="Device logs saved locally" />
            </ScrollView>

            <DashboardBottomNav activeTab="DEVICES" navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.offwhite,
    },
    subHeader: {
        backgroundColor: AppColors.forestDark,
        paddingHorizontal: 18,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'rgba(45, 90, 39, 0.10)',
        borderWidth: 1,
        borderColor: 'rgba(45, 90, 39, 0.22)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    liveDot: {
        width: 7,
        height: 7,
        backgroundColor: '#4CAF50',
        borderRadius: 3.5,
    },
    liveText: {
        fontSize: 10,
        fontWeight: '700',
        color: AppColors.forest,
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
    cardPadding: {
        padding: 14,
    },
    deviceTopRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: 12,
    },
    illustrationBox: {
        width: 54,
        height: 54,
        borderRadius: AppSpacing.radiusSm,
        borderWidth: 1,
        borderColor: AppColors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustrationEmoji: {
        fontSize: 30,
    },
    deviceNameSection: {
        flex: 1,
    },
    deviceName: {
        fontSize: 15,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    deviceLoc: {
        fontSize: 11,
        color: AppColors.txtMuted,
        marginTop: 2,
        fontFamily: AppTypography.fontPrimary,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 4,
    },
    statusTextOnline: {
        fontSize: 11,
        fontWeight: '700',
        color: AppColors.success,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    statusTextOffline: {
        fontSize: 11,
        fontWeight: '700',
        color: AppColors.dangerLight,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    batteryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        gap: 4,
    },
    batteryBody: {
        width: 24,
        height: 12,
        borderRadius: 2,
        borderWidth: 1.5,
        borderColor: AppColors.borderStrong,
        position: 'relative',
        overflow: 'hidden',
    },
    batteryFill: {
        height: '100%',
    },
    batteryNib: {
        width: 2,
        height: 6,
        backgroundColor: AppColors.borderStrong,
        borderTopRightRadius: 1,
        borderBottomRightRadius: 1,
    },
    batteryPercent: {
        fontSize: 10,
        fontWeight: '700',
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontMonoBold,
    },
    metricGrid: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    metricCell: {
        flex: 1,
        backgroundColor: AppColors.offwhiteWarm,
        borderRadius: AppSpacing.radiusSm,
        padding: 10,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    metricTop: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    metricValue: {
        fontSize: 20,
        fontWeight: '900',
        fontFamily: AppTypography.fontMonoBold,
    },
    metricUnit: {
        fontSize: 10,
        fontWeight: '700',
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    progressTrack: {
        height: 4,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 2,
        marginTop: 6,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    npkContainer: {
        backgroundColor: AppColors.offwhiteWarm,
        borderRadius: AppSpacing.radiusSm,
        padding: 12,
        borderWidth: 1,
        borderColor: AppColors.border,
        marginBottom: 12,
    },
    npkHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    npkLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    barChart: {
        height: 70,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'flex-end',
        marginTop: 4,
        paddingHorizontal: 10,
    },
    barGroup: {
        flex: 1,
        alignItems: 'center',
    },
    barTrack: {
        width: '100%',
        height: 54,
        backgroundColor: AppColors.cream,
        borderWidth: 1,
        borderColor: AppColors.border,
        borderRadius: 4,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    barFill: {
        width: '100%',
    },
    barLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: AppColors.txtMuted,
        marginTop: 4,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    barValue: {
        fontSize: 10,
        fontWeight: '700',
        fontFamily: AppTypography.fontMonoBold,
        color: AppColors.txtPrimary,
    },
    btnRow: {
        flexDirection: 'row',
        gap: 8,
    },
    offlineWarning: {
        backgroundColor: 'rgba(198,40,40,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(198,40,40,0.22)',
        borderRadius: AppSpacing.radiusSm,
        padding: 10,
        marginBottom: 12,
    },
    offlineWarningTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: AppColors.danger,
        textTransform: 'uppercase',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    offlineWarningText: {
        fontSize: 11,
        color: AppColors.txtSecondary,
        marginTop: 4,
        lineHeight: 16.5,
        fontFamily: AppTypography.fontPrimary,
    },
});
