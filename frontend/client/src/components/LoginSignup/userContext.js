import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [area, setArea] = useState('');
  const [userData, setData] = useState('');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    const storedArea = localStorage.getItem('userArea');
    const storedUserData = localStorage.getItem('userData');
    if (storedUser) {
      setUsername(storedUser);
      setArea(storedArea);
      setData(JSON.parse(storedUserData));
    }
  }, []);
  const setUser = (user) => {
    setUsername(user);
    localStorage.setItem('username', user); 
  };
  const setUserArea = (area) => {
    setArea(area);
    localStorage.setItem('userArea', area); 
  };
  const setUserData = (data) => {
    setData(data);
    localStorage.setItem('userData', data); 
  };
  const logout = () => {
    setUsername('');
    localStorage.removeItem('username'); 
  };

  return (
    <UserContext.Provider value={{ username, area, setUser, setUserArea, logout, userData, setUserData  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
