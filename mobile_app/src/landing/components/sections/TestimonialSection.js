import React from 'react';
import { View, Text, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { LandingColors, LandingSpacing } from '../../constants';
import { Quote } from 'lucide-react-native';

export const TestimonialSection = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={[styles.section, { height: isMobile ? 900 : 800 }]}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1595841696677-5231dfeb7bc0?q=80&w=2000&auto=format&fit=crop' }}
                style={styles.bgImage}
                blurRadius={4} // Reduced from 10
            >
                <View style={[styles.overlay, { paddingHorizontal: isMobile ? 16 : 48 }]}>
                    <View style={styles.content}>
                        <View style={styles.quoteIconBox}>
                            <Quote size={isMobile ? 80 : 120} color={LandingColors.leafGreen} style={styles.quoteIcon} />
                        </View>

                        <Text style={[styles.quoteText, { fontSize: isMobile ? 20 : 28, lineHeight: isMobile ? 32 : 42 }]}>
                            "AgroNexus transformed my 5-hectare farm in Bafoussam. The AI recommendations increased my maize yield by 40%, and the marketplace connected me directly with buyers—no middlemen taking cuts. This is the future of Cameroonian agriculture."
                        </Text>

                        <View style={[styles.authorCard, { flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }]}>
                            <View style={[styles.avatar, isMobile && { marginBottom: 16 }]}>
                                <Text style={styles.avatarText}>AN</Text>
                            </View>
                            <View style={{ alignItems: isMobile ? 'center' : 'flex-start' }}>
                                <Text style={styles.authorName}>Amina Ngono</Text>
                                <Text style={styles.authorTitle}>Commercial Farmer, West Region</Text>
                            </View>
                        </View>

                        <View style={[styles.metricsContainer, { gap: isMobile ? 16 : 40 }]}>
                            <TestimonialMetric value="+40%" label="Yield Increase" isMobile={isMobile} />
                            <TestimonialMetric value="3.2M" label="FCFA Rev" isMobile={isMobile} />
                            <TestimonialMetric value="6 mo" label="To ROI" isMobile={isMobile} />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const TestimonialMetric = ({ value, label, isMobile }) => (
    <View style={[styles.metricItem, { padding: isMobile ? 16 : 24 }]}>
        <Text style={[styles.mValue, { fontSize: isMobile ? 24 : 32 }]}>{value}</Text>
        <Text style={styles.mLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    section: {
        width: '100%',
        backgroundColor: LandingColors.deepSlate,
    },
    bgImage: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(30, 41, 59, 0.85)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        maxWidth: 1000,
        width: '100%',
        alignItems: 'center',
    },
    quoteIconBox: {
        opacity: 0.3,
        marginBottom: -20,
    },
    quoteIcon: {
        transform: [{ rotate: '180deg' }],
    },
    quoteText: {
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 40,
    },
    authorCard: {
        gap: 20,
        marginBottom: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 40,
        width: '100%',
        justifyContent: 'center',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: LandingColors.leafGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    authorName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    authorTitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
    },
    metricItem: {
        alignItems: 'center',
        flex: 1,
        minWidth: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    mValue: {
        fontWeight: '800',
        color: LandingColors.leafGreen,
        marginBottom: 4,
    },
    mLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
        fontWeight: '600',
        textAlign: 'center',
    },
});
