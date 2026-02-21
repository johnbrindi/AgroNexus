import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LandingColors } from '../landing/constants';

// Layout & Sections
import { Navigation } from '../landing/components/layout/Navigation';
import { HeroSection } from '../landing/components/sections/HeroSection';
import { SystemIntelligenceSection } from '../landing/components/sections/SystemIntelligenceSection';
import { TestimonialSection } from '../landing/components/sections/TestimonialSection';
import { CTASection } from '../landing/components/sections/CTASection';
import { Footer } from '../landing/components/layout/Footer';

export default function LandingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Navigation navigation={navigation} />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <HeroSection navigation={navigation} />
                <SystemIntelligenceSection />
                <TestimonialSection />
                <CTASection navigation={navigation} />
                <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});
