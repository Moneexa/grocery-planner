import { createContext, useState } from 'react';

const defaultAuth = {
  isLoggedIn: false,
  setIsLoggedIn: (_payload: boolean) => {},
};

export const AuthContext = createContext(defaultAuth);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('auth') !== null,
  );
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
