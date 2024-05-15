import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({ user_Name: null, first_Name: null });

  const setUserInfo = (user_Name, first_Name) => {
    console.log("jugar", user_Name, first_Name);  
    setUserData({ user_Name, first_Name });
  };

  return (
    <UserContext.Provider value={{ userData, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
