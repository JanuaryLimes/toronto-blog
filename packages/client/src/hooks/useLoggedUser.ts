import { getLoggedUser } from '../selectors/auth.selector';
import { useSelector } from 'react-redux';

function useLoggedUser(): string | undefined {
  return useSelector(state => getLoggedUser(state));
}

export { useLoggedUser };
