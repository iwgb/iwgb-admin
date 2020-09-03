import React from 'react';
import './App.scss';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import client from './helpers/apollo';
import SorterResultList from './components/SorterResultList/SorterResultList';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="container">
    <ApolloProvider client={client}>
      <SorterResultList />
    </ApolloProvider>
    <ToastContainer position="bottom-left" />
  </div>
);

export default App;
