import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppTypography } from '../styles/theme';

import { DashboardHeader } from '../components/shared/DashboardHeader';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
    const { cartItems, addToCart, removeFromCart, cartCount } = useCart();

    const subtotal = cartItems.reduce((total, item) => total + (parseInt(item.price) * item.quantity), 0);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

            <DashboardHeader
                eyebrow="READY TO CHECKOUT"
                title="Your Cart"
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {cartItems.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View style={styles.iconCircle}>
                            <ShoppingBag size={48} color={AppColors.txtMuted} />
                        </View>
                        <Text style={styles.emptyTitle}>Your cart is empty</Text>
                        <Text style={styles.emptySubtitle}>
                            Browse the marketplace and add items to your cart to see them here.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.itemsContainer}>
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
                                <View style={styles.itemDetails}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.itemTitle}>{item.title}</Text>
                                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                            <Trash2 size={18} color="#FF5252" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.itemLocationRow}>
                                        <Text style={styles.itemLocation}>{item.location}</Text>
                                    </View>
                                    <View style={styles.itemFooter}>
                                        <Text style={styles.itemPrice}>
                                            {(parseInt(item.price) * item.quantity).toLocaleString()} XAF
                                        </Text>
                                        <View style={styles.qtyControls}>
                                            <TouchableOpacity
                                                style={styles.qtyBtn}
                                                onPress={() => addToCart(item, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} color={item.quantity <= 1 ? AppColors.txtMuted : AppColors.primary} />
                                            </TouchableOpacity>
                                            <Text style={styles.qtyText}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                style={styles.qtyBtn}
                                                onPress={() => addToCart(item, 1)}
                                            >
                                                <Plus size={14} color={AppColors.primary} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* Order Summary */}
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Order Summary</Text>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>{subtotal.toLocaleString()} XAF</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                                <Text style={[styles.summaryValue, { color: AppColors.primary }]}>Free</Text>
                            </View>
                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>{subtotal.toLocaleString()} XAF</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.checkoutBtn}>
                            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                            <ArrowRight size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                )}
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
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -40,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: AppColors.primary + '10',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
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
    itemsContainer: {
        paddingTop: 10,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: AppColors.inputBg,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
        flex: 1,
        marginRight: 8,
    },
    itemLocationRow: {
        marginTop: 2,
    },
    itemLocation: {
        fontSize: 12,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '900',
        color: AppColors.forest,
        fontFamily: AppTypography.fontMonoBold,
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.page,
        borderRadius: 12,
        padding: 2,
    },
    qtyBtn: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    qtyText: {
        fontSize: 14,
        fontWeight: '900',
        marginHorizontal: 12,
        color: AppColors.txtPrimary,
    },
    summaryCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        marginTop: 24,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '700',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontMonoBold,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        marginTop: 12,
        paddingTop: 16,
        marginBottom: 0,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '900',
        color: AppColors.primary,
        fontFamily: AppTypography.fontMonoBold,
    },
    checkoutBtn: {
        flexDirection: 'row',
        backgroundColor: AppColors.primary,
        marginVertical: 24,
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    checkoutText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '900',
        fontFamily: AppTypography.fontPrimaryBlack,
    },
});
