import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Leaf } from 'lucide-react-native';
import { LandingColors } from '../../constants';

export const AnimatedLeaf = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Rotation animation
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.circle, { transform: [{ scale: pulseAnim }] }]}>
                <Leaf size={80} color={LandingColors.leafGreen} strokeWidth={2.5} />
            </Animated.View>

            <Animated.View style={[styles.scanOverlay, { transform: [{ rotate }] }]}>
                <View style={styles.scanLine} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: LandingColors.leafGreen,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    scanOverlay: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: LandingColors.leafGreen + '20',
        alignItems: 'center',
    },
    scanLine: {
        width: 4,
        height: '50%',
        backgroundColor: LandingColors.leafGreen,
        borderRadius: 4,
        opacity: 0.6,
    },
});
