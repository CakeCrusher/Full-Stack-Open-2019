import React from 'react';

const AuthStorageContext = React.createContext();

export default AuthStorageContext;

// import React from 'react';

// const AuthStateContext = React.createContext();
// const AuthDispatchContext = React.createContext();

// function authReducer(_state, action) {
//     switch (action.type) {
//         case 'setAuthAccessToken': {
//             return {accessToken: action.payload};
//         }
//         case 'removeAuthAccessToken': {
//             return {accessToken: null};
//         }
//         default: {
//             throw new Error(`unhandled action type: ${action.type}`);
//         }
//     }
// }

// function AuthProvider({children}) {
//     const [state, dispatch] = React.useReducer(authReducer, {accessToken: null});
//     return (
//         <AuthStateContext.provider value={state}>
//             <AuthDispatchContext.Provider value={dispatch}>
//                 {children}
//             </AuthDispatchContext.Provider>
//         </AuthStateContext.provider>
//     );
// }

// function useAuthState() {
//     const context = React.useContext(AuthStateContext);
//     if (context === undefined) {
//         throw new Error('useAuthState must be used within a AuthProvider');
//     }
//     return context;
// }

// function useAuthDispatch() {
//     const context = React.useContext(AuthDispatchContext);
//     if (context === undefined) {
//         throw new Error('useAuthDispatch must be used within a AuthProvider');
//     }
//     return context;
// }

// export {AuthProvider, useAuthDispatch, useAuthState};