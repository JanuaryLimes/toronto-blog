import { getLoggedUser } from '../selectors/auth.selector';
import { useSelector } from 'react-redux';

export const LoggedUser = () => {
  const loggedUser = useSelector(state => getLoggedUser(state));
  return loggedUser;
};
