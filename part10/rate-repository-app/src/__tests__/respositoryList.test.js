import React from 'react'
import {RepositoryListContainer} from '../components/RepositoryListContainer'
import {render} from '@testing-library/react-native'

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          pageInfo: {
            totalCount: 8,
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
        
        const reduceToK = (num) => {
            if (num > 999) {
                const thousandsNum = Math.round(num / 1000);
                const remainerNum = Math.round((num % 1000) / 100);
                return `${thousandsNum}.${remainerNum}k`;
            } else return num;
        };

        const {_debug, getAllByTestId} = render(<RepositoryListContainer repositories={repositories} />);

        expect(getAllByTestId('fullNameText')[1]).toHaveTextContent(repositories.edges[1].node.fullName)
        expect(getAllByTestId('descriptionText')[1]).toHaveTextContent(repositories.edges[1].node.description)
        expect(getAllByTestId('languageText')[1]).toHaveTextContent(repositories.edges[1].node.language)
        expect(getAllByTestId('stargazersCountModdedText')[1]).toHaveTextContent(reduceToK(repositories.edges[1].node.stargazersCount))
        expect(getAllByTestId('forksCountModdedText')[1]).toHaveTextContent(reduceToK(repositories.edges[1].node.forksCount))
        expect(getAllByTestId('reviewCountModdedText')[1]).toHaveTextContent(reduceToK(repositories.edges[1].node.reviewCount))
        expect(getAllByTestId('ratingAverageModdedText')[1]).toHaveTextContent(reduceToK(repositories.edges[1].node.ratingAverage))
      });
    });
  });