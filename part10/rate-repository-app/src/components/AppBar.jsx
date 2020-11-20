import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import {Link} from 'react-router-native';
import {SIGNED_IN} from '../graphql/queries';
import {useQuery} from '@apollo/react-hooks';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.dark,
        flexDirection: 'row'
    },
    headerItem: {
        color: 'white',
    }
});

const SignedInState = () => {
    const auth = useQuery(SIGNED_IN);

    const [signOut] = useSignOut();

    if (!auth.loading) {
        return auth.data.authorizedUser ? 
        (
            <TouchableWithoutFeedback onPress={signOut}>
                <Text fontSize='subheading' padding='small' style={styles.headerItem}>Sign Out</Text>
            </TouchableWithoutFeedback>
        )
        :
        (
            <Link to='/signin'>
                <Text fontSize='subheading' padding='small' style={styles.headerItem}>Sign In</Text>
            </Link>
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