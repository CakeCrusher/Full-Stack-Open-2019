import React from 'react';
import {View,StyleSheet} from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import SignIn from './SignIn';
import AppBar from './AppBar';
import BodyMassIndexCalculator from './BMI';
import {Route, Switch, Redirect} from 'react-router-native';
import CreateReview from './CreateReview'
import SignUp from './SignUp'
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path='/' exact >
                    <RepositoryList />
                </Route>
                <Route path='/createreview'>
                    <CreateReview />
                </Route>
                <Route path='/repository/:id'>
                    <SingleRepository />
                </Route>
                <Route path='/signin'>
                    <SignIn />
                </Route>
                <Route path='/myreviews'>
                    <MyReviews />
                </Route>
                <Route path='/signup'>
                    <SignUp />
                </Route>
                <Route path='/bmi'>
                    <BodyMassIndexCalculator />
                </Route>
                <Redirect to='/' />
            </Switch>
        </View>
    );
};

export default Main;