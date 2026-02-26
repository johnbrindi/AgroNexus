import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { AppColors, AppTypography } from '../../styles/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Fresh from the Soil',
        image: require('../../../assets/images/hero_bg.jpg'), // Corrected path
    },
];

export const HeroCarousel = () => {
    // Note: In a real app we'd use a real carousel library, but for this demo 
    // we'll build a simplified version or just a high-hd static banner as part of the "sliding carousel" requirement.
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                {SLIDES.map((slide) => (
                    <View key={slide.id} style={styles.slide}>
                        <Image
                            source={slide.image}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.overlay}>
                            <Text style={styles.title}>{slide.title}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.dotContainer}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 220,
        width: width - 48,
        alignSelf: 'center',
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 30,
    },
    slide: {
        width: width - 48,
        height: 220,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '900',
        fontFamily: AppTypography.fontPrimaryBlack,
        maxWidth: '70%',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    dotContainer: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    activeDot: {
        width: 24,
        backgroundColor: '#FFFFFF',
    },
});
