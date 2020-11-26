import React, {useState} from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';
import {useQuery} from '@apollo/react-hooks';
import {GET_REPOSITORIES} from '../graphql/queries';
import {useHistory} from 'react-router-native'
import RNPickerSelect from 'react-native-picker-select'
import {Searchbar} from 'react-native-paper'



const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgray'
  },
  filterContainer: {
    backgroundColor: 'lightgray',
    padding: 5
  },
  searchbarContainer: {
    backgroundColor: 'lightgray',
    padding: 5,
  }
});

const RepositoryList = () => {
  let history = useHistory()
  const [order, setOrder] = useState('latest')
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')
  const [keyword, setKeyword] = useState('')

  const Dropdown = ({handleChange, order}) => {
    return (
      <View style={styles.filterContainer}>
        <RNPickerSelect 
          onValueChange={(value) => handleChange(value)}
          value={order}
          items={[
            {label: 'Latest repositories', value: 'latest'},
            {label: 'Highest rated repositories', value: 'highestRated'},
            {label: 'Lowest rated repositories', value: 'lowestRated'},
          ]}
        />
      </View>
    )
  }

  let variables = {
    orderBy,
    orderDirection,
    keyword
  }

  let repositories = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network', variables: {
    ...variables
  }});
  let repositoriesComponent
  if (repositories.data && repositories.data.repositories) {
    const ItemSeparator = () => <View style={styles.separator} />;
  
    // Get the nodes from the edges array
    const repositoryNodes = repositories.data.repositories && !repositories.loading
      ? repositories.data.repositories.edges.map(edge => edge.node)
      : [];
  
    const handleChange = (value) => {
      setOrder(value)
      if (value === 'latest') {
        setOrderBy('CREATED_AT')
        setOrderDirection('DESC')
      }
      if (value === 'highestRated') {
        setOrderBy('RATING_AVERAGE')
        setOrderDirection('DESC')
      }
      if (value === 'lowestRated') {
        setOrderBy('RATING_AVERAGE')
        setOrderDirection('ASC')
      }
    }

    const handleFetchMore = () => {
      const canFetchMore = !repositories.loading && repositories.data && repositories.data.repositories.pageInfo.hasNextPage
      if (!canFetchMore) {
        return null
      }

      repositories.fetchMore({
        query: GET_REPOSITORIES,
        variables: {
          after: repositories.data.repositories.pageInfo.endCursor,
          ...variables
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          const nextResult = {
            repositories: {
              ...fetchMoreResult.repositories,
              edges: [
                ...previousResult.repositories.edges,
                ...fetchMoreResult.repositories.edges
              ],
            },
          };
          return nextResult
        },
      });
    };

    const onEndReach = () => {
      handleFetchMore()
    }

    repositoriesComponent = (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item} history={history}/>}
        keyExtractor={repository => repository.fullName}
        ListHeaderComponent={() => <Dropdown handleChange={handleChange} order={order}/>}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.1}
      />
    );
  } else {
    repositoriesComponent = (<View><Text>Loading...</Text></View>);
  }

  const onKeywordChange = (query) => setKeyword(query)

  return (
    <>
      <View style={styles.searchbarContainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={onKeywordChange}
        value={keyword}
      />
      </View>
      {repositoriesComponent}
    </>
  )

};

export default RepositoryList;