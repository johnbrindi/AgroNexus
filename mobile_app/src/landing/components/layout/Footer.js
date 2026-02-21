import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LandingColors, LandingSpacing } from '../../constants';
import { Leaf } from 'lucide-react-native';

export const Footer = () => {
    const { width } = useWindowDimensions();
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
                        Empowering Cameroonian agriculture through intelligent technology. Built for farmers, for farmers.
                    </Text>
                </View>

                <View style={[styles.linkCols, { gap: isMobile ? 40 : 32 }]}>
                    <FooterCol
                        title="Platform"
                        links={['Features', 'Pricing', 'Hardware', 'API']}
                        isMobile={isMobile}
                    />
                    <FooterCol
                        title="Company"
                        links={['About', 'Careers', 'Blog', 'Contact']}
                        isMobile={isMobile}
                    />
                    <FooterCol
                        title="Resources"
                        links={['Documentation', 'Support', 'Community', 'Partners']}
                        isMobile={isMobile}
                    />
                </View>
            </View>

            <View style={styles.bottom}>
                <Text style={[styles.copyright, isMobile && { textAlign: 'center' }]}>
                    © 2024 AgroNexus. All rights reserved. Built for Cameroonian Agriculture.
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
