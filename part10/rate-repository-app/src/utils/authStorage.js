import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const rawAT = await AsyncStorage.getItem('accessToken');
        return rawAT ? rawAT : null;
    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem('accessToken');
    }
}

export default AuthStorage;