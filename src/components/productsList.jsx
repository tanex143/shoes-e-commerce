import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from './card';
import { loginContext } from './../ContextLoginProvider';
import LoginAgain from './loginAgain';

const ProductsList = () => {
  const {
    allProductsData,
    setProductDetailsDisplay,
    thousandsSeparatorsHandler,
    currentUser,
  } = useContext(loginContext);

  return (
    <>
      {console.log(currentUser)}
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
        <LoginAgain />
      )}
    </>
  );
};

export default ProductsList;
