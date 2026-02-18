import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AppColors } from '../../styles/theme';
import BottomNav from '../../components/BottomNav';
import FarmStatusCard from '../../components/FarmStatusCard';
import WeatherCard from '../../components/WeatherCard';
import DailyTasks from '../../components/DailyTasks';
import PredictedYield from '../../components/PredictedYield';
import { Bell, Wifi } from 'lucide-react-native';

const initialTasks = [
    { id: 1, label: 'Irrigate maize field', completed: false },
    { id: 2, label: 'Apply fertilizer to tomatoes', completed: false },
    { id: 3, label: 'Check pepper seedlings', completed: true },
];

export default function HomeScreen({ navigate, userData }) {
    const [tasks, setTasks] = useState(initialTasks);

    const handleToggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Welcome Back!</Text>
                        <Text style={styles.headerSubtitle}>Your farm is looking healthy</Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <Bell size={24} color={AppColors.textDark} />
                    </View>
                </View>

                {/* Sync Status */}
                <View style={styles.syncStatus}>
                    <Wifi size={14} color={AppColors.primary} />
                    <Text style={styles.syncText}>Online · Last synced: 2 minutes ago</Text>
                </View>

                {/* Farm Status */}
                <FarmStatusCard moisture={60} temperature={28} status="Good" />

                {/* Weather Card */}
                <WeatherCard location="Bafoussam" temp={24} humidity={75} forecast="Light rain expected" nextHours={3} />

                {/* Daily Tasks */}
                <DailyTasks tasks={tasks} onToggleTask={handleToggleTask} />

                {/* Predicted Yield */}
                <PredictedYield
                    yields={[
                        { crop: 'Maize', level: 65, label: 'Medium-High' },
                        { crop: 'Tomatoes', level: 90, label: 'High' },
                    ]}
                />
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  syncText: {
    fontSize: 12,
    color: AppColors.textGrey,
    marginLeft: 6,
  },
});
