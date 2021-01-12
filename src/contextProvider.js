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

  const incrementQuantityHandler = (id) => {
    let tempCart = [...myCart];
    let index = tempCart.findIndex((f) => f.id === id);

    let product = tempCart[index];
    product.count += 1;
    product.total = product.price * product.count;

    setMyCart(tempCart);
  };
  const decrementQuantityHandler = (id) => {
    let tempCart = [...myCart];
    let index = tempCart.findIndex((f) => f.id === id);

    let product = tempCart[index];
    product.count -= 1;
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
        incrementQuantityHandler,
        decrementQuantityHandler,
        removeItemHandler,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
