import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet, Inp } from 'react-native'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import {Formik} from 'formik'
import * as yup from 'yup'
import theme from '../theme'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_REVIEW} from '../graphql/mutations'
import { validateSDL } from 'graphql/validation/validate'
import {useHistory} from 'react-router-native'

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    reviewText: ''
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

const CreateReviewForm = ({onSubmit}) => {
    return (
        <View style={styles.formContainer}>
            <FormikTextInput style={styles.input} name='ownerName' placeholder='Owner name' />
            <FormikTextInput style={styles.input} name='repositoryName' placeholder='Repository name' />
            <FormikTextInput style={styles.input} name='rating' placeholder='Rating between 0 to 100' />
            <FormikTextInput style={styles.input} name='reviewText' placeholder='Review' />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.submitBtn}>Create a review</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number('Rating must be a number')
        .required('Rating is required')
        .min(0)
        .max(100),
    reviewText: yup
        .string()
})

const CreateReview = () => {
    const history = useHistory()
    const [createReview] = useMutation(CREATE_REVIEW)
    const onSubmit = async (values) => {
        console.log('submitting review');
        const res = await createReview({
            variables: {
                repositoryName: values.repositoryName,
                ownerName: values.ownerName,
                rating: Number(values.rating),
                text: values.reviewText
            }
        })
        if (true) {
            history.push(`/repository/${values.ownerName}.${values.repositoryName}`)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <CreateReviewForm onSubmit={handleSubmit}/>}
        </Formik>
    )
    
}

export default CreateReview