import {gql} from 'apollo-boost';

// export const GET_REPOSITORIES = gql`
// query {
//     repositories {
//         ${}
//     }
// }
// `

export const GET_REPOSITORIES = gql`
  query{
    repositories{
      edges{
        node{
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const SIGNED_IN = gql`
  query{
    authorizedUser {
      id
      username
    }
  }
`;