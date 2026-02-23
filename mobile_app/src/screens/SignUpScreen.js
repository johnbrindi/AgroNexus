import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { AppColors } from '../styles/theme';
import {
    User,
    Phone,
    MapPin,
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckSquare,
    Square
} from 'lucide-react-native';

export default function SignUpScreen({ navigation }) {
    const { signIn } = useAuth();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        if (!agreed) return;
        setIsLoading(true);
        try {
            // Simulate account creation then auto-login
            await signIn(email, password);
        } catch (error) {
            console.error('Sign up failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderInput = (label, value, setValue, placeholder, icon, isPassword = false, showPass = false, setShowPass = null) => (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                {icon}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    placeholderTextColor={AppColors.textGrey}
                    secureTextEntry={isPassword && !showPass}
                    autoCapitalize="none"
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        {showPass ? (
                            <EyeOff size={18} color={AppColors.textGrey} />
                        ) : (
                            <Eye size={18} color={AppColors.textGrey} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join thousands of farmers growing smarter</Text>
                    </View>

                    {/* Form Card */}
                    <View style={styles.card}>
                        {renderInput('Full Name', name, setName, 'Enter your legal name', <User size={18} color={AppColors.textGrey} style={styles.icon} />)}

                        {renderInput('Phone Number', phone, setPhone, 'e.g., +237 ...', <Phone size={18} color={AppColors.textGrey} style={styles.icon} />)}

                        {renderInput('Location', location, setLocation, 'City, Region', <MapPin size={18} color={AppColors.textGrey} style={styles.icon} />)}

                        {renderInput('Email Address', email, setEmail, 'example@mail.com', <Mail size={18} color={AppColors.textGrey} style={styles.icon} />)}

                        {renderInput('Password', password, setPassword, 'Min. 8 chars', <Lock size={18} color={AppColors.textGrey} style={styles.icon} />, true, showPassword, setShowPassword)}

                        {renderInput('Confirm Password', confirmPassword, setConfirmPassword, 'Repeat password', <Lock size={18} color={AppColors.textGrey} style={styles.icon} />, true, showConfirmPassword, setShowConfirmPassword)}

                        {/* Legal & Action Section */}
                        <TouchableOpacity style={styles.complianceRow} onPress={() => setAgreed(!agreed)}>
                            {agreed ? (
                                <CheckSquare size={20} color={AppColors.primary} />
                            ) : (
                                <Square size={20} color={AppColors.textGrey} />
                            )}
                            <Text style={styles.complianceText}>
                                I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, (!agreed || isLoading) && { opacity: 0.6 }]}
                            onPress={handleSignUp}
                            disabled={!agreed || isLoading}
                        >
                            <Text style={styles.buttonText}>{isLoading ? 'Creating Account...' : 'Create Account'}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer Section */}
                    <TouchableOpacity
                        style={styles.footer}
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        <Text style={styles.footerText}>
                            Already have an account? <Text style={styles.signInText}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: AppColors.background,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginVertical: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: AppColors.primary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: AppColors.textGrey,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: 12,
    },
    fieldContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        color: AppColors.textGrey,
        marginBottom: 4,
        fontWeight: '600',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: AppColors.textDark,
        padding: 0,
    },
    complianceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 16,
    },
    complianceText: {
        fontSize: 12,
        color: AppColors.textGrey,
        marginLeft: 10,
        flex: 1,
        lineHeight: 16,
    },
    linkText: {
        color: AppColors.primary,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: AppColors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    footerText: {
        fontSize: 14,
        color: AppColors.textGrey,
    },
    signInText: {
        color: AppColors.primary,
        fontWeight: 'bold',
    },
});
