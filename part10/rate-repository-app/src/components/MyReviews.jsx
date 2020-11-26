import React from 'react'
import Review from './SingleRepository/Review'
import {FlatList, StyleSheet, View} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {SIGNED_IN} from '../graphql/queries'
import Text from './Text'

const MyReviews = () => {
    const reviewsQuery = useQuery(SIGNED_IN, {variables: {includeReviews: true}, fetchPolicy: 'cache-and-network'})
    if(reviewsQuery.loading) return <View><Text>Loading...</Text></View>

    const reviews = reviewsQuery.data.authorizedUser.reviews.edges.map(edge => edge.node)

    const styles = StyleSheet.create({
        separator: {
            height: 10,
            backgroundColor: 'lightgray'
        },
    })
    const ItemSeparator = () => <View style={styles.separator} />;

    return (
        <FlatList
            data={reviews}
            renderItem={({item}) => <Review review={item} user refetch={reviewsQuery.refetch} />}
            keyExtractor={({id}) => id}
            ItemSeparatorComponent={() => ItemSeparator()}
        />
    )
}

export default MyReviews