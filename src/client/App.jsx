import React, { useEffect } from 'react';
import { configureAppStore } from './store';
import { Provider } from 'react-redux';
import { useCookies } from 'react-cookie';
import { login } from './actions';
import RouterPage from './pages/RouterPage';

const store = configureAppStore();

const App = _props => {
  const cookies = useCookies();

  useEffect(() => {
    const user = cookies[0].u;
    if (store) {
      store.dispatch(login({ loggedUser: user }));
    }
  }, [cookies]);

  return (
    <Provider store={store}>
      <RouterPage />
    </Provider>
  );
};

export default App;
