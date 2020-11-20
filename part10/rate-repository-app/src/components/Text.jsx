import React from 'react';
import {Text as NativeText, StyleSheet} from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontFamily: theme.fonts.platformSpecific,
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeight.normal,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary,
    },
    colorPrimary: {
        color: theme.colors.primary,
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    addPadding: {
        padding: theme.padding.small
    },
    fontWeightBold: {
        fontWeight: theme.fontWeight.bold,
    },
});

const Text = ({color, padding, fontSize, fontWeight, style, ...props}) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontWeight === 'bold' && styles.fontWeightBold,
        padding && styles.addPadding,
        style,
    ];

    return <NativeText style={textStyle} {...props} />;
};

export default Text;