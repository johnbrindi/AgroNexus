import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { Sprout, ShoppingBag, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
    const { selectRole } = useAuth();
    const [loading, setLoading] = React.useState(null);

    const handleRoleSelection = async (role) => {
        setLoading(role);
        try {
            await selectRole(role);
        } catch (error) {
            console.error('Role selection failed:', error);
        } finally {
            setLoading(null);
        }
    };

    const RoleCard = ({ title, description, icon: Icon, role, color }) => (
        <TouchableOpacity
            style={[
                styles.card,
                { borderLeftColor: color },
                loading === role && styles.cardLoading
            ]}
            onPress={() => handleRoleSelection(role)}
            disabled={loading !== null}
        >
            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <Icon size={32} color={color} />
            </View>
            <View style={styles.content}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>
            <View style={styles.arrowContainer}>
                <ChevronRight size={24} color={AppColors.txtMuted} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to AgroNexus</Text>
                <Text style={styles.subtitle}>Choose your profile to personalize your experience</Text>
            </View>

            <View style={styles.selectionContainer}>
                <RoleCard
                    title="Farmer"
                    description="Manage your crops, monitor soil health, and trade with the community."
                    icon={Sprout}
                    role="farmer"
                    color="#2D5A27" // forest
                />

                <View style={styles.divider}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line} />
                </View>

                <RoleCard
                    title="Consumer"
                    description="Order fresh farm produce directly and support local farmers."
                    icon={ShoppingBag}
                    role="consumer"
                    color="#D84315" // clay
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    You can change your profile type later in settings.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBlack,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
        textAlign: 'center',
        lineHeight: 24,
    },
    selectionContainer: {
        gap: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        borderLeftWidth: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    cardLoading: {
        opacity: 0.6,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    content: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
        lineHeight: 20,
    },
    arrowContainer: {
        marginLeft: 12,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#EEE',
    },
    orText: {
        paddingHorizontal: 16,
        color: AppColors.txtMuted,
        fontSize: 12,
        fontWeight: '700',
        fontFamily: AppTypography.fontMonoBold,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
    },
    footerText: {
        fontSize: 12,
        color: AppColors.txtMuted,
        fontFamily: AppTypography.fontPrimary,
        textAlign: 'center',
    },
});
