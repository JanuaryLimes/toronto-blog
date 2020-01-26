import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { login } from './actions';
import RouterPage from './pages/RouterPage';
import { useDispatch } from 'react-redux';

const App = (_props: any) => {
  const cookies = useCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = cookies[0].u;
    dispatch(login({ loggedUser: user }));
  }, [cookies, dispatch]);

  return <RouterPage />;
};

export default App;
