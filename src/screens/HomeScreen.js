import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { CloudSun, Lock, ClipboardList, AlertTriangle, CheckCircle, ShoppingCart, Package, Droplet } from 'lucide-react-native';

import { DashboardHeader } from '../components/shared/DashboardHeader';
import { CardBase } from '../components/ui/CardBase';
import { StandardButton } from '../components/ui/StandardButton';

import { useLanguage } from '../context/LanguageContext';
import { useWeatherData } from '../hooks/useWeatherData';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { t } = useLanguage();
  const { weather, loading } = useWeatherData();
  const isSmallDevice = width < 375;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

      <DashboardHeader
        eyebrow="THURSDAY · 21 FEB 2026"
        title={`${t('greeting')}, Amina 👋`}
      />

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: The "Regional Sky" Card (Weather & Season) */}
        <CardBase style={styles.regionSkyCard}>
          <View style={styles.cardHeader}>
            <View style={styles.weatherHero}>
              <CloudSun size={52} color={AppColors.primary} />
              <View style={styles.weatherHeroText}>
                <Text style={styles.tempLarge}>{weather?.temp || '28'}°C</Text>
                <Text style={styles.weatherDescription}>{t('partlyCloudy')}</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.locationCity}>{weather?.location || 'Banjoun'}, W</Text>
            </View>
          </View>

          {/* Season Status Badge */}
          <View style={styles.seasonBadgeContainer}>
            <View style={[styles.statusBadge, { backgroundColor: AppColors.successBg, borderColor: AppColors.successBorder }]}>
              <View style={styles.statusBadgeDot} />
              <Text style={[styles.statusBadgeText, { color: AppColors.success }]}>
                PLANTING WINDOW: OPEN <Text style={styles.statusBadgeDays}>(Days left: 14)</Text>
              </Text>
            </View>
          </View>

          {/* 48-Hour Rain Forecast */}
          <View style={styles.forecastSection}>
            <Text style={styles.forecastTitle}>Rain Forecast — Next 48hrs</Text>
            <View style={styles.forecastRow}>
              <View style={styles.forecastItem}>
                <View style={[styles.forecastBar, { height: 30 }]} />
                <Text style={styles.forecastValue}>25%</Text>
                <Text style={styles.forecastDay}>Today</Text>
              </View>
              <View style={styles.forecastItem}>
                <View style={[styles.forecastBar, { height: 80, backgroundColor: AppColors.primary }]} />
                <Text style={styles.forecastValue}>80%</Text>
                <Text style={styles.forecastDay}>Tomorrow</Text>
              </View>
              <View style={styles.forecastItem}>
                <View style={[styles.forecastBar, { height: 45 }]} />
                <Text style={styles.forecastValue}>45%</Text>
                <Text style={styles.forecastDay}>Day 3</Text>
              </View>
            </View>
            <View style={styles.alertRow}>
              <AlertTriangle size={14} color={AppColors.warning} />
              <Text style={styles.forecastAlert}>Heavy rain expected tomorrow</Text>
            </View>
          </View>

          {/* Freemium Upsell */}
          <View style={styles.upsellContainer}>
            <View style={styles.upsellOverlay}>
              <Lock size={20} color={AppColors.txtMuted} style={styles.upsellIcon} />
              <View style={styles.upsellBlurContent}>
                <Text style={styles.upsellText}>Your Soil Moisture: <Text style={styles.blurredText}>Unknown</Text></Text>
                <Text style={styles.upsellSubtext}>Connect an AgroNexus Kit to see live ground data.</Text>
                <TouchableOpacity>
                  <Text style={styles.learnMore}>Learn More →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CardBase>

        {/* Card 2: The "Smart Action" Card (Advisory & Marketplace) */}
        <CardBase style={styles.smartActionCard}>
          <View style={styles.actionHeader}>
            <View style={styles.actionIconContainer}>
              <ClipboardList size={24} color={AppColors.primary} />
            </View>
            <View style={styles.actionHeaderText}>
              <Text style={styles.actionTitle}>This Week's Recommended Action</Text>
              <Text style={styles.actionDate}>
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · Bafoussam  Area
              </Text>
            </View>
          </View>

          {/* Advisory Block */}
          <View style={styles.advisoryBlock}>
            <View style={styles.alertHeader}>
              <AlertTriangle size={16} color={AppColors.warning} />
              <Text style={styles.alertTitle}>ACTIVE ALERT</Text>
            </View>
            <Text style={styles.alertMsg}>
              Do not spray pesticides today. Heavy rain tomorrow will wash away all chemical treatments.
            </Text>
            <Text style={styles.alertResolution}>Wait until Thursday when conditions stabilize.</Text>
          </View>

          {/* Primary Task */}
          <View style={styles.taskBlock}>
            <View style={styles.taskHeader}>
              <CheckCircle size={16} color={AppColors.success} />
              <Text style={styles.taskTitle}>PRIMARY TASK</Text>
            </View>
            <Text style={styles.taskMsg}>Sow early-cycle Maize. Planting window is open. Optimal soil conditions ahead.</Text>
          </View>

          {/* Marketplace Button */}
          <StandardButton
            title="Buy Certified Maize Seeds"
            icon={<ShoppingCart size={20} color={AppColors.txtOnPrimary} />}
            variant="primary"
            style={styles.marketplaceBtn}
            textStyle={styles.marketplaceBtnText}
            onPress={() => navigation.navigate('Marketplace')}
          />

          {/* Secondary Actions */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.ghostBtn}>
              <Package size={16} color={AppColors.txtSecondary} />
              <Text style={styles.ghostBtnText}>Order Fertilizer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ghostBtn}>
              <Droplet size={16} color={AppColors.txtSecondary} />
              <Text style={styles.ghostBtnText}>Order Pesticide</Text>
            </TouchableOpacity>
          </View>

          {/* Trust Signal */}
          <View style={styles.trustSignal}>
            <Lock size={14} color={AppColors.txtPrimary} style={styles.trustIcon} />
            <View style={styles.trustSignalTextContainer}>
              <Text style={styles.trustText}>All purchases via AgroNexus Escrow</Text>
              <Text style={styles.trustSubtext}>Your money releases only on confirmed delivery.</Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    gap: 16,
  },
  regionSkyCard: {
    padding: 18,
    borderRadius: AppSpacing.radiusLg,
    backgroundColor: AppColors.primaryWash,
    borderWidth: 1,
    borderColor: AppColors.primarySubtle,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  weatherHeroText: {
    flexShrink: 1,
  },
  tempLarge: {
    fontSize: 32,
    fontWeight: '900',
    color: AppColors.primaryDeep,
    fontFamily: AppTypography.fontMonoBold,
  },
  weatherDescription: {
    fontSize: 13,
    color: AppColors.primary,
    fontFamily: AppTypography.fontPrimaryMedium,
    flexWrap: 'wrap',
  },
  locationContainer: {
    alignItems: 'flex-end',
    flexShrink: 1,
    marginLeft: 8,
  },
  locationCity: {
    fontSize: 16,
    fontWeight: '800',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontPrimaryExtraBold,
    textAlign: 'right',
  },
  locationRegion: {
    fontSize: 11,
    color: AppColors.txtMuted,
    fontFamily: AppTypography.fontPrimary,
    textAlign: 'right',
  },
  seasonBadgeContainer: {
    marginBottom: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  statusBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.success,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: AppTypography.fontPrimaryExtraBold,
  },
  statusBadgeDays: {
    fontWeight: '500',
    fontFamily: AppTypography.fontPrimaryMedium,
  },
  forecastSection: {
    marginBottom: 20,
  },
  forecastTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: AppColors.txtMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  forecastItem: {
    alignItems: 'center',
    gap: 6,
  },
  forecastBar: {
    width: 28,
    backgroundColor: AppColors.primarySubtle,
    borderRadius: 4,
  },
  forecastValue: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontMonoBold,
  },
  forecastDay: {
    fontSize: 10,
    color: AppColors.txtMuted,
    fontFamily: AppTypography.fontPrimary,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  forecastAlert: {
    fontSize: 12,
    color: AppColors.warning,
    fontWeight: '700',
    fontFamily: AppTypography.fontPrimaryBold,
    flexShrink: 1,
  },
  upsellContainer: {
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    paddingTop: 16,
  },
  upsellOverlay: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  upsellIcon: {
    marginTop: 2,
  },
  upsellBlurContent: {
    flex: 1,
  },
  upsellText: {
    fontSize: 13,
    fontWeight: '700',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontPrimaryBold,
    flexWrap: 'wrap',
  },
  blurredText: {
    color: 'rgba(17, 24, 39, 0.3)',
    textDecorationLine: 'line-through',
  },
  upsellSubtext: {
    fontSize: 12,
    color: AppColors.txtSecondary,
    marginTop: 2,
    fontFamily: AppTypography.fontPrimary,
    lineHeight: 16,
  },
  learnMore: {
    fontSize: 13,
    color: AppColors.primary,
    fontWeight: '700',
    marginTop: 6,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  smartActionCard: {
    padding: 18,
    borderRadius: AppSpacing.radiusLg,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.primaryWash,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionHeaderText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontPrimaryExtraBold,
    flexWrap: 'wrap',
  },
  actionDate: {
    fontSize: 12,
    color: AppColors.txtMuted,
    marginTop: 1,
    fontFamily: AppTypography.fontPrimary,
  },
  advisoryBlock: {
    backgroundColor: AppColors.warningBg,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.warning,
    padding: 12,
    borderRadius: AppSpacing.radiusSm,
    marginBottom: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: AppColors.warning,
    letterSpacing: 1,
    fontFamily: AppTypography.fontPrimaryBlack,
  },
  alertMsg: {
    fontSize: 13,
    color: AppColors.txtPrimary,
    lineHeight: 18,
    fontFamily: AppTypography.fontPrimaryMedium,
  },
  alertResolution: {
    fontSize: 12,
    color: AppColors.txtSecondary,
    marginTop: 6,
    fontStyle: 'italic',
    fontFamily: AppTypography.fontPrimary,
  },
  taskBlock: {
    backgroundColor: AppColors.successBg,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.success,
    padding: 12,
    borderRadius: AppSpacing.radiusSm,
    marginBottom: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  taskTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: AppColors.success,
    letterSpacing: 1,
    fontFamily: AppTypography.fontPrimaryBlack,
  },
  taskMsg: {
    fontSize: 13,
    color: AppColors.txtPrimary,
    lineHeight: 18,
    fontFamily: AppTypography.fontPrimaryMedium,
  },
  marketplaceBtn: {
    marginBottom: 16,
    minHeight: 48,
  },
  marketplaceBtnText: {
    fontSize: 14,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  ghostBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.surface,
    flexDirection: 'row',
    gap: 6,
  },
  ghostBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.txtSecondary,
    fontFamily: AppTypography.fontPrimaryBold,
    flexShrink: 1,
  },
  trustSignal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: AppColors.border,
  },
  trustIcon: {
    marginTop: 2,
  },
  trustSignalTextContainer: {
    flex: 1,
  },
  trustText: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontPrimaryBold,
    marginBottom: 1,
  },
  trustSubtext: {
    fontSize: 11,
    color: AppColors.txtMuted,
    fontFamily: AppTypography.fontPrimary,
    lineHeight: 16,
  },
});
