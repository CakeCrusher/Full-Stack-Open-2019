import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import {Formik} from 'formik';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import {useHistory} from 'react-router-native';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
    username: '',
    password: ''
};

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    input: {
        padding: 10,
        borderWidth: 1,
        width: '90%',
        borderStyle: 'solid',
        marginBottom: 10,
        borderRadius: 5
    },
    submitBtn: {
        borderRadius: 5,
        width: '90%',
        textAlign: 'center',
        padding: 10,
        backgroundColor: theme.colors.primary,
        color: 'white'
    }
});

const SignInForm = ({onSubmit}) => {
    return (
        <View style={styles.formContainer}>
            <FormikTextInput testIDProp='username' style={styles.input} name='username' />
            <FormikTextInput testIDProp='password' style={styles.input} name='password' secureTextEntry />
            <TouchableWithoutFeedback testID='submitButton' onPress={onSubmit}>
                <Text style={styles.submitBtn} fontSize='subheader' fontWeight='bold'>Sign in</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required')
});

const SignIn = () => {
    let history = useHistory();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        // Alert.alert(`|${values.username}|${values.password}| entered`);
        const {username, password} = values;

        try {
            await signIn({username, password});
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export const TestSignIn = ({onSubmit}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;