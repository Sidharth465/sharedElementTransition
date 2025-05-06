import React, {createContext, ReactNode, useContext, useState} from 'react';

// 1. Define the type for context value
type AuthContextType = {
  session: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

// 2. Create the context with default value as null or AuthContextType
const AuthContext = createContext<AuthContextType | null>(null);

// 3. Define props for the provider
type AuthProviderProps = {
  children: ReactNode;
};

// 4. AuthProvider component
const AuthProvider = ({children}: AuthProviderProps) => {
  const [session, setSession] = useState<boolean>(false);

  const login = async () => {
    setSession(true);
  };

  const logout = async () => {
    setSession(false);
  };

  return (
    <AuthContext.Provider value={{session, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
