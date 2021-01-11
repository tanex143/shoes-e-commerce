import { createContext, useState } from 'react';
import { productsData } from './productsData';

export const ProductsContext = createContext();

export const ContextProvider = ({ children }) => {
  const [allProductsData, setAllProductsData] = useState(productsData);
  const [productDetailsDisplay, setProductDetailsDisplay] = useState([]);

  const thousands_separators = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <ProductsContext.Provider
      value={{
        allProductsData,
        setAllProductsData,
        setProductDetailsDisplay,
        productDetailsDisplay,
        thousands_separators,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
