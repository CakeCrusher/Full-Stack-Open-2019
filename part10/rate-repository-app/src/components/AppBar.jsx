import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import {Link} from 'react-router-native';
import {SIGNED_IN} from '../graphql/queries';
import {useQuery} from '@apollo/react-hooks';

import AuthStorageContext from '../contexts/AuthStorageContext';
import {useApolloClient} from '@apollo/client';
import SignUp from './SignUp'
// import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.dark,
        flexDirection: 'row'
    },
    headerItem: {
        color: 'white',
    },
    tabGroup: {
        flexDirection: 'row'
    }
});

const SignedInState = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const executeSignOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };

    const auth = useQuery(SIGNED_IN);

    // const [signOut] = useSignOut();

    if (!auth.loading) {
        return auth.data.authorizedUser ? 
        (   
            <View style={styles.tabGroup}>
                <Link to='/myreviews'>
                    <Text fontSize='subheading' padding='small' style={styles.headerItem}>My reviews</Text>
                </Link>
                <TouchableWithoutFeedback onPress={executeSignOut}>
                    <Text fontSize='subheading' padding='small' style={styles.headerItem}>Sign out</Text>
                </TouchableWithoutFeedback>
            </View>
        )
        :
        (
            <View style={styles.tabGroup}>
                <Link to='/signin'>
                    <Text fontSize='subheading' padding='small' style={styles.headerItem}>Sign In</Text>
                </Link>
                <Link to='/signUp'>
                    <Text fontSize='subheading' padding='small' style={styles.headerItem}>Sign up</Text>
                </Link>
            </View>
        );
    } else {
        return(
            <Text fontSize='subheading' padding='small' style={styles.headerItem}>_______</Text>
        );
    }

};

const AppBar = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <ScrollView horizontal>
                    <Link to='/'>
                        <Text fontSize='subheading' padding='small' style={styles.headerItem}>Repositories</Text>
                    </Link>
                    <Link to='/createreview'>
                        <Text fontSize='subheading' padding='small' style={styles.headerItem}>Create a review</Text>
                    </Link>
                    <SignedInState />
                    <Link to='/bmi'>
                        <Text fontSize='subheading' padding='small' style={styles.headerItem}>BMI</Text>
                    </Link>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBar;