import React from 'react';
import { configureAppStore } from './store';
import { Provider } from 'react-redux';
import Main from './components/Main';

const App = _props => {
  return (
    <Provider store={configureAppStore()}>
      <Main />
    </Provider>
  );
};

export default App;
