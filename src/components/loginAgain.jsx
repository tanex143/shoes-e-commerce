import { Link } from 'react-router-dom';

const LoginAgain = () => {
  return (
    <div className='bg-bluegray-200 h-100vh relative'>
      <div className='pt-32'>
        <div className='max-w-sm mx-auto py-10 px-8 bg-gray-100 rounded shadow-lg mt-32'>
          <h1 className='text-2xl font-semibold tracking-wide text-center'>
            Please Login First
          </h1>
          <div className='w-full text-center mt-8'>
            <Link
              to='/'
              className='bg-lightblue-400 w-full mx-auto px-6 py-2 text-lg uppercase rounded shadow-lg text-white hover:text-white hover:bg-lightblue-500 cursor-pointer'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAgain;
