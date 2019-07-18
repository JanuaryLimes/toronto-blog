import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import PrivateRoute from '../components/PrivateRoute';
import MainPage from './MainPage';
import LoginRegisterPage, { LogoutComponent } from './LoginRegisterPage';
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
            <div
              className="flex-1 py-4 m-auto w-full 
              sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex"
            >
              <div className="flex-1 p-4 rounded bg-gray-700 shadow-lg ">
                <Switch>
                  <Route exact path="/" component={MainPage} />
                  <Route path="/login" component={LoginRegisterPage} />
                  <Route path="/logout" component={LogoutComponent} />
                  <Route path="/register" component={LoginRegisterPage} />
                  <PrivateRoute path="/dashboard" component={DashboardPage} />
                  <Route path="/:blogName" component={BlogPage} />
                </Switch>
              </div>
            </div>
            <footer
              className="p-2 py-4 bg-gray-700 relative text-center"
              style={{ zIndex: '-1' }}
            >
              footer?
            </footer>
          </div>
        </div>
      </Router>
    );
  }

  return render();
};

export default RouterPage;
