import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../contextProvider';
import Card from './card';
import { loginContext } from './../ContextLoginProvider';

const ProductsList = () => {
  const {
    allProductsData,
    setProductDetailsDisplay,
    thousandsSeparatorsHandler,
  } = useContext(ProductsContext);

  const { currentUser } = useContext(loginContext);

  return (
    <>
      {currentUser[0].username ? (
        <div className='container mx-auto py-8'>
          <h1 className='text-center font-semibold text-5xl py-5'>
            Products List
          </h1>

          <div className='sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex flex-wrap justify-center px-2'>
            {allProductsData.map((data) => (
              <Link
                key={data.id}
                to={`/productdetails/${data.name}`}
                onClick={() => setProductDetailsDisplay(data)}
                className='hover:text-black'
              >
                <Card
                  data={data}
                  thousandsSeparatorsHandler={thousandsSeparatorsHandler}
                />
              </Link>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default ProductsList;
