import React from 'react';
import { Helmet } from 'react-helmet';
import './App.scss';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import { homepage } from '../package.json';
import MediaManager from './components/MediaManager';
import { encodeKey } from './utils/path';
import client from './apollo';

const App = () => (
  <div className="container">
    <Helmet
      titleTemplate="%s · Admin · IWGB"
      defaultTitle="Media · Admin · IWGB"
    >
      {[32, 64, 96, 128].map((size) => (
        <link
          key={size}
          rel="icon"
          href={`https://cdn.iwgb.org.uk/assets/favicon-${size}.png`}
          sizes={`${size}x${size}`}
        />
      ))}
    </Helmet>
    <Router basename={homepage}>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <Switch>
            <Route path="/:path">
              <MediaManager />
            </Route>
            <Route path="/">
              <Redirect to={`/${encodeKey(process.env.REACT_APP_MEDIA_PUBLIC_ROOT)}`} />
            </Route>
          </Switch>
        </RecoilRoot>
      </ApolloProvider>
    </Router>

  </div>
);

export default App;
