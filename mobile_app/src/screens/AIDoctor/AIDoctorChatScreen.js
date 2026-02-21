import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { AppColors, AppSpacing, AppTypography } from '../../styles/theme';
import { DashboardStatusBar } from '../../components/shared/DashboardStatusBar';
import { DashboardBottomNav } from '../../components/shared/DashboardBottomNav';

export default function AIDoctorChatScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <DashboardStatusBar />

            {/* Chat Header */}
            <View style={styles.chatHeader}>
                {/* Tab Switcher - matches AIDoctorScreen */}
                <View style={styles.tabSwitcher}>
                    <TouchableOpacity
                        style={styles.tabBtn}
                        onPress={() => navigation.navigate('AIDoctor')}
                    >
                        <Text style={styles.tabBtnText}>📸 Scan Crop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBtn, styles.tabBtnActive]}>
                        <Text style={[styles.tabBtnText, styles.tabBtnTextActive]}>💬 Ask AI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn}>
                        <Text style={styles.tabBtnText}>🕓 History</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.identityRow}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.backBtnText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.aiOrb}>
                        <Text style={styles.orbEmoji}>🌿</Text>
                    </View>
                    <View style={styles.nameBlock}>
                        <Text style={styles.aiName}>AgroNexus AI</Text>
                        <View style={styles.statusRow}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>ONLINE · Analysing your farm</Text>
                        </View>
                    </View>
                    <TouchableOpacity><Text style={styles.menuDots}>⋮</Text></TouchableOpacity>
                </View>

                {/* Context Pill */}
                <View style={styles.contextPill}>
                    <Text style={styles.contextEmoji}>🍅</Text>
                    <View style={styles.contextInfo}>
                        <Text style={styles.contextTitle}>Tomato Field — Zone A, Bafoussam</Text>
                        <Text style={styles.contextDetail}>Soil 62% · 27°C · Early Blight detected today</Text>
                    </View>
                    <View style={styles.alertDot} />
                </View>
            </View>

            <ScrollView
                style={styles.messageStream}
                contentContainerStyle={styles.streamPadding}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.dateDivider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dateText}>TODAY · 21 FEB</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* AI Message 1 */}
                <AiMessage
                    text="Habari Amina! 👋 I've just scanned your tomato field. I found **Early Blight** on 3 leaves in Zone A with **94% confidence**. What would you like to know?"
                    time="09:38 AM"
                />

                {/* User Message 1 */}
                <UserMessage text="What fungicide do I need and how much?" time="09:39 AM ✓✓" />

                {/* AI Message 2 with Data Card */}
                <AiMessage
                    text="For your **0.4 ha tomato field**, here's your treatment plan:"
                    time="09:39 AM"
                    dataCard={[
                        { icon: "🧪", label: "Bordeaux Mixture", sub: "copper sulfate + lime" },
                        { icon: "📐", label: "2g per litre", sub: "dilution ratio" },
                        { icon: "🪣", label: "~80 litres total", sub: "for your field size" },
                        { icon: "⏰", label: "Apply at 6:00 AM", sub: "before heat rises" },
                        { icon: "📅", label: "Every 7–10 days", sub: "for 3 weeks" },
                    ]}
                />

                {/* User Message 2 */}
                <UserMessage text="Is my soil moisture okay right now?" time="09:40 AM ✓✓" />

                {/* AI Message 3 */}
                <AiMessage
                    text="Zone A is at **62%** — that's perfect for tomatoes. ✅ ⚠️ **Zone B sensor is offline.** Manual check recommended before you apply fungicide — blight spreads faster in waterlogged soil."
                    time="09:40 AM"
                />

                {/* Typing Indicator */}
                <View style={styles.typingIndicatorRow}>
                    <View style={styles.aiMessageAvatar}>
                        <Text style={styles.avatarEmoji}>🌿</Text>
                    </View>
                    <View style={styles.typingBubble}>
                        <View style={styles.dot} />
                        <View style={[styles.dot, { opacity: 0.6 }]} />
                        <View style={[styles.dot, { opacity: 0.3 }]} />
                    </View>
                </View>
            </ScrollView>

            {/* Quick Suggests */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestArea} contentContainerStyle={styles.suggestPadding}>
                <QuickSuggest text="💧 When to irrigate?" />
                <QuickSuggest text="🌡️ Heat stress tips" />
                <QuickSuggest text="📅 Harvest estimate" />
                <QuickSuggest text="🛒 Sell my tomatoes" />
            </ScrollView>

            {/* Input Bar */}
            <View style={styles.inputOuter}>
                <View style={styles.inputRow}>
                    <TouchableOpacity style={styles.micBtn}>
                        <Text style={styles.micEmoji}>🎙️</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask about your tomato farm…"
                        placeholderTextColor={AppColors.txtMuted}
                    />
                    <TouchableOpacity style={styles.sendBtn}>
                        <Text style={styles.sendIcon}>➤</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <DashboardBottomNav activeTab="AI_DOC" navigation={navigation} />
        </SafeAreaView>
    );
}

