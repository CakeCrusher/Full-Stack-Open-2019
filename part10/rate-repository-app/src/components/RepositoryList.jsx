import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';
import {useQuery} from '@apollo/react-hooks';
import {GET_REPOSITORIES} from '../graphql/queries';


const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgray'
  },
});

const RepositoryList = () => {
  const repositories = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'});

  if (!repositories.loading) {
    const ItemSeparator = () => <View style={styles.separator} />;
  
    // Get the nodes from the edges array
    const repositoryNodes = repositories.data.repositories && !repositories.loading
      ? repositories.data.repositories.edges.map(edge => edge.node)
      : [];
  
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItem}
        keyExtractor={repository => repository.fullName}
        // other props
      />
    );
  } else {
    return (<View><Text>Loading...</Text></View>);
  }

};

export default RepositoryList;