import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session/providers/google';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Animated, { FadeInDown } from 'react-native-reanimated';

WebBrowser.maybeCompleteAuthSession();

const clientId = '187645212473-f91qqcca2d2qveuqpl0r59t4hkoejng5.apps.googleusercontent.com';

export default function LoginScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'google' | null>(null);

  const [request, response, promptAsync] = useAuthRequest({
    clientId,
    redirectUri: makeRedirectUri({
      scheme: 'your-scheme',
      path: 'auth/callback',
    }),
  });

  const handleGoogleSignIn = async () => {
    setLoginMethod('google');
    const result = await promptAsync();
    if (result?.type === 'success') {
      router.replace('/(tabs)');
    }
  };

  const handlePhoneSignIn = () => {
    setLoginMethod('phone');
    // Implement phone number verification logic here
    router.replace('/(tabs)');
  };

  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200)}>
          <Text style={styles.appName}>PK News</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Stay informed with the latest news and stories
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={styles.inputContainer}>
          {loginMethod === 'phone' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handlePhoneSignIn}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.phoneButton}
                onPress={() => setLoginMethod('phone')}>
                <Ionicons name="phone-portrait-outline" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
                <Text style={styles.buttonText}>Continue with Phone</Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.googleButton}
                onPress={handleGoogleSignIn}
                disabled={!request}>
                <Ionicons name="logo-google" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
                <Text style={styles.buttonText}>Continue with Google</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#F2F2F7',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      padding: 24,
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    appName: {
      fontSize: 28,
      fontWeight: '800',
      color: '#007AFF',
      textAlign: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#000000',
      textAlign: 'center',
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      color: '#8E8E93',
      textAlign: 'center',
      marginBottom: 48,
    },
    inputContainer: {
      width: '100%',
    },
    input: {
      backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#000000',
      marginBottom: 16,
    },
    phoneButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 16,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#000000',
      marginLeft: 12,
    },
    continueButton: {
      backgroundColor: '#007AFF',
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
    },
    continueButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? '#2C2C2E' : '#E5E5EA',
    },
    dividerText: {
      color: '#8E8E93',
      paddingHorizontal: 16,
      fontSize: 14,
    },
  });