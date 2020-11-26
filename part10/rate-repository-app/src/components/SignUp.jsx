import React from 'react'
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import FormikTextInput from './FormikTextInput'
import {Formik} from 'formik'
import * as yup from 'yup'
import Text from './Text'
import theme from '../theme'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_USER} from '../graphql/mutations'
import useSignIn from '../hooks/useSignIn'
import {useHistory} from 'react-router-native'

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
}

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
})

const SignUpForm = ({onSubmit}) => {
    return (
        <View style={styles.formContainer}>
            <FormikTextInput placeholder='Username' style={styles.input} name='username' />
            <FormikTextInput secureTextEntry placeholder='Password' style={styles.input} name='password' />
            <FormikTextInput secureTextEntry placeholder='Password confirmation' style={styles.input} name='passwordConfirm' />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.submitBtn} fontSize='subheader' fontWeight='bold'>Sign up</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(1)
        .max(30),
    password: yup
        .string()
        .required('Password is required')
        .min(5)
        .max(50),
    passwordConfirm: yup
        .string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password')], 'Password confirmation must be the same as Password')
        .min(5)
        .max(50),
})

const SignUp = () => {
    const history = useHistory()
    const [createUser] = useMutation(CREATE_USER)
    const [signIn] = useSignIn()
    const onSubmit = async (values) => {
        const {username, password} = values
        try {
            await createUser({variables: {
                username,
                password
            }})
            await signIn({username, password})
            history.push('/')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default SignUp