import {gql} from 'apollo-boost';

export const SIGN_IN = gql`
  mutation authorize($username: String!, $password: String!){
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;