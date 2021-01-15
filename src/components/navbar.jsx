import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductsContext } from '../contextProvider';
import { loginContext } from './../ContextLoginProvider';
import { Badge } from 'antd';
import logo from '../img/logo.png';

const Navbar = () => {
  const { myCart } = useContext(ProductsContext);
  const { currentUser } = useContext(loginContext);

  return (
    <div className='py-3 bg-bluegray-200 shadow-md'>
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <div className='flex'>
            <img src={logo} alt='logo' className='mr-1 w-16' />
            <Link
              to='/'
              className='text-2xl font-semibold tracking-wide logo-font hover:text-black'
            >
              SHOES
            </Link>
          </div>
          <div className='flex'>
            <h1 className='mr-1 text-2xl font-semibold'>Welcome!</h1>
            <h1 className='text-2xl font-semibold'>
              {currentUser[0].username}
            </h1>
            <Link to='/mycart' className='ml-10 px-2 '>
              <Badge count={myCart.length} overflowCount={10}>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className='text-3xl cursor-pointer text-gray-700 hover:text-black'
                />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
