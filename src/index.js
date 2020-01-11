import './client/style/style.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './client/App';
import * as serviceWorker from './serviceWorker';
import persistStore from 'redux-phoenix';
import { configureAppStore } from './client/store';
import { Provider } from 'react-redux';

const store = configureAppStore();

persistStore(store).then(persistedStore => {
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
