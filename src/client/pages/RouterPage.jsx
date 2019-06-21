import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import PrivateRoute from '../components/PrivateRoute';
import MainPage from './MainPage';
import LoginRegisterPage from './LoginRegisterPage';
import DashboardPage from './DashboardPage';
import BlogPage from './BlogPage';

const RouterPage = () => {
  function render() {
    return (
      <Router>
        <div className="flex flex-col h-full">
          <div>
            <Header />
          </div>
          <div className="flex-1 overflow-auto flex flex-col">
            <div className="flex-1">
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/login" component={LoginRegisterPage} />
                <Route path="/logout" component={LoginRegisterPage} />
                <Route path="/register" component={LoginRegisterPage} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <Route path="/:blogName" component={BlogPage} />
              </Switch>
            </div>
            <footer>footer?</footer>
          </div>
        </div>
      </Router>
    );
  }

  return render();
};

export default RouterPage;
