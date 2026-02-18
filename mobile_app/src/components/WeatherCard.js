import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Cloud } from 'lucide-react-native';
import { AppColors } from '../styles/theme';

export default function WeatherCard({ location = 'Bafoussam', temp = 24, humidity = 75, forecast = 'Light rain expected', nextHours = 3 }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Cloud size={36} color={AppColors.accentOrange} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.temp}>{temp}°C</Text>
        </View>
      </View>
      <Text style={styles.forecast}>{forecast}</Text>
      <View style={styles.row}>
        <Text style={styles.nextHours}>Next {nextHours} hours</Text>
        <Text style={styles.humidity}>Humidity: {humidity}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E3F0FF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  location: {
    fontSize: 15,
    color: AppColors.textGrey,
  },
  temp: {
    fontSize: 28,
    fontWeight: 'bold',
    color: AppColors.accentOrange,
  },
  forecast: {
    fontSize: 14,
    color: AppColors.textGrey,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextHours: {
    fontSize: 12,
    color: AppColors.textGrey,
  },
  humidity: {
    fontSize: 12,
    color: AppColors.textGrey,
  },
});
