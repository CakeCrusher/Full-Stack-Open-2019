import React from 'react';
import {View,StyleSheet} from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import BodyMassIndexCalculator from './BMI';
import {Route, Switch, Redirect} from 'react-router-native';

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
                <Route path='/signin'>
                    <SignIn />
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