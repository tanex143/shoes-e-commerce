import { useContext } from 'react';
import { loginContext } from './../ContextLoginProvider';

const Footer = () => {
  const { currentUser } = useContext(loginContext);
  return (
    <>
      {currentUser[0].username && (
        <div className='py-3 bg-bluegray-200'>
          <div className='container mx-auto'>
            <h1 className='text-center text-xl font-semibold'>
              Alright Reserved. Nike Shoes &copy; January 2021
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
