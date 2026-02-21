import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '../../components/BottomNav';
import { AppColors } from '../../styles/theme';

export default function DevicesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Devices Screen Placeholder</Text>
            </View>
            <BottomNav navigation={navigation} active="devices" />
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
