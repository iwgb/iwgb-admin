import ApolloClient from 'apollo-boost';
import { InMemoryCache } from '@apollo/client';
import { API_BASE_URL, REQUEST_CONFIG } from '../constants/api.constants';

const apollo = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  ...REQUEST_CONFIG,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          sorterResults: {
            keyFields: ['identifier'],
            merge: (existing = [], incoming) => incoming.map((item) => ({
              ...existing.find(({ identifier }) => identifier === item.identifier),
              ...item,
            })),
          },
        },
      },
    },
  }),
});

export default apollo;
