import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/rootReducer';
import { autoRehydrate } from 'redux-phoenix';
import { createStore, compose, applyMiddleware } from 'redux';

export const configureAppStore = () => {
  const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...getDefaultMiddleware()), autoRehydrate)
  );

  if (process.env.NODE_ENV !== 'production') {
    /*const unsubscribe =*/ store.subscribe(() =>
      console.log(store.getState())
    );
  }

  console.log('configure store');

  return store;
};
