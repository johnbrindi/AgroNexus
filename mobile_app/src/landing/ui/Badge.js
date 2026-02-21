import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LandingColors } from '../constants';

export const Badge = ({ text, color = LandingColors.leafGreen }) => {
    return (
        <View style={[styles.badge, { backgroundColor: color + '15', borderColor: color + '30' }]}>
            <Text style={[styles.text, { color: color }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 99,
        borderWidth: 1,
        alignSelf: 'center',
        marginBottom: 24,
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
