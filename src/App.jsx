import React from 'react';
import './App.scss';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import { API_BASE_URL } from './constants/api.constants';
import SorterResultList from './components/SorterResultList/SorterResultList';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
  cache: new InMemoryCache({
    typePolicies: {
      SorterResult: {
        keyFields: ['identifier'],
      },
    },
  }),
});

const App = () => (
  <div className="container">
    <ApolloProvider client={client}>
      <SorterResultList />
    </ApolloProvider>
    <ToastContainer position="bottom-left" />
  </div>
);

export default App;
