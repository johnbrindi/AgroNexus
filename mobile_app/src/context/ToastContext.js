import React, { createContext, useState, useContext, useCallback, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react-native';
import { AppColors, AppTypography } from '../styles/theme';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-100)).current;
    const timeoutRef = useRef(null);

    const showToast = useCallback((message, type = 'success') => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setToast({ visible: true, message, type });

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 50, // Distance from top
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();

        timeoutRef.current = setTimeout(hideToast, 1500);
    }, []);

    const hideToast = useCallback(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setToast(prev => ({ ...prev, visible: false }));
        });
    }, []);

    const getIcon = () => {
        switch (toast.type) {
            case 'success': return <CheckCircle2 size={24} color="#FFF" />;
            case 'error': return <AlertCircle size={24} color="#FFF" />;
            default: return <Info size={24} color="#FFF" />;
        }
    };

    const getBgColor = () => {
        switch (toast.type) {
            case 'success': return AppColors.primary;
            case 'error': return '#E53935';
            default: return '#1976D2';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast.visible && (
                <Animated.View
                    style={[
                        styles.toastContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                            backgroundColor: getBgColor()
                        }
                    ]}
                >
                    <View style={styles.iconArea}>
                        {getIcon()}
                    </View>
                    <View style={styles.contentArea}>
                        <Text style={styles.messageText}>{toast.message}</Text>
                    </View>
                    <TouchableOpacity onPress={hideToast} style={styles.closeBtn}>
                        <X size={18} color="rgba(255,255,255,0.7)" />
                    </TouchableOpacity>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
    },
    iconArea: {
        marginRight: 12,
    },
    contentArea: {
        flex: 1,
    },
    messageText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '700',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    closeBtn: {
        padding: 4,
    }
});
