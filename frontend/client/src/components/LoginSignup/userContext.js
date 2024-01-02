import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);
  const setUser = (user) => {
    setUsername(user);
    localStorage.setItem('username', user); 
  };
  const logout = () => {
    setUsername('');
    localStorage.removeItem('username'); 
  };

  return (
    <UserContext.Provider value={{ username, setUser, logout  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
