import React from 'react';
import { configureAppStore } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import LoginRegisterPage from './pages/LoginRegisterPage';

const App = _props => {
  return (
    <Provider store={configureAppStore()}>
      <Router>
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginRegisterPage} />
        <Route path="/register" component={LoginRegisterPage} />
      </Router>
    </Provider>
  );
};

export default App;
