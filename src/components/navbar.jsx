import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className='py-3 bg-teal-300'>
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <div className='flex'>
            <img src='logo.png' alt='logo' className='mr-1 w-16' />
            <h1 className='text-2xl font-semibold tracking-wide logo-font'>
              SHOES
            </h1>
          </div>
          <div className='flex'>
            <h1 className='mr-1 text-2xl font-semibold'>Welcome!</h1>
            <h1 className='text-2xl font-semibold'>TaneX</h1>
            <div className='ml-10 px-2'>
              <FontAwesomeIcon
                icon={faShoppingCart}
                className='text-3xl cursor-pointer text-gray-700'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
