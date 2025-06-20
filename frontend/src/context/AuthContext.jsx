import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/users/login`, { email, password });
      localStorage.setItem('userToken', res.data.token);
      localStorage.setItem('sessionId', res.data.sessionId);
      const userData = {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          subscriptionStatus: res.data.subscriptionStatus,
          token: res.data.token,
          sessionId: res.data.sessionId 
      };
      setUser(userData); 
      return true; 
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      return false; 
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/users/register`, { name, email, phone, password });
      
      return true;

    } catch (error) {
      console.error('Register failed:', error.response?.data?.message || error.message);
      return false; 
    }
  };

  
const logout = async () => {
  const token = localStorage.getItem('userToken');
  const sessionId = localStorage.getItem('sessionId');

  if (token && sessionId) {
    try {
      await axios.post(`${BACKEND_URL}/api/users/logout`, { sessionId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('DEBUG: Backend logout failed:', error.response?.data?.message || error.message);

    }
  } else {
      console.log('DEBUG: No token or sessionId found in localStorage, skipping backend logout request.');
  }

  localStorage.removeItem('userToken');
  localStorage.removeItem('sessionId');

  setUser(null); 

  console.log('DEBUG: Is Authenticated after logout (should be false):', !!localStorage.getItem('userToken') || !!user); 
};

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('userToken');
      const sessionId = localStorage.getItem('sessionId');
      
      if (token && sessionId) { 
        try {
          const decodedToken = jwtDecode(token); 

          if (decodedToken.exp * 1000 < Date.now()) {
            console.warn('User token expired, logging out.');
            logout(); 
          } else {
            setUser({
                _id: decodedToken.id,
                role: decodedToken.role,
                token: token, 
                sessionId: sessionId 
            });
          }
        } catch (error) {
          console.error('Error decoding token from localStorage, logging out:', error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, []); 

  const authContextValue = {
    user,
    loading,
    login,
    register, 
    logout, 
    isAuthenticated: !!user && !!user.token, 
    userToken: user?.token, 
    sessionId: user?.sessionId, 
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);