import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Input, message } from 'antd';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import logo from '../img/logo.png';
import { loginContext } from './../ContextLoginProvider';

const Login = () => {
  const {
    loginView,
    signupView,
    loginViewHandler,
    signupInput,
    signupPassword,
    setSignupPassword,
    signupCPassword,
    setSignupCPassword,
    loginUsernameInput,
    loginPasswordInput,
    setLoginUsernameInput,
    signupHandler,
    loginHandler,
    signupOnChangeHandler,
    loginOnChangeHandler,
    users,
  } = useContext(loginContext);

  return (
    <div className='bg-bluegray-200 h-100vh'>
      {console.log('all users', users)}
      <div className='container mx-auto pt-24'>
        <div className='w-full '>
          <div className='flex justify-center mx-auto bg-white rounded-full w-64 shadow-lg'>
            <img src={logo} alt='img' className='w-64 h-64' />
          </div>
        </div>
        <div className='max-w-md mx-auto bg-white rounded shadow-lg py-5'>
          <div className='grid grid-cols-2'>
            <h1
              onClick={() => loginViewHandler('login')}
              className={`text-center border-r-2 uppercase tracking-wider cursor-pointer ${
                loginView ? 'text-lightblue-400 ' : ''
              } `}
            >
              login
            </h1>
            <h1
              onClick={() => loginViewHandler('signup')}
              className={`text-center uppercase tracking-wider cursor-pointer ${
                signupView ? 'text-lightblue-400 ' : ''
              }`}
            >
              signup
            </h1>
          </div>
          <div className='mx-8 py-5'>
            {loginView ? (
              <form onSubmit={loginHandler}>
                <Input
                  className='mb-5'
                  type='text'
                  size='large'
                  placeholder='Username'
                  value={loginUsernameInput}
                  onChange={(e) => setLoginUsernameInput(e.target.value)}
                  autoFocus
                  required
                  prefix={
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      className='text-coolgray-600'
                    />
                  }
                />
                <Input.Password
                  className='mb-5'
                  size='large'
                  placeholder='Password'
                  value={loginPasswordInput}
                  onChange={loginOnChangeHandler}
                  required
                  prefix={
                    <FontAwesomeIcon
                      icon={faLock}
                      className='text-coolgray-600'
                    />
                  }
                />
                <button
                  type='submit'
                  className='uppercase py-2 px-5 bg-lightblue-400 text-white hover:bg-lightblue-500 cursor-pointer rounded w-full focus:outline-none'
                >
                  login
                </button>
                <div className='flex justify-center gap-1'>
                  <p className='text-gray-500'>Not registered?</p>
                  <p
                    onClick={() => loginViewHandler('signup')}
                    className='text-lightblue-400 cursor-pointer'
                  >
                    Signup
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={signupHandler}>
                <Input
                  className='mb-5'
                  size='large'
                  type='text'
                  minLength='3'
                  maxLength='30'
                  placeholder='Username'
                  value={signupInput}
                  onChange={signupOnChangeHandler}
                  required
                  autoFocus
                  prefix={
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      className='text-coolgray-600'
                    />
                  }
                />
                <Input.Password
                  className='mb-5'
                  size='large'
                  placeholder='Password'
                  value={signupPassword}
                  minLength='3'
                  maxLength='30'
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  prefix={
                    <FontAwesomeIcon
                      icon={faLock}
                      className='text-coolgray-600'
                    />
                  }
                />
                {signupPassword !== signupCPassword &&
                signupCPassword.length > 0 ? (
                  <p className='text-sm text-red-500 uppercase'>
                    password did not match.
                  </p>
                ) : (
                  ''
                )}
                <Input.Password
                  className='mb-5'
                  size='large'
                  placeholder='Confirm Password'
                  value={signupCPassword}
                  minLength='3'
                  maxLength='30'
                  onChange={(e) => setSignupCPassword(e.target.value)}
                  required
                  prefix={
                    <FontAwesomeIcon
                      icon={faLock}
                      className='text-coolgray-600'
                    />
                  }
                />

                <button
                  type='submit'
                  onSubmit={() => message.success('Account has been created.')}
                  className={`uppercase py-2 px-5 text-white ${
                    signupInput === '' || signupPassword !== signupCPassword
                      ? 'cursor-not-allowed bg-lightblue-200'
                      : 'bg-lightblue-400 hover:bg-lightblue-500 cursor-pointer'
                  }  rounded w-full focus:outline-none`}
                  disabled={
                    signupInput === '' || signupPassword !== signupCPassword
                      ? true
                      : false
                  }
                >
                  signup
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
