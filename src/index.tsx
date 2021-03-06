import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './global-styles.css';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Router basename="/">
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('app-root'),
);
