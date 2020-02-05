import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions';
import { useSuccessErrorAlert } from '../../components/Alert';
import { usePost } from '../useAxios';

export function useLogoutPageState() {
  const history = useHistory();
  const dispatch = useDispatch();
  const dispatchLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const [hasError, setHasError] = useState(false);
  const { showErrorAlert, renderAlertsContainer } = useSuccessErrorAlert();
  const [logoutArgs] = useState({
    path: '/api/auth/logout',
    body: {},
    onSuccess: () => {
      dispatchLogout();
      setTimeout(() => {
        history.push('/');
      }, 1000);
    },
    onError: () => {
      setTimeout(() => {
        setHasError(true);
        showErrorAlert('Error logging out, try refreshing the page');
      }, 500);
    }
  });

  usePost(logoutArgs);

  return {
    hasError,
    renderAlertsContainer
  };
}
