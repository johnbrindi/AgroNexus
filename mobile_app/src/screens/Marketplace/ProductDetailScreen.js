import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../styles/theme';

export default function ProductDetailScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Product Detail Placeholder</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Marketplace')}>
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
