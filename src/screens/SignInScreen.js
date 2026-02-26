import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { validatePassword, validateRequired } from "../utils/validation";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AppColors } from '../styles/theme';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Chrome, // Using Chrome as a placeholder for Google logo in lucide
} from "lucide-react-native";

export default function SignInScreen({ navigation }) {
  const { signIn } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const newErrors = {};
    if (!validateRequired(loginId)) {
      newErrors.loginId = "Email or phone is required";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      await signIn(loginId, password);
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ auth: "Invalid credentials. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    label,
    value,
    setValue,
    placeholder,
    icon,
    error,
    isPassword = false,
    showPass = false,
    setShowPass = null,
    keyboardType = "default",
    autoComplete = "off",
  ) => (
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
            if (errors[label.toLowerCase()] || errors.loginId || errors.password) {
              setErrors({ ...errors, [label === "Email or Phone" ? "loginId" : "password"]: null });
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to continue to your farm dashboard
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {errors.auth && <Text style={styles.mainErrorText}>{errors.auth}</Text>}

            {renderInput(
              "Email or Phone",
              loginId,
              setLoginId,
              "Enter your email or phone number",
              <User size={18} color={errors.loginId ? AppColors.danger : AppColors.textGrey} style={styles.icon} />,
              errors.loginId,
              false,
              null,
              null,
              "email-address",
              "username"
            )}

            {renderInput(
              "Password",
              password,
              setPassword,
              "Enter your password",
              <Lock size={18} color={errors.password ? AppColors.danger : AppColors.textGrey} style={styles.icon} />,
              errors.password,
              true,
              showPassword,
              setShowPassword,
              "default",
              "password"
            )}

            {/* Utility Row */}
            <View style={styles.utilityRow}>
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                {rememberMe ? (
                  <CheckSquare size={18} color={AppColors.textGrey} />
                ) : (
                  <Square size={18} color={AppColors.textGrey} />
                )}
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              style={[styles.button, isLoading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>{isLoading ? "Signing In..." : "Sign In"}</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Button */}
            <TouchableOpacity style={styles.socialButton}>
              <Chrome
                size={20}
                color={AppColors.textDark}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text style={styles.signUpText}>Sign Up for free</Text>
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
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginVertical: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: AppColors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textGrey,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    // padding: 24 12,
    paddingHorizontal: 12,
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: AppColors.textGrey,
    marginBottom: 8,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderColor: AppColors.danger,
    backgroundColor: AppColors.dangerBg,
  },
  errorText: {
    color: AppColors.danger,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: "500",
  },
  mainErrorText: {
    color: AppColors.danger,
    backgroundColor: AppColors.dangerBg,
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: AppColors.danger,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: AppColors.textDark,
    padding: 0,
  },
  utilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    color: AppColors.textGrey,
    marginLeft: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: AppColors.textGrey,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 18,
    borderRadius: 16,
  },
  socialIcon: {
    marginRight: 12,
  },
  socialButtonText: {
    color: AppColors.textDark,
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 16,
    color: AppColors.textGrey,
  },
  signUpText: {
    color: AppColors.primary,
    fontWeight: "bold",
  },
});
