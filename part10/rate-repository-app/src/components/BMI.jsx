/* eslint-disable no-unused-vars */
import React from 'react';
import {StyleSheet, Alert, View, Text, TextInput, TouchableWithoutFeedback, Platform} from 'react-native';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';

const initialValues = {
    mass: '',
    height: ''
};

const getBodyMassIndex = (mass, height) => {
    return Math.round(mass / Math.pow(height, 2));
};

const styles = StyleSheet.create({
    text: {
        color: Platform.OS === 'android' ? 'green' : 'blue'
    },
    // altText: Platform.select({
    //     android: 'darkgreen',
    //     ios: 'blue',
    //     default: 'black'
    // })
});

const BodyMassIndexForm = ({onSubmit}) => {
    return (
        <View>
            <FormikTextInput name='mass' />
            <FormikTextInput name='height' />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.text}>Calculate</Text>
            </TouchableWithoutFeedback>
            <Text>Your platform is: {Platform.OS}</Text>
        </View>
    );
};

const validationSchema = yup.object().shape({
    mass: yup
        .number()
        .min(1, 'Weight must be greater or equal to 1')
        .required('Weight is required'),
    height: yup
        .number()
        .min(0.5, 'Height must be greater than or equal to 0.5')
        .required('Height is required')

});

const BodyMassIndexCalculator = () => {
    const onSubmit = values => {
        const mass = parseFloat(values.mass);
        const height = parseFloat(values.height);

        if (!isNaN(mass) && !isNaN(height) && height !== 0) {
            Alert.alert(`Your body mass index is: ${getBodyMassIndex(mass, height)}`);
        }
    };

    return (
        <>
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <BodyMassIndexForm onSubmit={handleSubmit} /> }
        </Formik>
        
        </>
    );
};

export default BodyMassIndexCalculator;