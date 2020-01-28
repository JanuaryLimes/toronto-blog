import { getLoggedUser } from '../selectors/getLoggedUser';
import { useSelector } from 'react-redux';

function useLoggedUser(): string | undefined {
  return useSelector(getLoggedUser);
}

export { useLoggedUser };
