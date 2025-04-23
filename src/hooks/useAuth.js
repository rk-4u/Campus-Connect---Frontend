// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';  // Correct path to AuthContext

export const useAuth = () => {
  return useContext(AuthContext);
};
