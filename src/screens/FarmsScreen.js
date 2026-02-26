import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography } from '../styles/theme';

import { DashboardHeader } from '../components/shared/DashboardHeader';
import { CardBase } from '../components/ui/CardBase';
import { StandardButton } from '../components/ui/StandardButton';
import { MapPin, Droplets, Thermometer, Sprout } from 'lucide-react-native';

export default function FarmsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

            <DashboardHeader
                eyebrow="FARM MANAGEMENT"
                title="Your Farms"
            />

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollPadding}
                showsVerticalScrollIndicator={false}
            >
                {/* Farm Card 1 */}
                <CardBase style={styles.farmCard}>
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2689&auto=format&fit=crop' }}
                        style={styles.cardImageBg}
                        imageStyle={styles.cardImage}
                    >
                        <View style={styles.cardOverlay}>
                            <View style={styles.badgeRow}>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusBadgeText}>Optimal</Text>
                                </View>
                                <View style={styles.sizeBadge}>
                                    <Text style={styles.sizeBadgeText}>50 Acres</Text>
                                </View>
                            </View>

                            <View style={styles.farmInfoContainer}>
                                <Text style={styles.farmName}>Green Valley Farm</Text>
                                <View style={styles.locationRow}>
                                    <MapPin size={14} color={AppColors.surface} />
                                    <Text style={styles.locationText}>North Sector, Block A</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={styles.actionRow}>
                        <StandardButton
                            title="VIEW DETAILS"
                            variant="secondary"
                            size="small"
                            style={styles.btnFlex}
                            onPress={() => navigation.navigate('FarmDetails', {
                                farm: {
                                    name: 'Green Valley Farm',
                                    location: 'North Sector, Block A',
                                    size: '50 Acres',
                                    cropType: 'Corn'
                                }
                            })}
                        />
                    </View>
                </CardBase>

                {/* Farm Card 2 */}
                <CardBase style={styles.farmCard}>
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2672&auto=format&fit=crop' }}
                        style={styles.cardImageBg}
                        imageStyle={styles.cardImage}
                    >
                        <View style={styles.cardOverlay}>
                            <View style={styles.badgeRow}>
                                <View style={[styles.statusBadge, { backgroundColor: AppColors.warning }]}>
                                    <Text style={styles.statusBadgeText}>Needs Water</Text>
                                </View>
                                <View style={styles.sizeBadge}>
                                    <Text style={styles.sizeBadgeText}>120 Acres</Text>
                                </View>
                            </View>

                            <View style={styles.farmInfoContainer}>
                                <Text style={styles.farmName}>Sunset Wheat Fields</Text>
                                <View style={styles.locationRow}>
                                    <MapPin size={14} color={AppColors.surface} />
                                    <Text style={styles.locationText}>South Sector, Block D</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={styles.actionRow}>
                        <StandardButton
                            title="VIEW DETAILS"
                            variant="secondary"
                            size="small"
                            style={styles.btnFlex}
                            onPress={() => navigation.navigate('FarmDetails', {
                                farm: {
                                    name: 'Sunset Wheat Fields',
                                    location: 'South Sector, Block D',
                                    size: '120 Acres',
                                    cropType: 'Wheat'
                                }
                            })}
                        />
                    </View>
                </CardBase>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    contentScroll: {
        flex: 1,
    },
    scrollPadding: {
        paddingHorizontal: 22,
        paddingTop: 18,
        paddingBottom: 30,
        gap: 20,
    },
    farmCard: {
        padding: 0,
        borderRadius: AppSpacing.radiusLg,
        overflow: 'hidden',
    },
    cardImageBg: {
        width: '100%',
        height: 160,
        justifyContent: 'flex-end',
    },
    cardImage: {
        borderTopLeftRadius: AppSpacing.radiusLg,
        borderTopRightRadius: AppSpacing.radiusLg,
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Dark gradient effect
        padding: 16,
        justifyContent: 'space-between',
        borderTopLeftRadius: AppSpacing.radiusLg,
        borderTopRightRadius: AppSpacing.radiusLg,
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusBadge: {
        backgroundColor: AppColors.success,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusBadgeText: {
        color: AppColors.surface,
        fontSize: 10,
        fontFamily: AppTypography.fontPrimaryBold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    sizeBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    sizeBadgeText: {
        color: AppColors.surface,
        fontSize: 11,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    farmInfoContainer: {
        justifyContent: 'flex-end',
    },
    farmName: {
        color: AppColors.surface,
        fontSize: 22,
        fontFamily: AppTypography.fontPrimaryBlack,
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        color: AppColors.surface,
        fontSize: 13,
        fontFamily: AppTypography.fontPrimaryMedium,
        opacity: 0.9,
    },
    actionRow: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
        backgroundColor: AppColors.card,
        borderTopWidth: 1,
        borderColor: AppColors.border,
        borderBottomLeftRadius: AppSpacing.radiusLg,
        borderBottomRightRadius: AppSpacing.radiusLg,
    },
    btnFlex: {
        flex: 1,
    }
});
