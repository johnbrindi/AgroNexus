# Frontend Implementation Roadmap

This roadmap is designed for the next developer to implement the features inside the pre-configured folder structure. 

> [!IMPORTANT]
> The folder structure in `src/screens/` has been set up with empty `index.js` files. 
> Your task is to implement the functionality inside these files, moving or referencing the designs in `src/screens/HomeScreen.js`, etc., as you go.

## Component Checklist

### 1. Global Language Support
- [x] Context provider implemented in `src/context/LanguageContext.js`.
- [x] Landing page fully translated (EN/FR).
- [x] Home and Profile screens translated (EN/FR).
- [ ] **Next Step**: Map remaining screens (Scanner, Marketplace, Auth) to the translation keys.

### 2. Feature Screen Implementation
The following folders are waiting for implementation:
- **Home**: `src/screens/Home/index.js` (Reference `src/screens/HomeScreen.js`)
- **Devices**: `src/screens/Devices/index.js` (Reference `src/screens/DevicesScreen.js`)
- **Scanner**: `src/screens/AIDoctor/Scanner.js` (Reference `src/screens/AIDoctorScreen.js`)
- **Chat**: `src/screens/AIDoctor/Chat.js` (Reference `src/screens/AIDoctorChatScreen.js`)
- **Marketplace**: `src/screens/Marketplace/index.js` (Reference `src/screens/MarketplaceScreen.js`)

## Development Instructions
1. **Dynamic Data**: Use the hook pattern found in `src/hooks/useWeatherData.js` to fetch data.
2. **Translation**: Always use the `useLanguage` hook and the `t()` function for all text in the UI.
3. **Design**: Maintain the v3 Grayscale-First aesthetic defined in `src/styles/theme.js`.
