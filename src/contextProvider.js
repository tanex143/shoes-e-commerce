import { createContext, useState } from 'react';
import { productsData } from './productsData';

export const ProductsContext = createContext();

export const ContextProvider = ({ children }) => {
  const [allProductsData, setAllProductsData] = useState(productsData);
  const [productDetailsDisplay, setProductDetailsDisplay] = useState([]);
  const [myCart, setMyCart] = useState([]);

  const thousands_separators = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const addToCart = (id) => {
    let tempProducts = [...allProductsData];
    let index = tempProducts.findIndex((f) => f.id === id);
    let product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setAllProductsData(tempProducts);
    setMyCart([...myCart, product]);
  };

  return (
    <ProductsContext.Provider
      value={{
        allProductsData,
        setAllProductsData,
        setProductDetailsDisplay,
        productDetailsDisplay,
        thousands_separators,
        myCart,
        setMyCart,
        addToCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
