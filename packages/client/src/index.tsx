import './style/style.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureAppStore } from './store';
import { Provider } from 'react-redux';
const persistStore = require('redux-phoenix');

const store = configureAppStore();

persistStore.default(store).then((persistedStore: any) => {
  render(
    <Provider store={persistedStore}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
