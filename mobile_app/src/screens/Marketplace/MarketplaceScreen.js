import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '../../components/BottomNav';
import { AppColors } from '../../styles/theme';

export default function MarketplaceScreen({ navigate }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Marketplace Screen Placeholder</Text>
            </View>
            <BottomNav navigate={navigate} active="marketplace" />
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
