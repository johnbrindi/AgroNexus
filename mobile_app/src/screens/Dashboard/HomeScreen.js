import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AppColors } from '../../styles/theme';
import BottomNav from '../../components/BottomNav';
import { Bell, Wifi, Cloud, Droplet, Thermometer, TrendingUp, Package, Activity } from 'lucide-react-native';

export default function HomeScreen({ navigate, userData }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>My Farm</Text>
                        <Text style={styles.headerSubtitle}>Welcome back, {userData?.name || 'Farmer'}!</Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <Bell size={24} color={AppColors.textDark} />
                    </View>
                </View>

                {/* Sync Status */}
                <View style={styles.syncStatus}>
                    <Wifi size={14} color={AppColors.primary} />
                    <Text style={styles.syncText}>Online · Last synced 2 mins ago</Text>
                </View>

                {/* Weather Card */}
                <View style={styles.weatherCard}>
                    <View style={styles.weatherHeader}>
                        <View>
                            <Text style={styles.locationText}>Bafoussam, Cameroon</Text>
                            <Text style={styles.weatherTemp}>28°C</Text>
                        </View>
                        <Cloud size={48} color={AppColors.accentOrange} />
                    </View>
                    <Text style={styles.weatherForecast}>Light rain expected this afternoon</Text>
                </View>

                {/* Farm Status */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Farm Status</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>Good</Text>
                        </View>
                    </View>

                    <View style={styles.metricRow}>
                        <View style={styles.metricItem}>
                            <Droplet size={24} color={AppColors.primary} />
                            <Text style={styles.metricLabel}>Moisture</Text>
                            <Text style={styles.metricValue}>60%</Text>
                        </View>
                        <View style={styles.metricItem}>
                            <Thermometer size={24} color={AppColors.accentOrange} />
                            <Text style={styles.metricLabel}>Temp</Text>
                            <Text style={styles.metricValue}>28°C</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <BottomNav navigate={navigate} active="home" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 80,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: AppColors.textDark,
    },
    headerSubtitle: {
        fontSize: 14,
        color: AppColors.textGrey,
    },
    syncStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    syncText: {
        fontSize: 12,
        color: AppColors.textGrey,
        marginLeft: 6,
    },
    weatherCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    weatherHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    locationText: {
        fontSize: 14,
        color: AppColors.textGrey,
    },
    weatherTemp: {
        fontSize: 36,
        fontWeight: 'bold',
        color: AppColors.accentOrange,
    },
    weatherForecast: {
        fontSize: 14,
        color: AppColors.textGrey,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColors.textDark,
    },
    statusBadge: {
        backgroundColor: AppColors.secondary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: AppColors.primary,
    },
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    metricItem: {
        alignItems: 'center',
    },
    metricLabel: {
        fontSize: 14,
        color: AppColors.textGrey,
        marginTop: 4,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColors.textDark,
    },
});
