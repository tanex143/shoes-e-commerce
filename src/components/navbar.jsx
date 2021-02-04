import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from './../ContextLoginProvider';
import { Badge, Menu, Dropdown } from 'antd';
import logo from '../img/logo.png';

const Navbar = () => {
  const { currentUser, logoutHandler } = useContext(loginContext);

  const menu = (
    <Menu>
      <Menu.Item>
        <p className='text-sm uppercase px-2' onClick={logoutHandler}>
          Log out
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* if user still not logged in then the login button will appear */}
      {currentUser[0].username && (
        <div className='sm:py-3 pb-1 pt-3 bg-bluegray-200 shadow-md px-4'>
          <div className='container mx-auto'>
            <div className='flex justify-between'>
              <div className='flex'>
                <Link to='/productlist' className='hover:text-black'>
                  <img src={logo} alt='logo' className='mr-1 w-16' />
                </Link>
                <Link
                  to='/productlist'
                  className='hidden sm:block text-2xl font-semibold tracking-wide logo-font hover:text-black'
                >
                  SHOES
                </Link>
              </div>
              <div className='flex'>
                <h1 className='mr-1 sm:text-2xl text-lg font-semibold'>
                  Welcome!
                </h1>
                <Dropdown overlay={menu}>
                  <span className='ant-dropdown-link sm:text-2xl text-lg font-semibold cursor-pointer'>
                    {currentUser[0].username}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className='cursor-pointer text-sm ml-2'
                    />
                  </span>
                </Dropdown>
                <Link to='/mycart' className='ml-10 px-2 '>
                  <Badge count={currentUser[0].cart.length} overflowCount={10}>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className='sm:text-3xl text-2xl cursor-pointer text-gray-700 hover:text-black'
                    />
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
