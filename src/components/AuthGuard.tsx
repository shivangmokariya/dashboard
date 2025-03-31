import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from '../axios/axios';
import toast from 'react-hot-toast';

const AuthGuard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const rawToken = localStorage.getItem('token');
  const token = rawToken ? rawToken.replace(/^"(.*)"$/, '$1') : null;

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
      }

      try {
        const response = await axios.post('/validate-auth', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error:any) {
        console.error('Token validation error:', error);
        toast.error(error.response.data.message)
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);


  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }
  console.log(isAuthenticated,"<<<<<<<isAuthenticated");

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default AuthGuard;