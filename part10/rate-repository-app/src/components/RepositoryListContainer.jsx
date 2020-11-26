import React from 'react'
import RepositoryItem from './RepositoryItem'
import { FlatList, View, StyleSheet } from 'react-native';

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: 'lightgray'
    },
  });
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      keyExtractor={repository => repository.fullName}
      // ...
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;