import { useState, useEffect, createContext } from 'react';

const LoggedInContext = createContext({
  loggedIn: false,
  // username: '',
  email: '',
  logIn: () => {},
});

export function LoggedInContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if there's a token in localStorage
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      // You might want to validate the token or fetch user data from the server
      // For simplicity, let's assume the token is valid
      setIsLoggedIn(true);
    }
  }, []); // Run only on mount

  const logIn = (email) => {
    setIsLoggedIn(true);
    // setUsername(userData.username);
    setUserEmail(email);

    // Save token to localStorage (you might want to generate a secure token)
    localStorage.setItem('userToken', 'exampleToken');

    // Set an expiration time (24 hours in milliseconds)
    const expirationTime = 24 * 60 * 60 * 1000;
    const expirationDate = new Date().getTime() + expirationTime;
    localStorage.setItem('tokenExpiration', expirationDate.toString());
  };

  const logOut = () => {
    setIsLoggedIn(false);
    // setUsername('');
    setUserEmail('');

    // Clear localStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiration');
  };

  const context = {
    loggedIn: isLoggedIn,
    // username,
    email: userEmail,
    logIn: logIn,
    logOut: logOut,
  };

  return (
    <LoggedInContext.Provider value={context}>
      {props.children}
    </LoggedInContext.Provider>
  );
}

export default LoggedInContext;
