import { useContext } from 'react';
import { ProductsContext } from '../contextProvider';

const ProductsList = () => {
  const allData = useContext(ProductsContext);
  return (
    <>
      <h1>{(allData[0].inCart = true)} </h1>
      <h1>{console.log(allData)}</h1>
    </>
  );
};

export default ProductsList;
