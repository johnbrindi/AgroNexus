import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { DashboardStatusBar } from '../components/shared/DashboardStatusBar';
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
      <DashboardStatusBar isOnline={false} />
      <DashboardHeader
        eyebrow="THURSDAY · 21 FEB 2026"
        title={`${t('greeting')}, Amina 👋`}
      />

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Ring Card */}
        <CardBase style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <View style={styles.ringPlaceholder}>
              <Text style={styles.scoreValue}>87</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreStatus}>{t('excellentHealth')}</Text>
              <Text style={styles.scoreDesc}>{t('farmPerformance')}</Text>
            </View>
          </View>
        </CardBase>

        {/* Priority Action Card */}
        <CardBase accentColor="danger" style={styles.priorityCard}>
          <View style={styles.priorityHeader}>
            <View style={styles.priorityLabelBox}>
              <Text style={styles.priorityLabel}>{t('priorityAction')}</Text>
            </View>
            <View style={styles.dueBox}>
              <Text style={styles.dueText}>{t('dueNow')}</Text>
            </View>
          </View>
          <Text style={styles.priorityTitle}>{t('irrigateZoneB')}</Text>
          <Text style={styles.prioritySubtitle}>{t('soilMoistureLow')}</Text>
          <StandardButton
            title={t('waterNow')}
            variant="danger"
            size="small"
            style={styles.actionBtn}
          />
        </CardBase>

        {/* Field Overview Metrics */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Field Overview</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>View Details</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.metricsCarousel}
          contentContainerStyle={styles.carouselPadding}
        >
          <CardBase style={styles.metricCard}>
            <Text style={styles.metricIcon}>💧</Text>
            <Text style={styles.metricValue}>62%</Text>
            <Text style={styles.metricLabel}>Moisture</Text>
          </CardBase>
          <CardBase style={styles.metricCard}>
            <Text style={styles.metricIcon}>🌱</Text>
            <Text style={styles.metricValue}>72%</Text>
            <Text style={styles.metricLabel}>Nitrogen</Text>
          </CardBase>
          <CardBase style={styles.metricCard}>
            <Text style={styles.metricIcon}>☀️</Text>
            <Text style={styles.metricValue}>88%</Text>
            <Text style={styles.metricLabel}>Potassium</Text>
          </CardBase>
        </ScrollView>

        {/* Weather Today */}
        <CardBase style={styles.weatherCard}>
          {loading ? (
            <Text style={styles.weatherLoading}>{t('loading')}</Text>
          ) : (
            <>
              <View style={styles.weatherTop}>
                <View>
                  <Text style={styles.weatherLabel}>{t('weatherToday')}</Text>
                  <Text style={styles.weatherCity}>{weather?.location}</Text>
                </View>
                <Text style={styles.weatherIcon}>⛅</Text>
              </View>
              <View style={styles.weatherMain}>
                <Text style={styles.weatherTemp}>{weather?.temp}°</Text>
                <View style={styles.weatherDetails}>
                  <Text style={styles.weatherDesc}>{t('partlyCloudy')}</Text>
                  <Text style={styles.weatherExtreme}>{t('high')}: {weather?.high}° · {t('low')}: {weather?.low}°</Text>
                  <Text style={styles.rainPrediction}>{t('nextRain')}: {weather?.nextRain}</Text>
                </View>
              </View>
              <View style={styles.weatherGrid}>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherItemLabel}>{t('humidity')}</Text>
                  <Text style={styles.weatherItemValue}>{weather?.humidity}%</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherItemLabel}>{t('rainChance')}</Text>
                  <Text style={styles.weatherItemValue}>{weather?.rainChance}%</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherItemLabel}>{t('wind')}</Text>
                  <Text style={styles.weatherItemValue}>{weather?.wind} km/h</Text>
                </View>
              </View>
            </>
          )}
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
    gap: 18,
  },
  scoreCard: {
    padding: 22,
    borderRadius: AppSpacing.radiusLg, // r24
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  ringPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scoreValue: {
    fontSize: 34,
    fontWeight: '900',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontMonoBold,
  },
  scoreMax: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.txtMuted,
    fontFamily: AppTypography.fontMonoBold,
    marginTop: 10,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreStatus: {
    fontSize: 20,
    fontWeight: '900',
    color: AppColors.primary,
    fontFamily: AppTypography.fontPrimaryBlack,
    marginBottom: 4,
  },
  scoreDesc: {
    fontSize: 13,
    color: AppColors.txtSecondary,
    lineHeight: 18,
    fontFamily: AppTypography.fontPrimary,
  },
  priorityCard: {
    padding: 20,
    borderRadius: AppSpacing.radiusMd,
  },
  priorityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  priorityLabelBox: {
    backgroundColor: AppColors.dangerBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: AppColors.dangerBorder,
  },
  priorityLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: AppColors.danger,
    fontFamily: AppTypography.fontPrimaryExtraBold,
  },
  dueBox: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dueText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFF',
    fontFamily: AppTypography.fontPrimaryBlack,
  },
  priorityTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontPrimaryBlack,
  },
  prioritySubtitle: {
    fontSize: 14,
    color: AppColors.txtSecondary,
    marginTop: 4,
    marginBottom: 18,
    fontFamily: AppTypography.fontPrimary,
  },
  actionBtn: {
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontPrimaryBlack,
  },
  viewMore: {
    fontSize: 13,
    fontWeight: '700',
    color: AppColors.primary,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  metricsCarousel: {
    marginHorizontal: -22,
  },
  carouselPadding: {
    paddingHorizontal: 22,
    gap: 14,
  },
  metricCard: {
    width: 140,
    padding: 16,
    alignItems: 'center',
    borderRadius: AppSpacing.radiusMd,
  },
  metricIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '900',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontMonoBold,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.txtMuted,
    fontFamily: AppTypography.fontPrimaryBold,
    marginTop: 2,
  },
  weatherCard: {
    padding: 20,
    borderRadius: AppSpacing.radiusLg,
    marginBottom: 20,
  },
  weatherTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  weatherLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: AppColors.txtMuted,
    letterSpacing: 1,
    fontFamily: AppTypography.fontPrimaryExtraBold,
  },
  weatherCity: {
    fontSize: 15,
    fontWeight: '700',
    color: AppColors.txtPrimary,
    marginTop: 2,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  weatherIcon: {
    fontSize: 36,
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },
  weatherTemp: {
    fontSize: 54,
    fontWeight: '900',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontMonoBold,
  },
  weatherDetails: {
    flex: 1,
  },
  weatherDesc: {
    fontSize: 18,
    fontWeight: '800',
    color: AppColors.txtPrimary,
    fontFamily: AppTypography.fontPrimaryExtraBold,
  },
  weatherExtreme: {
    fontSize: 13,
    color: AppColors.txtSecondary,
    marginTop: 2,
    fontFamily: AppTypography.fontPrimary,
  },
  rainPrediction: {
    fontSize: 12,
    color: AppColors.primary,
    fontWeight: '700',
    marginTop: 4,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  weatherGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: AppColors.border,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  weatherItem: {
    alignItems: 'center',
  },
  weatherItemLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: AppColors.txtMuted,
    fontFamily: AppTypography.fontPrimaryBold,
    textTransform: 'uppercase',
  },
  weatherItemValue: {
    fontSize: 14,
    fontWeight: '900',
    color: AppColors.txtPrimary,
    marginTop: 2,
    fontFamily: AppTypography.fontMonoBold,
  },
  weatherLoading: {
    textAlign: 'center',
    padding: 20,
    color: AppColors.txtMuted,
    fontFamily: AppTypography.fontPrimary,
  },
});
