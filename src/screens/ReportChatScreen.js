import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, AppSpacing, AppTypography, CommonStyles } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';


export default function ReportChatScreen({ navigation }) {
    const { width } = useWindowDimensions();
    const { t } = useLanguage();

    return (
        <SafeAreaView style={styles.container}>


            {/* Header / Sub-tabs */}
            <View style={styles.header}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() => navigation.navigate('Report')}
                    >
                        <Text style={styles.tabText}>{t('report')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                        <Text style={[styles.tabText, styles.activeTabText]}>CHAT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() => navigation.navigate('ReportHistory')}
                    >
                        <Text style={styles.tabText}>HISTORY</Text>
                    </TouchableOpacity>
                </View>

                {/* Context Pill */}
                <View style={styles.contextPill}>
                    <View style={styles.contextIconBox}>
                        <Text style={styles.contextIcon}>🍅</Text>
                    </View>
                    <View style={styles.contextInfo}>
                        <Text style={styles.contextTitle}>Tomato Field · Zone A</Text>
                        <Text style={styles.contextStatus}>Early Blight detected today</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.messageStream}
                contentContainerStyle={styles.streamPadding}
                showsVerticalScrollIndicator={false}
            >
                <AiMessage
                    text="Hello Amina! I've analyzed your scan from Zone A. I'm 94% certain this is **Early Blight**."
                    time="9:41 AM"
                />
                <UserMessage
                    text="What should I do first? It's spreading fast."
                    time="9:42 AM"
                />
                <AiMessage
                    text="The most urgent step is to **prune and remove** infected leaves. Do not compost them, as the spores will survive."
                    time="9:42 AM"
                />
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputArea}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask AI..."
                        placeholderTextColor={AppColors.txtMuted}
                    />
                    <TouchableOpacity style={styles.sendBtn}>
                        <Text style={styles.sendIcon}>➤</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}

const AiMessage = ({ text, time }) => (
    <View style={styles.aiMsgRow}>
        <View style={styles.aiBubble}>
            <Text style={styles.aiText}>{text}</Text>
            <Text style={styles.aiTime}>{time}</Text>
        </View>
    </View>
);

const UserMessage = ({ text, time }) => (
    <View style={styles.userMsgRow}>
        <View style={styles.userBubble}>
            <Text style={styles.userText}>{text}</Text>
            <Text style={styles.userTime}>{time}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.page,
    },
    header: {
        backgroundColor: AppColors.surface,
        borderBottomWidth: 1,
        borderColor: AppColors.border,
        paddingBottom: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 22,
        paddingTop: 10,
        paddingBottom: 16,
        gap: 12,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: AppColors.inputBg,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    activeTab: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    tabText: {
        fontSize: 11,
        fontWeight: '800',
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimaryExtraBold,
    },
    activeTabText: {
        color: '#FFF',
    },
    contextPill: {
        marginHorizontal: 22,
        backgroundColor: AppColors.page,
        borderRadius: AppSpacing.radiusMd,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    contextIconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: AppColors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contextIcon: {
        fontSize: 20,
    },
    contextInfo: {
        flex: 1,
    },
    contextTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    contextStatus: {
        fontSize: 11,
        color: AppColors.primary,
        fontWeight: '700',
        marginTop: 1,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    messageStream: {
        flex: 1,
    },
    streamPadding: {
        padding: 22,
        gap: 16,
    },
    aiMsgRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    aiBubble: {
        backgroundColor: AppColors.surface,
        borderWidth: 1,
        borderColor: AppColors.border,
        padding: 16,
        borderRadius: 20,
        borderTopLeftRadius: 4,
        maxWidth: '85%',
    },
    aiText: {
        fontSize: 14,
        color: AppColors.txtPrimary,
        lineHeight: 20,
        fontFamily: AppTypography.fontPrimary,
    },
    aiTime: {
        fontSize: 10,
        color: AppColors.txtMuted,
        marginTop: 6,
        fontFamily: AppTypography.fontPrimary,
    },
    userMsgRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    userBubble: {
        backgroundColor: AppColors.primary,
        padding: 16,
        borderRadius: 20,
        borderTopRightRadius: 4,
        maxWidth: '85%',
    },
    userText: {
        fontSize: 14,
        color: '#FFF',
        lineHeight: 20,
        fontFamily: AppTypography.fontPrimary,
    },
    userTime: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 6,
        textAlign: 'right',
        fontFamily: AppTypography.fontPrimary,
    },
    inputArea: {
        padding: 16,
        paddingBottom: 24,
        backgroundColor: AppColors.surface,
        borderTopWidth: 1,
        borderColor: AppColors.border,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.inputBg,
        borderRadius: 28,
        paddingLeft: 20,
        paddingRight: 6,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: AppColors.borderStrong,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimary,
    },
    sendBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendIcon: {
        fontSize: 16,
        color: '#FFF',
        marginLeft: 2,
    },
});