const AiMessage = ({ text, time, dataCard }) => (
    <View style={styles.aiMsgRow}>
        <View style={styles.aiMessageAvatar}>
            <Text style={styles.avatarEmoji}>🌿</Text>
        </View>
        <View style={styles.aiBubble}>
            <Text style={styles.aiSender}>AGRONEXUS AI</Text>
            <Text style={styles.aiText}>{text}</Text>
            {dataCard && (
                <View style={styles.dataCard}>
                    {dataCard.map((item, idx) => (
                        <View key={idx} style={styles.dataRow}>
                            <Text style={styles.dataIcon}>{item.icon}</Text>
                            <Text style={styles.dataLabel}>
                                <Text style={styles.dataBold}>{item.label}</Text> {item.sub}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
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

const QuickSuggest = ({ text }) => (
    <TouchableOpacity style={styles.suggestChip}>
        <Text style={styles.suggestText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EDE7',
    },
    chatHeader: {
        backgroundColor: AppColors.forestDark,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
    },
    tabSwitcher: {
        flexDirection: 'row',
        backgroundColor: 'rgba(245, 242, 238, 0.07)',
        borderRadius: 8,
        padding: 3,
        marginBottom: 10,
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 6,
    },
    tabBtnActive: {
        backgroundColor: 'rgba(245, 242, 238, 0.13)',
    },
    tabBtnText: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(245, 242, 238, 0.50)',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    tabBtnTextActive: {
        color: AppColors.txtOnDark,
    },
    identityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    backBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(245, 242, 238, 0.10)',
        borderWidth: 1,
        borderColor: 'rgba(245, 242, 238, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backBtnText: {
        color: AppColors.txtOnDark,
        fontSize: 14,
    },
    aiOrb: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: AppColors.forest, // Gradient placeholder
        borderWidth: 2,
        borderColor: 'rgba(245, 242, 238, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orbEmoji: {
        fontSize: 18,
    },
    nameBlock: {
        flex: 1,
    },
    aiName: {
        fontSize: 15,
        fontWeight: '900',
        color: AppColors.txtOnDark,
        fontFamily: AppTypography.fontPrimaryBlack,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#69F0AE',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#69F0AE',
        fontFamily: AppTypography.fontPrimaryBold,
    },
    menuDots: {
        fontSize: 20,
        color: 'rgba(245, 242, 238, 0.5)',
    },
    contextPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(245, 242, 238, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(245, 242, 238, 0.14)',
        borderRadius: AppSpacing.radiusSm,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    contextEmoji: {
        fontSize: 20,
    },
    contextInfo: {
        flex: 1,
    },
    contextTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: AppColors.txtOnDark,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    contextDetail: {
        fontSize: 10,
        color: 'rgba(245, 242, 238, 0.65)',
        fontWeight: '500',
        marginTop: 1,
        fontFamily: AppTypography.fontPrimaryMedium,
    },
    alertDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: AppColors.gold,
        shadowColor: AppColors.gold,
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    messageStream: {
        flex: 1,
    },
    streamPadding: {
        padding: 14,
        gap: 12,
        paddingBottom: 20,
    },
    dateDivider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 4,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(121, 85, 72, 0.15)',
    },
    dateText: {
        fontSize: 10,
        fontWeight: '700',
        color: AppColors.txtMuted,
        letterSpacing: 0.5,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    aiMsgRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    userMsgRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    aiMessageAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: AppColors.forest,
        borderWidth: 1,
        borderColor: 'rgba(45, 90, 39, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
    },
    avatarEmoji: {
        fontSize: 13,
    },
    aiBubble: {
        backgroundColor: AppColors.cream,
        borderWidth: 1,
        borderColor: AppColors.border,
        borderRadius: 16,
        borderTopLeftRadius: 4,
        paddingHorizontal: 14,
        paddingVertical: 11,
        maxWidth: '75%',
        shadowColor: '#0F240A',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    aiSender: {
        fontSize: 9,
        fontWeight: '700',
        color: AppColors.forest,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        marginBottom: 5,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    aiText: {
        fontSize: 13,
        color: AppColors.txtPrimary,
        lineHeight: 20,
        fontFamily: AppTypography.fontPrimary,
    },
    aiTime: {
        fontSize: 9,
        color: AppColors.txtMuted,
        marginTop: 5,
        letterSpacing: 0.2,
        fontFamily: AppTypography.fontPrimary,
    },
    userBubble: {
        backgroundColor: AppColors.forest,
        borderRadius: 16,
        borderTopRightRadius: 4,
        paddingHorizontal: 14,
        paddingVertical: 11,
        maxWidth: '75%',
        shadowColor: '#2D5A27',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 3,
    },
    userText: {
        fontSize: 13,
        color: AppColors.txtOnDark,
        lineHeight: 20,
        fontFamily: AppTypography.fontPrimary,
    },
    userTime: {
        fontSize: 9,
        color: 'rgba(245, 242, 238, 0.5)',
        marginTop: 5,
        textAlign: 'right',
        fontFamily: AppTypography.fontPrimary,
    },
    dataCard: {
        backgroundColor: AppColors.offwhiteWarm,
        borderWidth: 1,
        borderColor: AppColors.border,
        borderRadius: AppSpacing.radiusSm,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 8,
        gap: 5,
    },
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dataIcon: {
        fontSize: 14,
        width: 20,
        textAlign: 'center',
    },
    dataLabel: {
        fontSize: 12,
        color: AppColors.txtSecondary,
        fontFamily: AppTypography.fontPrimary,
    },
    dataBold: {
        fontWeight: '700',
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    typingIndicatorRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    typingBubble: {
        backgroundColor: AppColors.cream,
        borderWidth: 1,
        borderColor: AppColors.border,
        borderRadius: 16,
        borderTopLeftRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 13,
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: AppColors.txtMuted,
    },
    suggestArea: {
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingVertical: 8,
        maxHeight: 50,
    },
    suggestPadding: {
        gap: 7,
    },
    suggestChip: {
        backgroundColor: AppColors.cream,
        borderWidth: 1.5,
        borderColor: 'rgba(45, 90, 39, 0.22)',
        borderRadius: 20,
        paddingHorizontal: 13,
        paddingVertical: 8,
        justifyContent: 'center',
    },
    suggestText: {
        fontSize: 12,
        fontWeight: '700',
        color: AppColors.forest,
        fontFamily: AppTypography.fontPrimaryBold,
    },
    inputOuter: {
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 14,
        borderTopWidth: 1,
        borderTopColor: 'rgba(121, 85, 72, 0.12)',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: AppColors.cream,
        borderWidth: 1.5,
        borderColor: AppColors.borderStrong,
        borderRadius: 24,
        paddingLeft: 16,
        paddingRight: 6,
        paddingVertical: 6,
        shadowColor: '#0F240A',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    micBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: AppColors.offwhiteWarm,
        borderWidth: 1.5,
        borderColor: AppColors.borderStrong,
        alignItems: 'center',
        justifyContent: 'center',
    },
    micEmoji: {
        fontSize: 16,
    },
    input: {
        flex: 1,
        fontSize: 13,
        color: AppColors.txtPrimary,
        fontFamily: AppTypography.fontPrimary,
        paddingVertical: 5,
    },
    sendBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: AppColors.forest, // Gradient placeholder
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: AppColors.forest,
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 4,
    },
    sendIcon: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '900',
    },
});
