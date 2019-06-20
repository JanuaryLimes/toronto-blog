import React, { useEffect } from 'react';
import { configureAppStore } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import LoginRegisterPage from './pages/LoginRegisterPage';
import DashboardPage from './pages/DashboardPage';
import { useCookies } from 'react-cookie';
import PrivateRoute from './components/PrivateRoute';
import { login } from './actions';

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
      <Router>
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginRegisterPage} />
        <Route path="/logout" component={LoginRegisterPage} />
        <Route path="/register" component={LoginRegisterPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
      </Router>
    </Provider>
  );
};

export default App;
