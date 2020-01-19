import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { multiply } from '@toronto-blog/utils';

const App: React.FC = () => {
  useEffect(() => {
    fetch('/api/home')
      .then(res => res.json())
      .then(value => {
        console.log('from api: ', value);
      })
      .catch(error => {
        console.log('error', error);
      });

    console.log('multiply test: ', multiply(2, 6));

    return () => {
      //   cleanup
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
