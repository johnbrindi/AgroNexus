import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { AppColors } from '../styles/theme';

export default function DailyTasks({ tasks = [], onToggleTask }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Daily Tasks</Text>
      {tasks.map((task, idx) => (
        <TouchableOpacity
          key={task.id}
          style={styles.taskRow}
          onPress={() => onToggleTask && onToggleTask(task.id)}
          activeOpacity={0.7}
        >
          <View style={[styles.circle, task.completed && styles.completedCircle]}>
            {task.completed && <CheckCircle size={18} color={AppColors.primary} />}
          </View>
          <Text style={[styles.taskText, task.completed && styles.completedText]}>
            {task.label}
          </Text>
        </TouchableOpacity>
      ))}
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
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: AppColors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: AppColors.white,
  },
  completedCircle: {
    borderColor: AppColors.primary,
    backgroundColor: AppColors.secondary,
  },
  taskText: {
    fontSize: 15,
    color: AppColors.textDark,
  },
  completedText: {
    color: AppColors.textGrey,
    textDecorationLine: 'line-through',
  },
});
