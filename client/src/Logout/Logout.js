import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context';

export const Logout = () => {
  const {setToken} = useContext(AuthContext);
  useEffect(() => {
    setToken(null);
  }, [setToken]);
  localStorage.clear();
  return <Navigate to="/login" replace />;
};