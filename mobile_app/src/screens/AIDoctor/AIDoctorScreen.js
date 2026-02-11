import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '../../components/BottomNav';
import { AppColors } from '../../styles/theme';

export default function AIDoctorScreen({ navigate }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>AI Doctor Screen Placeholder</Text>
            </View>
            <BottomNav navigate={navigate} active="ai-doctor" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
