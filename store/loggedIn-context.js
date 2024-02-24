import { useState, createContext } from 'react';

const LoggedInContext = createContext({
  loggedIn: false,
  // username: '',
  email: '',
  logIn: () => {},
});

export function LoggedInContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const setLogIn = (email) => {
    setIsLoggedIn(true);
    // setUsername(userData.username);
    setEmail(email);
  };

  const context = {
    loggedIn: isLoggedIn,
    // username,
    email,
    logIn: setLogIn,
  };

  return (
    <LoggedInContext.Provider value={context}>
      {props.children}
    </LoggedInContext.Provider>
  );
}

export default LoggedInContext;
