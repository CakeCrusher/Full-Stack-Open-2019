import {useMutation} from '@apollo/react-hooks';
import {SIGN_IN} from '../graphql/mutations';
import {useContext} from 'react';
// import {useAuthDispatch, useAuthState} from '../contexts/AuthStorageContext';
import AuthStorageContext from '../contexts/AuthStorageContext';
import {useApolloClient} from '@apollo/client';

const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = useContext(AuthStorageContext);
    const [signIn] = useMutation(SIGN_IN);

    const executeSignIn = async ({username, password}) => {
        const result = await signIn({variables: {username, password}});
        if (result.data) {
            await authStorage.setAccessToken(result.data.authorize.accessToken);
            apolloClient.resetStore();
        }
        return result;

    };
    
    return [executeSignIn];
};

export default useSignIn;