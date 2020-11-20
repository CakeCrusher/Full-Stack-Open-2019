import React from 'react';
import {View,Image,StyleSheet} from 'react-native';
import theme from '../theme';
import Text from './Text'

const RepositoryItem = ({item}) => {
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

    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <Image style={styles.headerImage} source={{uri: item.ownerAvatarUrl}} />
                <View style={styles.headerText}>
                    <Text style={styles.textIns} fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
                    <Text style={styles.textIns} color='textSecondary'>{item.description}</Text>
                    <View style={styles.headerTextCont}>
                        <Text padding='small' fontSize='subheading' style={styles.headerLanguage}>{item.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footerContaier}>
                <View style={styles.footerItem}>
                    <Text fontSize='subheading' fontWeight='bold'>{reduceToK(item.stargazersCount)}</Text>
                    <Text color='textSecondary'>Stars</Text>
                </View>
                <View style={styles.footerItem}>
                    <Text fontSize='subheading' fontWeight='bold'>{reduceToK(item.forksCount)}</Text>
                    <Text color='textSecondary'>Forks</Text>
                </View>
                <View style={styles.footerItem}>
                    <Text fontSize='subheading' fontWeight='bold'>{reduceToK(item.reviewCount)}</Text>
                    <Text color='textSecondary'>Reviews</Text>
                </View>
                <View style={styles.footerItem}>
                    <Text fontSize='subheading' fontWeight='bold'>{reduceToK(item.ratingAverage)}</Text>
                    <Text color='textSecondary'>Rating</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;