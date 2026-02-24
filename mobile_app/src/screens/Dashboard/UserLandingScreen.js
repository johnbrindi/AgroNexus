import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { ConsumerHeader } from '../../components/consumer/ConsumerHeader';
import { HeroCarousel } from '../../components/consumer/HeroCarousel';
import { CircularCategories } from '../../components/consumer/CircularCategories';
import { FeaturedFarmers } from '../../components/consumer/FeaturedFarmers';
import { TrendingGrid } from '../../components/consumer/TrendingGrid';

export default function UserLandingScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ConsumerHeader />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <HeroCarousel />
                <CircularCategories />
                <FeaturedFarmers />
                <TrendingGrid />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    scrollContent: {
        paddingTop: 10,
        paddingBottom: 40,
    },
});
