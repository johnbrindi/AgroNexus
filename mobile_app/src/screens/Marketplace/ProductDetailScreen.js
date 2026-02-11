import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../styles/theme';

export default function ProductDetailScreen({ navigate }) {
    return (
        <View style={styles.container}>
            <Text>Product Detail Placeholder</Text>
            <TouchableOpacity onPress={() => navigate('marketplace')}>
                <Text>Back to Market</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
