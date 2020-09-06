import React from 'react';
import './App.scss';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import client from './helpers/apollo';
import SorterResultList from './components/SorterResultList';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="container">
    <ApolloProvider client={client}>
      <RecoilRoot>
        <SorterResultList />
      </RecoilRoot>
    </ApolloProvider>
    <ToastContainer position="bottom-left" />
  </div>
);

export default App;
