import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { rootReducer } from './reducers/rootReducer';

export const configureAppStore = cookies => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()]
  });

  if (process.env.NODE_ENV !== 'production') {
    /*const unsubscribe =*/ store.subscribe(() =>
      console.log(store.getState())
    );
  }

  console.log('configure store');

  return store;
};
