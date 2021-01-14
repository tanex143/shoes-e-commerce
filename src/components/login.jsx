import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProductsContext } from '../contextProvider';

const Login = () => {
  const { loginView, signupView, loginViewHandler } = useContext(
    ProductsContext
  );
  return (
    <div className='bg-bluegray-200 h-100vh'>
      <div className='container mx-auto pt-48'>
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
              <form onSubmit={(e) => e.preventDefault()}>
                <Input
                  className='mb-5'
                  size='large'
                  placeholder='Username'
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
                  <p className='text-lightblue-400 cursor-pointer'>Signup</p>
                </div>
              </form>
            ) : (
              <form>
                <Input
                  className='mb-5'
                  size='large'
                  placeholder='Username'
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
                  prefix={
                    <FontAwesomeIcon
                      icon={faLock}
                      className='text-coolgray-600'
                    />
                  }
                />
                <Input.Password
                  className='mb-5'
                  size='large'
                  placeholder='Confirm Password'
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
