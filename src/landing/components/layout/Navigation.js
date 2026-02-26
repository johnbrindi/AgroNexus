import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, useWindowDimensions, Animated } from 'react-native';
import { Leaf, Menu, X, Globe } from 'lucide-react-native';
import { LandingColors, LandingSpacing } from '../../constants';
import { Button } from '../../ui/Button';
import { useLanguage } from '../../../context/LanguageContext';

export const Navigation = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const { locale, t, toggleLanguage } = useLanguage();
    const isMobile = width < 768;
    const isTablet = width < 1024;

    return (
        <View style={[styles.nav, { paddingHorizontal: isMobile ? 16 : 24 }]}>
            <View style={styles.logoRow}>
                <Leaf size={isMobile ? 20 : 24} color={LandingColors.leafGreen} strokeWidth={3} />
                <Text style={[styles.logoText, { fontSize: isMobile ? 20 : 24 }]}>AgroNexus</Text>
            </View>

            {!isTablet && (
                <View style={styles.links}>
                    <Text style={styles.link}>{t('platform')}</Text>
                    <Text style={styles.link}>{t('solutions')}</Text>
                    <Text style={styles.link}>{t('hardware')}</Text>
                    <Text style={styles.link}>{t('pricing')}</Text>
                </View>
            )}

            <View style={styles.actions}>
                <TouchableOpacity onPress={toggleLanguage} style={styles.langToggle}>
                    <Text style={styles.langText}>{locale.toUpperCase()}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signInText}>{t('signIn')}</Text>
                </TouchableOpacity>
                <Button
                    title={isMobile ? t('join') : t('getStarted')}
                    onPress={() => navigation.navigate('SignUp')}
                    style={[styles.navButton, isMobile && { paddingHorizontal: 12 }]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    nav: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        ...Platform.select({
            web: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backdropFilter: 'blur(20px)',
                borderBottomWidth: 1,
                borderBottomColor: LandingColors.borderGray,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        fontWeight: '800',
        color: LandingColors.textPrimary,
    },
    links: {
        flexDirection: 'row',
        gap: 32,
        alignItems: 'center',
    },
    link: {
        fontSize: 15,
        fontWeight: '500',
        color: LandingColors.textSecondary,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    signInText: {
        fontSize: 15,
        fontWeight: '600',
        color: LandingColors.textPrimary,
    },
    navButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    langToggle: {
        backgroundColor: LandingColors.softGray,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: LandingColors.borderGray,
    },
    langText: {
        fontSize: 12,
        fontWeight: '700',
        color: LandingColors.textPrimary,
    },
});
