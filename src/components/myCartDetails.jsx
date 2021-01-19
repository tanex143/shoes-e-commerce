import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { loginContext } from './../ContextLoginProvider';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import LoginAgain from './loginAgain';
import PayPalButton from './payPalButton';

const MyCartDetails = () => {
  const {
    thousandsSeparatorsHandler,
    quantityHandler,
    removeItemHandler,
    clearCartHandler,
    currentUser,
    totalValue,
    totalValueHandler,
  } = useContext(loginContext);
  return (
    <>
      {console.log('current user', currentUser)}
      {currentUser[0].username ? (
        <div className='container mx-auto px-4'>
          <h1 className='text-3xl text-center tracking-wider font-semibold py-1 my-5 uppercase bg-bluegray-300 rounded mx-auto'>
            My Cart
          </h1>
          {currentUser[0].cart.length < 1 ? (
            <div className='mx-auto text-center my-20'>
              <Empty
                className='py-14 uppercase tracking-wider'
                description='Your cart is empty'
              />
              <Link
                to='/productlist'
                className='text-2xl uppercase py-2 px-8 text-white hover:text-white bg-lightblue-400 hover:bg-lightblue-500 rounded'
              >
                shop now
              </Link>
            </div>
          ) : (
            <div>
              <div className='hidden lg:grid lg:grid-cols-7 lg:text-center lg:text-2xl lg:font-semibold lg:border-b-2'>
                <h1 className='pb-4'>Products</h1>
                <h1 className='pb-4'>Name</h1>
                <h1 className='pb-4'>Size</h1>
                <h1 className='pb-4'>Price</h1>
                <h1 className='pb-4'>Quantity</h1>
                <h1 className='pb-4'>Remove</h1>
                <h1 className='pb-4'>Sub-Total</h1>
              </div>
              <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {currentUser[0].cart.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col w-52 lg:grid lg:grid-cols-7 lg:gap-5 lg:text-center lg:my-5 rounded bg-truegray-100'
                  >
                    <div>
                      <img
                        src={item.img[0]}
                        alt='img'
                        className='w-9/12 lg:w-11/12 mx-auto h-40 rounded'
                      />
                    </div>
                    <div className='flex justify-start lg:justify-center items-center'>
                      <h1 className='text-2xl'>{item.name}</h1>
                    </div>
                    <div className='flex justify-start lg:justify-center items-center uppercase'>
                      <h1 className='text-2xl'>{item.sizes[0].size}</h1>
                    </div>
                    <div className='flex justify-start lg:justify-center items-center'>
                      <h1 className='text-2xl'>
                        ${thousandsSeparatorsHandler(item.price)}
                      </h1>
                    </div>
                    <div className='flex justify-center lg:justify-center items-center gap-5'>
                      {item.count < 2 ? (
                        ''
                      ) : (
                        <div
                          onClick={() => quantityHandler(item.id, 0)}
                          className='py-1 px-2 border hover:bg-bluegray-200 rounded cursor-pointer'
                        >
                          <FontAwesomeIcon icon={faMinus} className='' />
                        </div>
                      )}
                      <h1 className='text-2xl'>{item.count}</h1>
                      <div
                        onClick={() => quantityHandler(item.id, 1)}
                        className='py-1 px-2 border hover:bg-bluegray-200 rounded cursor-pointer'
                      >
                        <FontAwesomeIcon icon={faPlus} className='' />
                      </div>
                    </div>
                    <div className='flex justify-start lg:justify-center items-center'>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className='text-2xl cursor-pointer text-red-400 hover:text-red-600'
                        onClick={() => removeItemHandler(item.id)}
                      />
                    </div>
                    <div className='flex justify-end lg:justify-center items-center'>
                      <h1 className='text-2xl'>
                        <span className='lg:hidden mr-1'>Subtotal:</span> $
                        {thousandsSeparatorsHandler(item.total)}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-center gap-5'>
                <Link
                  to='/productlist'
                  className='uppercase tracking-wide py-2 px-5 bg-lightblue-400 text-white hover:bg-lightblue-500 hover:text-white rounded right-0'
                >
                  shop again
                </Link>
                <button
                  onClick={clearCartHandler}
                  className='uppercase tracking-wide py-2 px-5 bg-red-500 text-white hover:bg-red-600 rounded right-0'
                >
                  clear cart
                </button>
              </div>
              <div className='flex justify-end gap-5 my-5'>
                <h1 className='text-2xl font-semibold'>Total:</h1>
                <p className='text-3xl font-semibold'>
                  {totalValueHandler(currentUser[0])}$
                  {thousandsSeparatorsHandler(totalValue)}
                </p>
              </div>
              <div className='pb-10 flex justify-end'>
                <PayPalButton className='py-2' />
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoginAgain />
      )}
    </>
  );
};

export default MyCartDetails;
