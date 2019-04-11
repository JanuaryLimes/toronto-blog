import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <button className="btn btn-primary">Log in</button>

      <Link to="/register">
        <button className="btn btn-info">Register</button>
      </Link>
    </div>
  );
};

export default withRouter(Register);
