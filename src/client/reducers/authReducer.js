import { createReducer } from 'redux-starter-kit';
import { login } from '../actions';

export const authReducer = createReducer(
  {},
  {
    [login.type]: (state, action) => {
      return { ...state, loggedUser: action.payload.loggedUser };
    }
  }
);
