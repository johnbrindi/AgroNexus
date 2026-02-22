import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LandingColors } from '../../constants';
import { Button } from '../../ui/Button';
import { useLanguage } from '../../../context/LanguageContext';

export const CTASection = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const { t } = useLanguage();
    const isMobile = width < 768;

    return (
        <View style={[styles.section, { paddingHorizontal: isMobile ? 16 : 48 }]}>
            <View style={styles.content}>
                <Text style={[styles.title, { fontSize: isMobile ? 28 : 36 }]}>{t('ctaTitle')}</Text>
                <Text style={[styles.subtitle, { fontSize: isMobile ? 16 : 18 }]}>
                    {t('ctaSubtitle')}
                </Text>
                <View style={[styles.actions, { flexDirection: isMobile ? 'column' : 'row' }]}>
                    <Button
                        title={t('getStartedFree')}
                        variant="yellow"
                        onPress={() => navigation.navigate('SignUp')}
                        style={[styles.ctaButton, { width: isMobile ? '100%' : 'auto' }]}
                    />
                    <Button
                        title={t('talkToSales')}
                        variant="outline"
                        onPress={() => console.log('Contact Sales')}
                        style={[styles.ctaButton, { width: isMobile ? '100%' : 'auto' }]}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        paddingVertical: 100,
        backgroundColor: LandingColors.softGray,
        alignItems: 'center',
    },
    content: {
        maxWidth: 800,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontWeight: '800',
        color: LandingColors.textPrimary,
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        color: LandingColors.textSecondary,
        textAlign: 'center',
        marginBottom: 48,
        lineHeight: 28,
    },
    actions: {
        gap: 16,
        justifyContent: 'center',
        width: '100%',
    },
    ctaButton: {
        minWidth: 200,
    },
});
