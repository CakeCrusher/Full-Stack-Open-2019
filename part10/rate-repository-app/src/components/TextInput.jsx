import React from 'react';
// eslint-disable-next-line no-unused-vars
import {TextInput as NativeTextInput, StyleSheet} from 'react-native';

// const styles = StyleSheet.create({});

// eslint-disable-next-line no-unused-vars
const TextInput = ({style, error, ...props}) => {
    const textInputStyle = [style, error ? {borderColor: 'darkred'} : {borderColor: 'lightgrey'}];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;