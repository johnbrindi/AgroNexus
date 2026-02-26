export const AppColors = {
  // Surfaces & Backgrounds
  page: '#F2F0EA',
  surface: '#F9F8F3',
  card: '#FFFFFF',
  cardSecondary: '#F5F3EE',
  input: '#EDEBE5',

  // Brand Green (7:1 contrast on white)
  primary: '#2D5A27',
  primaryLight: '#3D7035',
  primaryDeep: '#1A3D16',
  primarySubtle: '#B8D9B2',
  primaryWash: '#EEF7EC',

  // Status Colors (Saturated & Unambiguous)
  success: '#16A34A',
  successBg: '#F0FDF4',
  successBorder: '#BBF7D0',

  warning: '#D97706',
  warningBg: '#FFFBEB',
  warningBorder: '#FDE68A',

  danger: '#DC2626',
  dangerBg: '#FEF2F2',
  dangerBorder: '#FECACA',

  // Text Hierarchy
  txtPrimary: '#111827',   // 17:1 on white
  txtSecondary: '#374151', // 10:1 on white
  txtMuted: '#6B7280',     // 5.7:1 on white (use only for labels)
  txtOnPrimary: '#F9F8F3',

  // Borders & Dividers
  border: '#E5E3DC',
  borderStrong: '#D4D1C8',
};

export const AppSpacing = {
  radiusLg: 24,
  radiusMd: 16,
  radiusSm: 12,
  radiusXs: 8,
};

export const AppTypography = {
  fontPrimary: 'Manrope_400Regular',
  fontPrimaryMedium: 'Manrope_500Medium',
  fontPrimarySemiBold: 'Manrope_600SemiBold',
  fontPrimaryBold: 'Manrope_700Bold',
  fontPrimaryExtraBold: 'Manrope_800ExtraBold',
  fontPrimaryBlack: 'Manrope_900Black',

  fontMonoRegular: 'RobotoMono_400Regular',
  fontMonoMedium: 'RobotoMono_500Medium',
  fontMonoBold: 'RobotoMono_700Bold',
};

export const CommonStyles = {
  shadowXs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 16,
    elevation: 4,
  },
};
