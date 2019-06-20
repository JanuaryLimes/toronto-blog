import { createReducer } from 'redux-starter-kit';
import { login, logout } from '../actions';

const login_type = login.type;
const logout_type = logout.type;

export const authReducer = createReducer(
  {},
  {
    [login_type]: (state, action) => {
      console.log('p: ', { ...state });
      console.log('pp: ', { ...state, loggedUser: action.payload.loggedUser });

      state.loggedUser = action.payload.loggedUser;

      //return { ...state, loggedUser: action.payload.loggedUser };
    },
    [logout_type]: (state, _action) => {
      return { ...state, loggedUser: undefined };
    }
  }
);
