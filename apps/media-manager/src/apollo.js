import { RestLink } from 'apollo-link-rest';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { REQUEST_CONFIG } from './constants/api';

const link = new RestLink({
  uri: `${process.env.REACT_APP_OBJECTS_API_BASE_URL}/`,
  credentials: 'include',
  ...REQUEST_CONFIG,
});

const apollo = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apollo;
