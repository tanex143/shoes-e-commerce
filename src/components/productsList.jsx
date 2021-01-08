import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../contextProvider';
import Card from './card';

const ProductsList = () => {
  const { allProductsData, setProductDetailsDisplay } = useContext(
    ProductsContext
  );
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
            >
              <Card data={data} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
