import React from 'react';
import { configureAppStore } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';

const App = _props => {
  return (
    <Provider store={configureAppStore()}>
      <Router>
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Router>
    </Provider>
  );
};

export default App;
