import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { ProductsContext } from '../contextProvider';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';

const MyCartDetails = () => {
  const {
    myCart,
    thousandsSeparatorsHandler,
    incrementQuantityHandler,
    decrementQuantityHandler,
    removeItemHandler,
  } = useContext(ProductsContext);
  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-3xl text-center tracking-wider font-semibold py-1 my-5 uppercase bg-bluegray-300 rounded mx-auto'>
          My Cart
        </h1>
        {myCart.length < 1 ? (
          <div className='mx-auto text-center my-20'>
            <Empty
              className='py-14 uppercase tracking-wider'
              description='Your cart is empty'
            />
            <Link
              to='/'
              className='text-2xl uppercase py-2 px-8 text-white hover:text-white bg-lightblue-400 hover:bg-lightblue-500 rounded'
            >
              shop now
            </Link>
          </div>
        ) : (
          <div>
            <div className='grid grid-cols-6 text-center text-2xl font-semibold border-b-2'>
              <h1 className='pb-4'>Products</h1>
              <h1 className='pb-4'>Name of Products</h1>
              <h1 className='pb-4'>Price</h1>
              <h1 className='pb-4'>Quantity</h1>
              <h1 className='pb-4'>Remove</h1>
              <h1 className='pb-4'>Total</h1>
            </div>
            <div>
              {myCart.map((item) => (
                <div
                  key={item.id}
                  className='grid grid-cols-6 gap-5 text-center my-5 rounded bg-truegray-100'
                >
                  <div>
                    <div>
                      <img
                        src={item.img[0]}
                        alt='img'
                        className='w-11/12 mx-auto h-40 rounded'
                      />
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1 className='text-2xl'>{item.name}</h1>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1 className='text-2xl'>
                      ₱{thousandsSeparatorsHandler(item.price)}
                    </h1>
                  </div>
                  <div className='flex justify-center items-center gap-5'>
                    {item.count < 2 ? (
                      ''
                    ) : (
                      <div
                        onClick={() => decrementQuantityHandler(item.id)}
                        className='py-1 px-2 border hover:bg-bluegray-200 rounded cursor-pointer'
                      >
                        <FontAwesomeIcon icon={faMinus} className='' />
                      </div>
                    )}
                    <h1 className='text-2xl'>{item.count}</h1>
                    <div
                      onClick={() => incrementQuantityHandler(item.id)}
                      className='py-1 px-2 border hover:bg-bluegray-200 rounded cursor-pointer'
                    >
                      <FontAwesomeIcon icon={faPlus} className='' />
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className='text-2xl cursor-pointer text-red-500'
                      onClick={() => removeItemHandler(item.id)}
                    />
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1 className='text-2xl'>
                      ₱{thousandsSeparatorsHandler(item.total)}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {myCart.map((data) => console.log(data))}
    </>
  );
};

export default MyCartDetails;
