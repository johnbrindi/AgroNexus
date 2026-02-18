import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Droplet, Thermometer } from 'lucide-react-native';
import { AppColors } from '../styles/theme';

export default function FarmStatusCard({ moisture = 60, temperature = 28, status = 'Good' }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Farm Status</Text>
      <View style={styles.row}>
        <View style={styles.metric}>
          <Droplet size={22} color={AppColors.primary} />
          <Text style={styles.label}>Soil Moisture</Text>
          <Text style={styles.value}>{moisture}%</Text>
          <Text style={styles.range}>Optimal range: 50-70%</Text>
        </View>
        <View style={styles.metric}>
          <Thermometer size={22} color={AppColors.accentOrange} />
          <Text style={styles.label}>Temperature</Text>
          <Text style={styles.value}>{temperature}°C</Text>
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.textDark,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: AppColors.textGrey,
    marginTop: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.textDark,
    marginVertical: 2,
  },
  range: {
    fontSize: 12,
    color: AppColors.textGrey,
  },
  status: {
    fontSize: 14,
    color: AppColors.success,
    fontWeight: 'bold',
    marginTop: 2,
  },
});
