import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { View, Text, StyleSheet, ImageBackground, useWindowDimensions, Platform, TouchableOpacity } from 'react-native';
import { LandingColors, LandingSpacing } from '../../constants';
import { GlassCard } from '../../ui/GlassCard';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

export const HeroSection = ({ navigation }) => {
    const { t, locale, toggleLanguage } = useLanguage();
    const { width, height } = useWindowDimensions();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    return (
        <View style={[styles.heroContainer, { height: height }]}>
            <ImageBackground
                source={require('../../../../assets/images/hero_bg.jpg')}
                style={styles.bgImage}
            >
                <View style={styles.overlay}>
                    {/* Floating Language Switcher */}
                    <TouchableOpacity
                        onPress={toggleLanguage}
                        style={styles.floatingLangToggle}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.langText}>
                            {locale === 'en' ? 'FR' : 'EN'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.contentWrapper}>
                        <GlassCard style={[
                            styles.card,
                            {
                                width: isMobile ? '92%' : isTablet ? '80%' : '60%',
                                padding: isMobile ? 24 : 60,
                                backgroundColor: 'rgba(255, 255, 255, 0.45)'
                            }
                        ]}>
                            <Badge text={t('heroBadge')} color={LandingColors.leafGreen} />

                            <Text style={[
                                styles.title,
                                {
                                    fontSize: isMobile ? 36 : isTablet ? 52 : 72,
                                    lineHeight: isMobile ? 44 : isTablet ? 60 : 80
                                }
                            ]}>
                                {t('heroTitle')}
                            </Text>

                            <Text style={[
                                styles.description,
                                { fontSize: isMobile ? 16 : 18 }
                            ]}>
                                {t('heroDesc')}
                            </Text>

                            <View style={[
                                styles.ctaRow,
                                { flexDirection: isMobile ? 'column' : 'row' }
                            ]}>
                                <Button
                                    title={t('getStarted')}
                                    variant="yellow"
                                    onPress={() => navigation.navigate('SignUp')}
                                    style={[styles.ctaButton, isMobile && { width: '100%' }]}
                                />
                                <Button
                                    title={t('watchDemo')}
                                    variant="outline"
                                    onPress={() => console.log('Demo Clicked')}
                                    style={[styles.ctaButton, isMobile && { width: '100%' }]}
                                />
                            </View>
                        </GlassCard>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    heroContainer: {
        width: '100%',
        flex: 1,
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingLangToggle: {
        position: 'absolute',
        top: 40,
        right: 24,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        ...Platform.select({
            web: {
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
            }
        })
    },
    langText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 1,
    },
    contentWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        maxWidth: 900,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        color: LandingColors.textPrimary,
        textAlign: 'center',
        letterSpacing: -1,
        marginBottom: 20,
    },
    description: {
        lineHeight: 26,
        color: LandingColors.textSecondary,
        textAlign: 'center',
        maxWidth: 600,
        marginBottom: 40,
    },
    ctaRow: {
        gap: 16,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctaButton: {
        minWidth: 200,
    },
});
