import React, { useState } from "react";
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

export default function SignInScreen({ navigation, onLogin }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Mock login
    const user = {
      name: "Jean Dupont",
      email: loginId,
    };
    if (onLogin) onLogin(user);
    navigation.navigate('Home');
  };

  const renderInput = (
    label,
    value,
    setValue,
    placeholder,
    icon,
    isPassword = false,
    showPass = false,
    setShowPass = null,
  ) => (
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
            {renderInput(
              "Email or Phone",
              loginId,
              setLoginId,
              "Enter your email or phone number",
              <User size={18} color={AppColors.textGrey} style={styles.icon} />,
            )}

            {renderInput(
              "Password",
              password,
              setPassword,
              "Enter your password",
              <Lock size={18} color={AppColors.textGrey} style={styles.icon} />,
              true,
              showPassword,
              setShowPassword,
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
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
