import React from 'react';
import { configureAppStore } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';

const App = _props => {
  return (
    <Provider store={configureAppStore()}>
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route path="/register" component={RegisterPage} />
      </Router>
    </Provider>
  );
};

export default App;
