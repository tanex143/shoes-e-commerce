import { useContext } from 'react';
import { ProductsContext } from '../contextProvider';

const ProductDetails = () => {
  const { productDetailsDisplay } = useContext(ProductsContext);

  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-center text-3xl font-semibold py-8'>
          Product Details
        </h1>
        <div className='grid grid-cols-2'>
          <div className='grid grid-cols-2'>
            <img src={`${productDetailsDisplay.img[0]}`} alt='img' />
            {/* {productDetailsDisplay.img.map((i, index) => (
              <div key={index}>
                <img src={`${i}`} alt='img' className='w-full' />
                {console.log(i)}
              </div>
            ))} */}
          </div>
          <div>
            <h1 className='text-2xl'>{productDetailsDisplay.title}</h1>
            <p className='text-xl'>{productDetailsDisplay.brand}</p>
            <p>{productDetailsDisplay.description}</p>
          </div>
        </div>
      </div>
      {console.log(productDetailsDisplay)}
    </>
  );
};

export default ProductDetails;
