import React from 'react';
import {View,Image,StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import theme from '../theme';
import Text from './Text'
import {useQuery} from '@apollo/react-hooks'
import {GET_REPOSITORY} from '../graphql/queries'
import {useHistory, Link} from 'react-router-native'

const RepositoryItem = (props) => {
    let history = props.history
    let item = props.item

    const styles = StyleSheet.create({
        rootContainer: {
            display: 'flex'
        },
        headerContainer: {
            flexDirection: 'row',
            marginBottom: 10
        },
        headerImage: {
            width: 50,
            height: 50,
            margin: theme.padding.medium,
            borderRadius: 5
        },
        headerText: {
            width: 300,
            alignSelf: 'flex-start',
        },
        textIns: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        headerTextCont: {
            alignSelf: 'flex-start'
        },
        headerLanguage: {
            color: 'white',
            backgroundColor: theme.colors.primary,
            borderRadius: 5
        },
        footerContaier: {
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        footerItem: {
            alignItems: 'center'
        }
    });

    const reduceToK = (num) => {
        if (num > 999) {
            const thousandsNum = Math.round(num / 1000);
            const remainerNum = Math.round((num % 1000) / 100);
            return `${thousandsNum}.${remainerNum}k`;
        } else return num;
    };

    const onPress = () => {
        console.log('heading to: ', `/repository/${item.id}`);
        history.push(`/repository/${item.id}`)
    }

    return (
        <TouchableOpacity onPress={onPress} >
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <Image style={styles.headerImage} source={{uri: item.ownerAvatarUrl}} />
                <View style={styles.headerText}>
                    <Text testID='fullNameText' style={styles.textIns} fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
                    <Text testID='descriptionText' style={styles.textIns} color='textSecondary'>{item.description}</Text>
                    <View style={styles.headerTextCont}>
                        <Text testID='languageText' padding='small' fontSize='subheading' style={styles.headerLanguage}>{item.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footerContaier}>
                <View style={styles.footerItem}>
                    <Text testID='stargazersCountModdedText' fontSize='subheading' fontWeight='bold'>{reduceToK(item.stargazersCount)}</Text>
                    <Text color='textSecondary'>Stars</Text>
                </View>
                <View style={styles.footerItem}>
                    <Text testID='forksCountModdedText' fontSize='subheading' fontWeight='bold'>{reduceToK(item.forksCount)}</Text>
                    <Text color='textSecondary'>Forks</Text>
                </View>
                <View style={styles.footerItem}>
                    <Text testID='reviewCountModdedText' fontSize='subheading' fontWeight='bold'>{reduceToK(item.reviewCount)}</Text>
                    <Text color='textSecondary'>Reviews</Text>
                </View>
                <View style={styles.footerItem}>
                    <Text testID='ratingAverageModdedText' fontSize='subheading' fontWeight='bold'>{reduceToK(item.ratingAverage)}</Text>
                    <Text color='textSecondary'>Rating</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    );
};

export default RepositoryItem;