import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { rootReducer } from './reducers/rootReducer';
import { useCookies } from 'react-cookie';

const getPreloadedState = () => {
  const cookies = useCookies();
  const cookie = cookies[0].u;
  if (cookie) {
    return { auth: { loggedUser: cookie } };
  } else {
    return {};
  }
};

export const configureAppStore = () => {
  const preloadedState = getPreloadedState();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState
  });

  if (process.env.NODE_ENV !== 'production') {
    /*const unsubscribe =*/ store.subscribe(() =>
      console.log(store.getState())
    );
  }

  return store;
};
