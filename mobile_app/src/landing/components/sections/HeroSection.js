import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { LandingColors, LandingSpacing } from '../../constants';
import { GlassCard } from '../../ui/GlassCard';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

export const HeroSection = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    return (
        <View style={[styles.heroContainer, { minHeight: Math.max(isMobile ? 800 : 800, height) }]}>
            <ImageBackground
                source={require('../../../../assets/images/hero_bg.jpg')}
                style={styles.bgImage}
                blurRadius={2} // Very subtle blur to keep image sharp
            >
                <View style={[styles.overlay, isMobile && { paddingTop: 40 }]}>
                    <View style={[styles.scrollContent, { paddingHorizontal: isMobile ? 12 : 48 }]}>
                        <GlassCard style={[styles.card, { padding: isMobile ? 20 : 72, backgroundColor: 'rgba(255, 255, 255, 0.4)' }]}>
                            <Badge text="✓ Trusted by 10,000+ Farmers" />

                            <Text style={[styles.title, { fontSize: isMobile ? 32 : isTablet ? 48 : 64, lineHeight: isMobile ? 40 : isTablet ? 56 : 72 }]}>
                                Transform Your Farm with{"\n"}
                                <Text style={styles.gradientText}>Intelligent Agriculture</Text>
                            </Text>

                            <Text style={[styles.description, { fontSize: isMobile ? 15 : 18 }]}>
                                Harness AI-powered insights, real-time IoT monitoring, and direct marketplace access to maximize your yield, reduce waste, and increase profitability.
                            </Text>

                            <View style={styles.ctaRow}>
                                <Button
                                    title="Get Started"
                                    variant="yellow"
                                    onPress={() => navigation.navigate('SignUp')}
                                    style={[styles.primaryCta, { width: isMobile ? '100%' : 'auto' }]}
                                />
                                <Button
                                    title="Watch Demo"
                                    variant="outline"
                                    onPress={() => console.log('Demo Clicked')}
                                    style={{ width: isMobile ? '100%' : 'auto' }}
                                />
                            </View>

                            <View style={[styles.statsRow, { flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 32 }]}>
                                <StatItem value="45%" label="Yield Increase" isMobile={isMobile} />
                                <StatItem value="30%" label="Water Savings" isMobile={isMobile} />
                                <StatItem value="98%" label="AI Accuracy" isMobile={isMobile} />
                            </View>
                        </GlassCard>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const StatItem = ({ value, label, isMobile }) => (
    <View style={[styles.statItem, isMobile && { borderRightWidth: 0, paddingBottom: 16 }]}>
        <Text style={[styles.statValue, { fontSize: isMobile ? 24 : 32 }]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    heroContainer: {
        width: '100%',
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        maxWidth: 1000,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: '800',
        color: LandingColors.textPrimary,
        textAlign: 'center',
        letterSpacing: -1,
        marginBottom: 24,
    },
    gradientText: {
        color: LandingColors.leafGreen,
    },
    description: {
        lineHeight: 28,
        color: LandingColors.textSecondary,
        textAlign: 'center',
        maxWidth: 700,
        marginBottom: 40,
    },
    ctaRow: {
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 64,
        width: '100%',
    },
    primaryCta: {
        minWidth: 240,
    },
    statsRow: {
        justifyContent: 'space-between',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: LandingColors.borderGray,
        paddingTop: 40,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontWeight: '800',
        color: LandingColors.leafGreen,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: LandingColors.textSecondary,
        textAlign: 'center',
    },
});
