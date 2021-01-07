import { useContext } from 'react';
import { ProductsContext } from '../contextProvider';
import Product from './product';

const ProductsList = () => {
  const allData = useContext(ProductsContext);
  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-center font-semibold text-5xl py-5'>
          Products List
        </h1>

        <div className='sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex flex-wrap justify-center px-2'>
          {allData.map((data) => (
            <Product key={data.id} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
