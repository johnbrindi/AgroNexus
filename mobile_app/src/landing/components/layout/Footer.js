import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LandingColors } from '../../constants';
import { Leaf } from 'lucide-react-native';
import { useLanguage } from '../../../context/LanguageContext';

export const Footer = () => {
    const { width } = useWindowDimensions();
    const { t } = useLanguage();
    const isMobile = width < 768;

    return (
        <View style={[styles.footer, { paddingHorizontal: isMobile ? 24 : 48 }]}>
            <View style={[styles.grid, { flexDirection: isMobile ? 'column' : 'row' }]}>
                <View style={styles.brandCol}>
                    <View style={[styles.logoRow, isMobile && { justifyContent: 'center' }]}>
                        <Leaf size={24} color={LandingColors.leafGreen} strokeWidth={3} />
                        <Text style={styles.footerLogoText}>AgroNexus</Text>
                    </View>
                    <Text style={[styles.brandDesc, isMobile && { textAlign: 'center', marginBottom: 40, alignSelf: 'center' }]}>
                        {t('footerBrandDesc')}
                    </Text>
                </View>

                <View style={[styles.linkCols, { gap: isMobile ? 40 : 32 }]}>
                    <FooterCol
                        title={t('platform')}
                        links={[t('features'), t('pricing'), t('hardware'), t('api')]}
                        isMobile={isMobile}
                    />
                    <FooterCol
                        title={t('company')}
                        links={[t('about'), t('careers'), t('blog'), t('contact')]}
                        isMobile={isMobile}
                    />
                    <FooterCol
                        title={t('resources')}
                        links={[t('documentation'), t('support'), t('community'), t('partners')]}
                        isMobile={isMobile}
                    />
                </View>
            </View>

            <View style={styles.bottom}>
                <Text style={[styles.copyright, isMobile && { textAlign: 'center' }]}>
                    © 2024 AgroNexus. {t('footerRights')}
                </Text>
            </View>
        </View>
    );
};

const FooterCol = ({ title, links, isMobile }) => (
    <View style={[styles.col, isMobile && { alignItems: 'center', minWidth: '45%' }]}>
        <Text style={styles.colTitle}>{title}</Text>
        {links.map(link => (
            <Text key={link} style={styles.colLink}>{link}</Text>
        ))}
    </View>
);

const styles = StyleSheet.create({
    footer: {
        backgroundColor: LandingColors.deepSlate,
        paddingTop: 80,
        paddingBottom: 40,
    },
    grid: {
        gap: 40,
        marginBottom: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 60,
    },
    brandCol: {
        flex: 2,
        minWidth: 280,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    footerLogoText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    brandDesc: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        lineHeight: 24,
        maxWidth: 320,
    },
    linkCols: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    col: {
        minWidth: 120,
    },
    colTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    colLink: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)',
        marginBottom: 12,
    },
    bottom: {
        alignItems: 'center',
    },
    copyright: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.4)',
    },
});
