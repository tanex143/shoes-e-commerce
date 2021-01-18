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
  const { currentUser, logoutHandler, myCart } = useContext(loginContext);

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
      {currentUser[0].username && (
        <div className='py-3 bg-bluegray-200 shadow-md'>
          <div className='container mx-auto'>
            <div className='flex justify-between'>
              <div className='flex'>
                <img src={logo} alt='logo' className='mr-1 w-16' />
                <Link
                  to='/productlist'
                  className='text-2xl font-semibold tracking-wide logo-font hover:text-black'
                >
                  SHOES
                </Link>
              </div>
              <div className='flex'>
                <h1 className='mr-1 text-2xl font-semibold'>Welcome!</h1>
                <Dropdown overlay={menu}>
                  <span className='ant-dropdown-link text-2xl font-semibold cursor-pointer'>
                    {currentUser[0].username}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className='cursor-pointer text-sm ml-2'
                    />
                  </span>
                </Dropdown>
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
      )}
    </>
  );
};

export default Navbar;
