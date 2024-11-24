import { createContext, useState } from 'react';

type Auth = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const defaultAuth: Auth = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
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
