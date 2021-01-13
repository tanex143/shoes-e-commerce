import { createContext, useState } from 'react';
import { productsData } from './productsData';

export const ProductsContext = createContext();

export const ContextProvider = ({ children }) => {
  const [allProductsData, setAllProductsData] = useState(productsData);
  const [productDetailsDisplay, setProductDetailsDisplay] = useState([]);
  const [myCart, setMyCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const thousandsSeparatorsHandler = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const addToCartHandler = (id) => {
    let tempProducts = [...allProductsData];
    let index = tempProducts.findIndex((f) => f.id === id);
    let product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    setAllProductsData(tempProducts);
    setMyCart([...myCart, product]);
    setIsModalVisible(true);
  };

  const quantityHandler = (id, quantity) => {
    let tempCart = [...myCart];
    let index = tempCart.findIndex((f) => f.id === id);
    let product = tempCart[index];

    if (quantity) {
      product.count += 1;
    } else {
      product.count -= 1;
    }

    product.total = product.price * product.count;
    setMyCart(tempCart);
  };

  const removeItemHandler = (id) => {
    let tempProducts = [...allProductsData];
    let tempCart = [...myCart];
    const filtered = tempCart.filter((f) => f.id !== id);

    let index = tempProducts.findIndex((f) => f.id === id);
    let product = tempProducts[index];
    product.inCart = false;
    product.count = 0;
    product.total = 0;

    setMyCart(filtered);
    setAllProductsData(tempProducts);
  };

  const modalCancelHandler = () => {
    setIsModalVisible(false);
  };

  const clearCartHandler = () => {
    let tempCart = [...myCart];

    tempCart.map((item) => {
      item.inCart = false;
      item.count = 0;
      item.total = 0;

      return setMyCart([]);
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        allProductsData,
        setAllProductsData,
        setProductDetailsDisplay,
        productDetailsDisplay,
        thousandsSeparatorsHandler,
        myCart,
        setMyCart,
        addToCartHandler,
        isModalVisible,
        modalCancelHandler,
        quantityHandler,
        removeItemHandler,
        clearCartHandler,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
