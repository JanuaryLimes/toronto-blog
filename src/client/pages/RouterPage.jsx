import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import PrivateRoute from '../components/PrivateRoute';
import MainPage from './MainPage';
import LoginRegisterPage, { LogoutComponent } from './LoginRegisterPage';
import DashboardPage from './DashboardPage';
import { BlogPageHandler } from './BlogPageHandler';
import { StickyContainer, Sticky } from 'react-sticky';

const RouterPage = () => {
  function render() {
    return (
      <Router>
        <StickyContainer className="min-h-full flex flex-col">
          <Sticky>
            {({ style }) => (
              <div style={{ ...style, width: '100%' }} className="z-10">
                <Header />
              </div>
            )}
          </Sticky>

          <div
            className="flex-1 py-4 m-auto w-full 
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
                <Route path="/login" component={LoginRegisterPage} />
                <Route path="/logout" component={LogoutComponent} />
                <Route path="/register" component={LoginRegisterPage} />
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
            style={{ zIndex: '-1', background: 'rgb(21, 21, 21)' }}
          >
            footer...
          </footer>
        </StickyContainer>
      </Router>
    );
  }

  return render();
};

export default RouterPage;
