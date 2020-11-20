import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        dark: '#24292e'
    },
    fontSizes: {
        body: 14,
        subheading: 16
    },
    padding: {
        small: 5,
        medium: 10,
        big: 20
    },
    fonts: {
        regular: 'System',
        platformSpecific: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        })
    },
    fontWeight: {
        normal: '400',
        bold: '700'
    }
};

export default theme;