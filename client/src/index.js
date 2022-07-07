import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import reportWebVitals from './reportWebVitals';

import './sass/index.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Layout />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
