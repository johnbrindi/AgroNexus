import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { AppColors } from '../styles/theme';

export default function PredictedYield({ yields = [] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Predicted Yield</Text>
      {yields.map((item) => (
        <View key={item.crop} style={styles.row}>
          <Text style={styles.crop}>{item.crop}</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { width: `${item.level}%`, backgroundColor: item.level > 70 ? AppColors.primary : AppColors.accentOrange }]} />
          </View>
          <Text style={[styles.level, { color: item.level > 70 ? AppColors.primary : AppColors.accentOrange }]}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.secondary,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.textDark,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  crop: {
    flex: 1,
    fontSize: 15,
    color: AppColors.textDark,
  },
  barContainer: {
    flex: 2,
    height: 8,
    backgroundColor: AppColors.lightGrey,
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  bar: {
    height: 8,
    borderRadius: 4,
  },
  level: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
