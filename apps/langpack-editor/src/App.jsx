import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { RecoilRoot } from 'recoil';
import LangpackEditor from './components/LangpackEditor';

const App = () => (
  <div className="container">
    <Helmet>
      <title>Langpack editor · Admin · IWGB</title>
      {[32, 64, 96, 128].map((size) => (
        <link
          key={size}
          rel="icon"
          href={`https://cdn.iwgb.org.uk/assets/favicon-${size}.png`}
          sizes={`${size}x${size}`}
        />
      ))}
    </Helmet>
    <RecoilRoot>
      <LangpackEditor />
    </RecoilRoot>
    <ToastContainer position="bottom-left" />
  </div>
);

export default App;
