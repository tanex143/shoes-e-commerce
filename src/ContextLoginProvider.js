import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

export const loginContext = createContext();

export const ContextLoginProvider = ({ children }) => {
  const [loginView, setLoginView] = useState(true);
  const [signupView, setSignupView] = useState(false);

  const [signupInput, setSignupInput] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupCPassword, setSignupCPassword] = useState('');

  const [loginUsernameInput, setLoginUsernameInput] = useState('');
  const [loginPasswordInput, setLoginPasswordInput] = useState('');

  const [validUser, setValidUser] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  const [users, setUsers] = useState([
    { username: 'tanex@yahoo.com', password: '123' },
  ]);

  const loginViewHandler = (choices) => {
    if (choices === 'login') {
      setLoginView(true);
      setSignupView(false);
    }
    if (choices === 'signup') {
      setLoginView(false);
      setSignupView(true);
    }
  };

  const signupOnChangeHandler = (e) => {
    e.preventDefault();

    setSignupInput(e.target.value);

    const tempUsers = [...users];

    const filtered = tempUsers.filter(
      (user) => user.username === e.target.value.split('@')[0]
    );

    if (filtered.length === 1) {
      console.log('in list', filtered, tempUsers);
      setValidUser(false);
    } else {
      console.log('not in list', filtered, tempUsers);
      setValidUser(true);
    }
  };

  const signupHandler = (e) => {
    e.preventDefault();

    const tempUsers = [...users];

    let statusMessage = '';

    if (!validUser) {
      setSignupInput('');
      setSignupPassword('');
      setSignupCPassword('');
      statusMessage = message.error('Account already exist. Please try again.');
      console.log('in list');
      console.log(tempUsers);
    } else {
      setUsers([
        ...tempUsers,
        { username: signupInput.split('@')[0], password: signupCPassword },
      ]);
      setSignupInput('');
      setSignupPassword('');
      setSignupCPassword('');

      setLoginView(true);
      setSignupView(false);
      statusMessage = message.success('Account successfully created.');
      console.log('not in list');
      console.log(tempUsers);
    }
  };

  const loginOnChangeHandler = (e) => {
    e.preventDefault();

    setLoginUsernameInput(e.target.value);

    const tempUsers = [...users];

    const filtered = tempUsers.filter(
      (user) => user.username === e.target.value.split('@')[0]
    );

    if (filtered.length === 1) {
      console.log('in list', filtered, tempUsers);
      setRegisteredUser(false);
    } else {
      console.log('not in list', filtered, tempUsers);
      setRegisteredUser(true);
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    let statusMessage = '';
    if (!registeredUser) {
      setCurrentUser([
        {
          username: loginUsernameInput.split('@')[0],
          password: loginPasswordInput,
        },
      ]);
      console.log('login');
      statusMessage = message.success('Login Successfully');
      setLoginUsernameInput('');
      setLoginPasswordInput('');
      history.push('/');
    } else {
      console.log('error login');
      statusMessage = message.error('Username or Password is incorrect!');
      setLoginUsernameInput('');
      setLoginPasswordInput('');
      return history.push('/login');
    }
    console.log(currentUser);
    return statusMessage;
  };

  return (
    <loginContext.Provider
      value={{
        loginView,
        signupView,
        currentUser,
        loginViewHandler,
        signupInput,
        signupPassword,
        setSignupPassword,
        signupCPassword,
        setSignupCPassword,
        loginUsernameInput,
        loginPasswordInput,
        setLoginPasswordInput,
        signupHandler,
        loginHandler,
        signupOnChangeHandler,
        loginOnChangeHandler,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};
