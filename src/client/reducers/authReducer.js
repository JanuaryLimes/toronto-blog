import { createReducer } from 'redux-starter-kit';
import { login, logout } from '../actions';

export const authReducer = createReducer(
  {},
  {
    [login.type]: (state, action) => {
      return { ...state, loggedUser: action.payload.loggedUser };
    },
    [logout.type]: (state, _action) => {
      return { ...state, loggedUser: undefined };
    }
  }
);
