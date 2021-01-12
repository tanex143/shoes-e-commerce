import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { ProductsContext } from '../contextProvider';

const MyCartDetails = () => {
  const { myCart, thousands_separators } = useContext(ProductsContext);
  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-3xl text-center tracking-wider font-semibold py-1 my-5 uppercase bg-bluegray-300 rounded mx-auto'>
          My Cart
        </h1>
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
                  ₱{thousands_separators(item.price)}
                </h1>
              </div>
              <div className='flex justify-center items-center'>
                <h1 className='text-2xl'>{item.count}</h1>
              </div>
              <div className='flex justify-center items-center'>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className='text-2xl cursor-pointer text-red-500'
                />
              </div>
              <div className='flex justify-center items-center'>
                <h1 className='text-2xl'>
                  ₱{thousands_separators(item.total)}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {myCart.map((data) => console.log(data))}
    </>
  );
};

export default MyCartDetails;
