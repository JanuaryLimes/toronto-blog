import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style/style.scss';
import axios from 'axios';

class App extends Component {
  render() {
    console.log('fetch');
    axios
      .get('/api/allblogs')
      .then(function(response) {
        console.log('success');
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        console.log('error');
        // handle error
        console.log(error);
      })
      .then(function() {
        console.log('always');
        // always executed
      });

    return (
      <div>
        <div>Create New Blog</div>
        <div>Login</div>
        <div>Search existing blogs</div>
      </div>
    );
  }
}

export default App;
