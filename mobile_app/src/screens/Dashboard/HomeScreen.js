import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { DashboardStatusBar } from '../../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../../components/shared/DashboardHeader';
import { DashboardBottomNav } from '../../components/shared/DashboardBottomNav';
import { SavedLocallyBar } from '../../components/shared/SavedLocallyBar';
import { CardBase } from '../../components/ui/CardBase';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <DashboardStatusBar />
      <DashboardHeader
        subtitle="THURSDAY · 21 FEB 2026"
        title="Good morning, Amina 👋"
      />

      {/* Alert Bar */}
      <View style={styles.alertBarContainer}>
        <View style={styles.alertBar}>
          <View style={styles.alertIconCircle}>
            <Text style={styles.alertIcon}>⚠️</Text>
          </View>
          <View style={styles.alertTextContainer}>
            <Text style={styles.alertTitle}>MOISTURE ALERT — ZONE B</Text>
            <Text style={styles.alertSubtitle}>Soil at 28% — below 35% critical threshold</Text>
          </View>
          <TouchableOpacity style={styles.irrigateBtn}>
            <Text style={styles.irrigateBtnText}>IRRIGATE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
      >
        {/* Farm Pulse Hero */}
        <View style={styles.farmPulseHero}>
          <View style={styles.decorativeGlow} />
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroLabel}>DAILY FARM PULSE · FIELD 1</Text>
              <Text style={styles.heroTitle}>Farm Health Overview</Text>
            </View>
            <View style={styles.scoreBlock}>
              <Text style={styles.scoreNumber}>87</Text>
              <Text style={styles.scoreLabel}>HEALTH SCORE</Text>
              <Text style={styles.trendText}>▲ +3 today</Text>
            </View>
          </View>

          {/* AI Recommendation Sub-card */}
          <View style={styles.aiRecommendation}>
            <View style={styles.aiIconBox}>
              <Text style={styles.aiIcon}>💧</Text>
            </View>
            <View style={styles.aiTextContainer}>
              <Text style={styles.aiLabel}>AI RECOMMENDATION</Text>
              <Text style={styles.aiAction}>Irrigate Zone B now</Text>
              <Text style={styles.aiSubText}>Best window: 5:00 PM today — cooler temp cuts evaporation by ~30%</Text>
            </View>
          </View>

          {/* Weather Strip */}
          <View style={styles.weatherStrip}>
            <View style={styles.weatherLeft}>
              <Text style={styles.weatherEmoji}>⛅</Text>
              <View style={styles.tempContainer}>
                <Text style={styles.tempValue}>27°C</Text>
                <Text style={styles.tempSub}>Partly Cloudy · Humidity 68%</Text>
              </View>
            </View>
            <View style={styles.weatherChips}>
              <View style={styles.weatherChip}>
                <Text style={styles.weatherChipText}>🌧️ Rain 60%</Text>
              </View>
              <View style={styles.weatherChip}>
                <Text style={styles.weatherChipText}>💨 12 km/h</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <CardBase accentColor="forest" style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: AppColors.forest }]}>62%</Text>
              <Text style={styles.statLabel}>MOISTURE</Text>
            </View>
          </CardBase>
          <CardBase accentColor="clay" style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: AppColors.clay }]}>72%</Text>
              <Text style={styles.statLabel}>NITROGEN</Text>
            </View>
          </CardBase>
          <CardBase accentColor="slate" style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: AppColors.slate }]}>88%</Text>
              <Text style={styles.statLabel}>POTASSIUM</Text>
            </View>
          </CardBase>
        </View>

        {/* Achievement Card */}
        <View style={styles.achievementCard}>
          <Text style={styles.achievementEmoji}>🏆</Text>
          <View style={styles.achievementContent}>
            <Text style={styles.achievementTitle}>7-Week Soil Health Streak!</Text>
            <Text style={styles.achievementDesc}>Outperforming 94% of farmers in Bafoussam region.</Text>
            <View style={styles.achievementPill}>
              <Text style={styles.achievementPillText}>▲ +40% Yield vs. Last Season</Text>
            </View>
          </View>
        </View>

        <SavedLocallyBar message="All data saved locally · Syncing when online" />
      </ScrollView>

      <DashboardBottomNav activeTab="HOME" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.offwhite, // design mentions #D0C9C0 for page bg, but device is offwhite
  },
  alertBarContainer: {
    backgroundColor: AppColors.forestDark,
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  alertBar: {
    backgroundColor: 'rgba(216, 67, 21, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(216, 67, 21, 0.35)',
    borderRadius: AppSpacing.radiusSm,
    padding: 12, // design says 9x12
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  alertIconCircle: {
    width: 28,
    height: 28,
    backgroundColor: AppColors.amber,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIcon: {
    fontSize: 13,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.goldLight,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  alertSubtitle: {
    fontSize: 11,
    color: 'rgba(245, 242, 238, 0.82)',
    fontFamily: AppTypography.fontPrimary,
  },
  irrigateBtn: {
    backgroundColor: AppColors.amber,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: AppSpacing.radiusXs,
    minHeight: 36,
    justifyContent: 'center',
  },
  irrigateBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
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
  farmPulseHero: {
    backgroundColor: AppColors.forestDeep, // Linear gradient fallback
    padding: 18,
    borderRadius: AppSpacing.radius,
    overflow: 'hidden',
    position: 'relative',
  },
  decorativeGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    backgroundColor: 'rgba(45, 90, 39, 0.45)', // radial-gradient placeholder
    borderRadius: 80,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: AppColors.txtOnDark3,
    letterSpacing: 1,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: AppColors.txtOnDark,
    marginTop: 4,
    fontFamily: AppTypography.fontPrimaryBlack,
  },
  scoreBlock: {
    alignItems: 'flex-end',
  },
  scoreNumber: {
    fontSize: 38,
    fontWeight: '900',
    color: AppColors.goldLight,
    fontFamily: AppTypography.fontMonoBold,
    lineHeight: 38,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: AppColors.txtOnDark3,
    letterSpacing: 0.5,
    fontFamily: AppTypography.fontPrimaryBold,
    marginTop: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#81C784',
    fontFamily: AppTypography.fontPrimaryBold,
    marginTop: 2,
  },
  aiRecommendation: {
    backgroundColor: 'rgba(245, 242, 238, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(245, 242, 238, 0.18)',
    borderRadius: AppSpacing.radiusSm,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  aiIconBox: {
    width: 34,
    height: 34,
    backgroundColor: 'rgba(249, 168, 37, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(249, 168, 37, 0.4)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiIcon: {
    fontSize: 17,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: AppColors.gold,
    letterSpacing: 1,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  aiAction: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.txtOnDark,
    marginTop: 3,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  aiSubText: {
    fontSize: 11,
    color: 'rgba(245, 242, 238, 0.80)',
    lineHeight: 16.5,
    marginTop: 3,
    fontFamily: AppTypography.fontPrimary,
  },
  weatherStrip: {
    backgroundColor: 'rgba(245, 242, 238, 0.09)',
    borderWidth: 1,
    borderColor: 'rgba(245, 242, 238, 0.15)',
    borderRadius: AppSpacing.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weatherLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weatherEmoji: {
    fontSize: 28,
  },
  tempContainer: {
    flex: 1,
  },
  tempValue: {
    fontSize: 24,
    fontWeight: '900',
    color: AppColors.txtOnDark,
    fontFamily: AppTypography.fontMonoBold,
  },
  tempSub: {
    fontSize: 11,
    color: 'rgba(245, 242, 238, 0.82)',
    fontWeight: '500',
    fontFamily: AppTypography.fontPrimaryMedium,
  },
  weatherChips: {
    flexDirection: 'row',
    gap: 6,
  },
  weatherChip: {
    backgroundColor: 'rgba(245, 242, 238, 0.13)',
    borderWidth: 1,
    borderColor: 'rgba(245, 242, 238, 0.20)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  weatherChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(245, 242, 238, 0.92)',
    fontFamily: AppTypography.fontPrimaryBold,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    fontFamily: AppTypography.fontMonoBold,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: AppColors.txtMuted,
    marginTop: 3,
    letterSpacing: 0.3,
    fontFamily: AppTypography.fontPrimaryBold,
  },
  achievementCard: {
    backgroundColor: '#E8F5E9', // design uses linear-gradient
    borderWidth: 1,
    borderColor: 'rgba(45, 90, 39, 0.2)',
    padding: 16,
    borderRadius: AppSpacing.radius,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  achievementEmoji: {
    fontSize: 40,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: AppColors.forestDark,
    fontFamily: AppTypography.fontPrimaryBlack,
  },
  achievementDesc: {
    fontSize: 12,
    color: AppColors.txtMuted,
    marginTop: 3,
    lineHeight: 18,
    fontFamily: AppTypography.fontPrimary,
  },
  achievementPill: {
    alignSelf: 'flex-start',
    backgroundColor: AppColors.forest,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  achievementPillText: {
    color: AppColors.txtOnDark,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: AppTypography.fontPrimaryBold,
  },
});
