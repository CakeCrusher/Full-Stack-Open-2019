import {useContext} from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import {useApolloClient} from '@apollo/client';

const useSignOut = () => {
    console.log('sign out clicked');
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const executeSignOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };

    return [executeSignOut];
};

export default useSignOut;