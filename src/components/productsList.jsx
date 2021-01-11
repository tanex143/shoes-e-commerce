import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../contextProvider';
import Card from './card';

const ProductsList = () => {
  const {
    allProductsData,
    setProductDetailsDisplay,
    thousands_separators,
  } = useContext(ProductsContext);
  return (
    <>
      <div className='container mx-auto py-8'>
        <h1 className='text-center font-semibold text-5xl py-5'>
          Products List
        </h1>

        <div className='sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex flex-wrap justify-center px-2'>
          {allProductsData.map((data) => (
            <Link
              key={data.id}
              to={`/productdetails/${data.title}`}
              onClick={() => setProductDetailsDisplay(data)}
              className='hover:text-black'
            >
              <Card data={data} thousands_separators={thousands_separators} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
