import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { DashboardStatusBar } from '../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../components/shared/DashboardHeader';
import { CardBase } from '../components/ui/CardBase';
import { StatusChip } from '../components/ui/StatusChip';
import { StandardButton } from '../components/ui/StandardButton';

export default function DevicesScreen({ navigation }) {
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <DashboardStatusBar isOnline={true} />
            <DashboardHeader
                eyebrow="IOT CONTROL CENTER"
                title="Your Devices"
            />

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* Device 1: Soil Sensor */}
                <CardBase style={styles.deviceCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.statusGroup}>
                            <StatusChip label="ONLINE" variant="ok" />
                            <Text style={styles.lastSeen}>Active now</Text>
                        </View>
                        <View style={styles.batteryGroup}>
                            <Text style={styles.batteryText}>84%</Text>
                            <View style={styles.batteryIcon} />
                        </View>
                    </View>

                    <Text style={styles.deviceName}>Soil Sensor — Zone A</Text>
                    <Text style={styles.deviceLocation}>North Field · Section 4</Text>

                    <View style={styles.dataGrid}>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataLabel}>MOISTURE</Text>
                            <Text style={styles.dataValue}>62%</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataLabel}>TEMPERATURE</Text>
                            <Text style={styles.dataValue}>28°C</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataLabel}>HUMIDITY</Text>
                            <Text style={styles.dataValue}>74%</Text>
                        </View>
                    </View>

                    <View style={styles.actionRow}>
                        <StandardButton title="CONFIGURE" variant="secondary" size="small" style={{ flex: 1 }} />
                        <StandardButton title="VIEW LOGS" variant="secondary" size="small" style={{ flex: 1 }} />
                    </View>
                </CardBase>

                {/* Device 2: Weather Station */}
                <CardBase style={styles.deviceCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.statusGroup}>
                            <StatusChip label="ONLINE" variant="ok" />
                            <Text style={styles.lastSeen}>Active now</Text>
                        </View>
                        <View style={styles.batteryGroup}>
                            <Text style={styles.batteryText}>92%</Text>
                            <View style={styles.batteryIcon} />
                        </View>
                    </View>

                    <Text style={styles.deviceName}>Weather Station</Text>
                    <Text style={styles.deviceLocation}>Farm Central Hub</Text>

                    <View style={styles.dataGrid}>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataLabel}>RAIN RATE</Text>
                            <Text style={styles.dataValue}>0.0 mm/h</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataLabel}>WIND SPEED</Text>
                            <Text style={styles.dataValue}>12 km/h</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataLabel}>AIR PRESSURE</Text>
                            <Text style={styles.dataValue}>1012 hPa</Text>
                        </View>
                    </View>

                    <View style={styles.actionRow}>
                        <StandardButton title="CONFIGURE" variant="secondary" size="small" style={{ flex: 1 }} />
                        <StandardButton title="VIEW LOGS" variant="secondary" size="small" style={{ flex: 1 }} />
                    </View>
                </CardBase>

                {/* Device 3: Irrigation Pump (OFFLINE) */}
                <CardBase accentColor="danger" style={styles.deviceCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.statusGroup}>
                            <StatusChip label="OFFLINE" variant="crit" />
                            <Text style={[styles.lastSeen, styles.txtCrit]}>Disconnected 3h ago</Text>
                        </View>
                        <View style={styles.batteryGroup}>
                            <Text style={[styles.batteryText, styles.txtCrit]}>12%</Text>
                            <View style={[styles.batteryIcon, styles.bgCrit]} />
                        </View>
                    </View>

                    <Text style={styles.deviceName}>Irrigation Pump — Zone B</Text>
                    <Text style={styles.deviceLocation}>South Lake Inlet</Text>

                    <View style={styles.offlineAlert}>
                        <Text style={styles.alertTitle}>⚠️ CRITICAL ALERT</Text>
                        <Text style={styles.alertText}>Moisture in Zone B is 28% and falling. Pump failure will result in crop stress within 6 hours.</Text>
                    </View>

                    <StandardButton title="RECONNECT DEVICE" variant="danger" style={styles.reconnectBtn} />
                </CardBase>
            </ScrollView>

        </SafeAreaView>
    );
}

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
        gap: 16,
    },
    deviceCard: {
        padding: 20,
        borderRadius: AppSpacing.radiusLg,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    lastSeen: {
        fontSize: 12,
        fontWeight: '700',
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    batteryGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    batteryText: {
        fontSize: 13,
        fontWeight: '900',
        color: AppColors.success,
        fontFamily: AppTypography.fontMonoBold,
    },
    batteryIcon: {
        width: 24,
        height: 12,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: AppColors.borderStrong,
        backgroundColor: AppColors.success,
    },
    deviceName: {
        fontSize: 20,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    deviceLocation: {
        fontSize: 13,
        color: AppColors.txtSecondary,
        marginTop: 2,
        marginBottom: 20,
        fontFamily: AppTypography.fontPrimary,
    },
    dataGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: AppColors.border,
        paddingVertical: 18,
        marginBottom: 20,
    },
    dataItem: {
        alignItems: 'flex-start',
    },
    dataLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: AppColors.txtMuted,
        letterSpacing: 0.5,
        fontFamily: AppTypography.fontPrimaryExtraBold,
    },
    dataValue: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        marginTop: 4,
        fontFamily: AppTypography.fontMonoBold,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 10,
    },
    offlineAlert: {
        backgroundColor: AppColors.dangerBg,
        borderWidth: 1,
        borderColor: AppColors.dangerBorder,
        borderRadius: AppSpacing.radiusSm,
        padding: 16,
        marginBottom: 20,
    },
    alertTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: AppColors.danger,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    alertText: {
        fontSize: 13,
        color: AppColors.txtPrimary,
        marginTop: 6,
        lineHeight: 18,
        fontFamily: AppTypography.fontPrimary,
    },
    reconnectBtn: {
        marginTop: 4,
    },
    txtCrit: {
        color: AppColors.danger,
    },
    bgCrit: {
        backgroundColor: AppColors.danger,
        borderColor: AppColors.danger,
    },
});
