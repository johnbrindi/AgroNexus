import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppTypography } from '../styles/theme';
import { DashboardStatusBar } from '../components/shared/DashboardStatusBar';
import { DashboardHeader } from '../components/shared/DashboardHeader';
import { ShoppingBag } from 'lucide-react-native';

export default function CartScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <DashboardStatusBar isOnline={true} />
            <DashboardHeader
                eyebrow="READY TO CHECKOUT"
                title="Your Cart"
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.emptyState}>
                    <View style={styles.iconCircle}>
                        <ShoppingBag size={48} color={AppColors.txtMuted} />
                    </View>
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>
                        Browse the marketplace and add items to your cart to see them here.
                    </Text>
                </View>
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
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: -40,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: AppColors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: AppColors.txtMuted,
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 260,
        fontFamily: AppTypography.fontPrimary,
    },
});
