import { useContext } from 'react';
import { ProductsContext } from '../contextProvider';

const MyCartDetails = () => {
  const { myCart } = useContext(ProductsContext);
  return (
    <>
      <h1 className='text-3xl text-center'>My Cart: {myCart.length}</h1>
      {myCart.map((data) => console.log(data))}
    </>
  );
};

export default MyCartDetails;
