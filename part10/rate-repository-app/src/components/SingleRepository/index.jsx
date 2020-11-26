import React from 'react';
import {View,Image,StyleSheet, TouchableWithoutFeedback, FlatList} from 'react-native';
import theme from '../../theme';
import Text from '../Text'
import {useQuery} from '@apollo/react-hooks'
import {GET_REPOSITORY} from '../../graphql/queries'
import {useParams} from 'react-router-native'
import {openURL} from 'expo-linking'
import {openBrowserAsync} from 'expo-web-browser'
import Header from './Header'
import Review from './Review'

const SingleRepository = () => {
    let {id} = useParams()
    let item

    const res = useQuery(GET_REPOSITORY, {variables: {id}, fetchPolicy: 'cache-and-network'})

    const styles = StyleSheet.create({
        separator: {
            height: 10,
            backgroundColor: 'lightgray'
        },
    })
    
    if (res.loading || !res.data) {
        return <View><Text>Loading...</Text></View>
    } else {
        item = res.data.repository
    }

    const reviews = item.reviews.edges.length ? 
        item.reviews.edges.map(edge => edge.node) : []

    const ItemSeparator = () => <View style={styles.separator} />;

    const handleFetchMore = () => {
        const canFetchMore = !res.loading && res.data && res.data.repository.reviews.pageInfo.hasNextPage

        if (!canFetchMore) return null

        res.fetchMore({
            query: GET_REPOSITORY,
            variables: {
                id,
                after: res.data.repository.reviews.pageInfo.endCursor
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges,
                            ]
                        }
                    }
                }
                return nextResult
            }
        })
    }

    const endReach = () => {
        handleFetchMore()
    }

    return (
        <FlatList
            data={reviews}
            renderItem={({item}) => <Review review={item}/>}
            keyExtractor={({id}) => id}
            ListHeaderComponent={() => <Header item={item} />}
            ItemSeparatorComponent={() => ItemSeparator()}
            onEndReachedThreshold={0.1}
            onEndReached={endReach}
        />
    )
};

export default SingleRepository;