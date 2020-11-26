import {gql} from 'apollo-boost';

// export const GET_REPOSITORIES = gql`
// query {
//     repositories {
//         ${}
//     }
// }
// `

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy!,
    $orderDirection: OrderDirection!,
    $keyword: String!,
    $after: String
  ){
    repositories(
      first: 8,
      after: $after,
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $keyword,
    ){
      edges{
        node{
          id
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
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
    }
  }
`;

export const SIGNED_IN = gql`
  query authorizedUser($includeReviews: Boolean = false){
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews){
        edges{
          node{
            id
            text
            rating
            repository{
              ownerName
              fullName
              url
            }
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo{
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!, $after: String){
    repository(id: $id) {
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews(first: 4, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`