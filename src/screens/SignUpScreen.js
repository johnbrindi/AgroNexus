import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePhone, validatePassword, validateRequired } from '../utils/validation';
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
    const [errors, setErrors] = useState({});

    const handleSignUp = async () => {
        const newErrors = {};

        if (!validateRequired(name)) newErrors.name = "Full name is required";
        if (!validatePhone(phone)) newErrors.phone = "Invalid phone number";
        if (!validateRequired(location)) newErrors.location = "Location is required";
        if (!validateEmail(email)) newErrors.email = "Invalid email address";
        if (!validatePassword(password)) newErrors.password = "Min. 8 characters required";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!agreed) newErrors.agreed = "You must agree to the terms";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsLoading(true);
        try {
            await signIn(email, password);
        } catch (error) {
            console.error('Sign up failed:', error);
            setErrors({ auth: "Registration failed. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    const renderInput = (label, value, setValue, placeholder, icon, error, fieldName, isPassword = false, showPass = false, setShowPass = null, keyboardType = 'default', autoComplete = 'off') => (
        <View style={styles.fieldContainer}>
            <Text style={[styles.label, error && { color: AppColors.danger }]}>{label}</Text>
            <View style={[styles.inputWrapper, error && styles.inputError]}>
                {icon}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={(text) => {
                        setValue(text);
                        if (errors[fieldName]) {
                            setErrors({ ...errors, [fieldName]: null });
                        }
                    }}
                    placeholderTextColor={AppColors.textGrey}
                    secureTextEntry={isPassword && !showPass}
                    autoCapitalize="none"
                    keyboardType={keyboardType}
                    autoComplete={autoComplete}
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
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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
                        {errors.auth && <Text style={styles.mainErrorText}>{errors.auth}</Text>}

                        {renderInput('Full Name', name, setName, 'Enter your legal name', <User size={18} color={errors.name ? AppColors.danger : AppColors.textGrey} style={styles.icon} />, errors.name, 'name', false, null, null, 'default', 'name')}

                        {renderInput('Phone Number', phone, setPhone, 'e.g., +237 ...', <Phone size={18} color={errors.phone ? AppColors.danger : AppColors.textGrey} style={styles.icon} />, errors.phone, 'phone', false, null, null, 'phone-pad', 'tel')}

                        {renderInput('Location', location, setLocation, 'City, Region', <MapPin size={18} color={errors.location ? AppColors.danger : AppColors.textGrey} style={styles.icon} />, errors.location, 'location', false, null, null, 'default', 'postal-address')}

                        {renderInput('Email Address', email, setEmail, 'example@mail.com', <Mail size={18} color={errors.email ? AppColors.danger : AppColors.textGrey} style={styles.icon} />, errors.email, 'email', false, null, null, 'email-address', 'email')}

                        {renderInput('Password', password, setPassword, 'Min. 8 chars', <Lock size={18} color={errors.password ? AppColors.danger : AppColors.textGrey} style={styles.icon} />, errors.password, 'password', true, showPassword, setShowPassword, 'default', 'new-password')}

                        {renderInput('Confirm Password', confirmPassword, setConfirmPassword, 'Repeat password', <Lock size={18} color={errors.confirmPassword ? AppColors.danger : AppColors.textGrey} style={styles.icon} />, errors.confirmPassword, 'confirmPassword', true, showConfirmPassword, setShowConfirmPassword, 'default', 'password')}

                        {/* Legal & Action Section */}
                        <View>
                            <TouchableOpacity style={styles.complianceRow} onPress={() => {
                                setAgreed(!agreed);
                                if (errors.agreed) setErrors({ ...errors, agreed: null });
                            }}>
                                {agreed ? (
                                    <CheckSquare size={20} color={AppColors.primary} />
                                ) : (
                                    <Square size={20} color={errors.agreed ? AppColors.danger : AppColors.textGrey} />
                                )}
                                <Text style={styles.complianceText}>
                                    I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
                                </Text>
                            </TouchableOpacity>
                            {errors.agreed && <Text style={[styles.errorText, { marginTop: -12, marginBottom: 12 }]}>{errors.agreed}</Text>}
                        </View>

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
    inputError: {
        borderColor: AppColors.danger,
        backgroundColor: AppColors.dangerBg,
    },
    errorText: {
        color: AppColors.danger,
        fontSize: 10,
        marginTop: 4,
        marginLeft: 2,
        fontWeight: '500',
    },
    mainErrorText: {
        color: AppColors.danger,
        backgroundColor: AppColors.dangerBg,
        padding: 10,
        borderRadius: 12,
        textAlign: 'center',
        marginBottom: 12,
        fontSize: 13,
        fontWeight: '600',
        borderWidth: 1,
        borderColor: AppColors.danger,
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
