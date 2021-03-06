import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header';
import { MainPage } from './MainPage';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage';
import { RegisterPage } from './RegisterPage';
import { DashboardPage } from './DashboardPage';
import { BlogPageHandler } from './BlogPageHandler';
import { PrivateRoute } from '../components/PrivateRoute';

const headerHeight = '50px';

export const RouterPage = () => {
  function render() {
    return (
      <Router>
        <div
          className="h-full"
          style={{ display: 'grid', gridTemplateRows: '1fr auto' }}
        >
          <div className="z-10 fixed w-full" style={{ height: headerHeight }}>
            <Header />
          </div>
          <div
            style={{ marginTop: headerHeight }}
            className="flex-1 py-4 mx-auto w-full 
            sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
          >
            <div
              className="mx-2 p-4 rounded shadow-lg "
              style={{
                background: 'rgb(21, 21, 21)'
              }}
            >
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LogoutPage} />
                <Route path="/register" component={RegisterPage} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <Route
                  path="/blog/:blogName/:blogPostId?"
                  component={BlogPageHandler}
                />
              </Switch>
            </div>
          </div>
          <footer
            className="p-2 py-4 bg-gray-700 relative text-center"
            style={{ zIndex: -1, background: 'rgb(21, 21, 21)' }}
          >
            footer...
          </footer>
        </div>
      </Router>
    );
  }

  return render();
};
