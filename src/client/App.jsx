import React from 'react';
import { configureAppStore } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import LoginRegisterPage from './pages/LoginRegisterPage';
import DashboardPage from './pages/DashboardPage';
import { useCookies } from 'react-cookie';

const App = _props => {
  const cookies = useCookies();

  return (
    <Provider store={configureAppStore(cookies)}>
      <Router>
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginRegisterPage} />
        <Route path="/logout" component={LoginRegisterPage} />
        <Route path="/register" component={LoginRegisterPage} />
        <Route path="/dashboard" component={DashboardPage} />
      </Router>
    </Provider>
  );
};

export default App;
