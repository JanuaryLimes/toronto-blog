import { getLoggedUser } from '../selectors/auth.selector';
import { useSelector } from 'react-redux';

function useLoggedUser() {
  return useSelector(state => getLoggedUser(state));
}

export { useLoggedUser };
