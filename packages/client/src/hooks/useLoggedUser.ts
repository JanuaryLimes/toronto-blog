import { getLoggedUser } from '../selectors/getLoggedUser';
import { useSelector } from './useSelector';

function useLoggedUser(): string | undefined {
  return useSelector(getLoggedUser);
}

export { useLoggedUser };
