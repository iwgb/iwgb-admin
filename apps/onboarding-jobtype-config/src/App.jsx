import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { Helmet } from 'react-helmet';
import client from './helpers/apollo';
import SorterResultList from './components/SorterResultList/SorterResultList';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const App = () => (
  <div className="container">
    <Helmet>
      <title>Applicant sorter config · Admin · IWGB</title>
      {[32, 64, 96, 128].map((size) => (
        <link
          rel="icon"
          href={`https://cdn.iwgb.org.uk/assets/favicon-${size}.png`}
          sizes={`${size}x${size}`}
        />
      ))}
    </Helmet>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <SorterResultList />
      </RecoilRoot>
    </ApolloProvider>
    <ToastContainer position="bottom-left" />
  </div>
);

export default App;
