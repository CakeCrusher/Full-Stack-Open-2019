import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Alert} from 'react-native';
import Text from '../Text'
import theme from '../../theme'
import {openBrowserAsync} from 'expo-web-browser'
import {DELETE_REVIEW} from '../../graphql/mutations'
import {useMutation} from '@apollo/react-hooks'

const Review = ({review, user, refetch}) => {
    const [deleteReview] = useMutation(DELETE_REVIEW)

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginBottom: 10,
            marginTop: 10
        },
        rating: {
            width: 45,
            height: 45,
            margin: 10,
            borderColor: theme.colors.primary,
            borderWidth: 2,
            borderRadius: 22.5,
            textAlignVertical: 'center',
            textAlign: 'center'
        },
        secondaryInfo: {
            width: 330
        },
        reviewText: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        buttonPrimary: {
            color: 'white',
            width: '45%',
            padding: 10,
            textAlign: 'center',
            backgroundColor: theme.colors.primary,
            borderRadius: 5,
            margin: 10
        },
        buttonDanger: {
            color: 'white',
            width: '45%',
            padding: 10,
            textAlign: 'center',
            backgroundColor: '#ff726f',
            borderRadius: 5,
            margin: 10
        }
        
    })

    const title = user ? review.repository.fullName : review.user.username

    const AuthorizedButtons = () => {
        if (!user) return null
        const onViewRepository = () => {
            openBrowserAsync(review.repository.url)
        }

        const onDeleteReview = () => {
            const executeDeletion = async () => {
                console.log('trying to refetch');
                try{
                    await deleteReview({
                        variables: {
                            id: review.id
                        }
                    })
                    refetch()
                } catch (e) {
                    throw Error(e)
                }
            }

            Alert.alert(
                'Delete review',
                'Are you sure?',
                [
                    {
                        text: 'cancel',
                        onPress: () => null
                    },
                    {
                        text: 'delete',
                        onPress: () => executeDeletion(),
                    }
                ]
            )
        }

        return (
            <View style={styles.buttonsContainer}>
                <TouchableWithoutFeedback onPress={onViewRepository}>
                    <Text style={styles.buttonPrimary} >View repository</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={onDeleteReview}>
                    <Text style={styles.buttonDanger} >Delete review</Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.rating} color='primary' fontSize='subheading' fontWeight='bold'>{review.rating}</Text>
                </View>
                <View style={styles.secondaryInfo}>
                    <Text fontSize='subheading' fontWeight='bold'>{title}</Text>
                    <Text color='textSecondary'>{review.createdAt}</Text>
                    <Text style={styles.reviewText}>{review.text}</Text>
                </View>
            </View>
            <AuthorizedButtons />
        </View>
    )
}

export default Review