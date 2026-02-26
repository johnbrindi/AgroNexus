import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';

export const DeviceStatusPulse = ({ status = 'online' }) => {
    const isOnline = status === 'online';
    const color = isOnline ? '#4CAF50' : '#EF5350';

    return (
        <View style={styles.container}>
            <View style={[styles.outerRing, { borderColor: color }]} />
            <View style={[styles.coreDot, { backgroundColor: color }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    outerRing: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        position: 'absolute',
        // animation logic would be platform-specific (Reanimated recommended)
    },
    coreDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
});
