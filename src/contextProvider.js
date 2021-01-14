import { createContext, useState } from 'react';
import { productsData } from './productsData';

export const ProductsContext = createContext();

export const ContextProvider = ({ children }) => {
  const [allProductsData, setAllProductsData] = useState(productsData);
  const [productDetailsDisplay, setProductDetailsDisplay] = useState([]);
  const [myCart, setMyCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sizeSelection, setSizeSelecttion] = useState(false);

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

    let sizeSelected = product.sizes.filter((f) => f.choice === true);
    product.sizes = sizeSelected;

    setAllProductsData(tempProducts);
    setMyCart([...myCart, product]);
    setIsModalVisible(true);
    setSizeSelecttion(false);
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
    product.sizes = [
      { id: 101, size: 'large', choice: false },
      { id: 102, size: 'extra large', choice: false },
      { id: 103, size: '2x extra large', choice: false },
    ];
    setMyCart(filtered);
    setAllProductsData(tempProducts);
    setSizeSelecttion(false);
  };

  const modalCancelHandler = () => {
    setIsModalVisible(false);
    setSizeSelecttion(false);
  };

  const clearCartHandler = () => {
    let tempCart = [...myCart];
    setSizeSelecttion(false);

    tempCart.map((item) => {
      item.inCart = false;
      item.count = 0;
      item.total = 0;

      item.sizes = [
        { id: 101, size: 'large', choice: false },
        { id: 102, size: 'extra large', choice: false },
        { id: 103, size: '2x extra large', choice: false },
      ];
      return setMyCart([]);
    });
  };

  const sizeChoiceHandler = (product, id) => {
    let index = product.sizes.findIndex((f) => f.id === id);
    let size = product.sizes[index];

    size.choice = true;

    product.sizes = [size];

    setProductDetailsDisplay(product);
    setSizeSelecttion(true);
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
        sizeChoiceHandler,
        sizeSelection,
        setSizeSelecttion,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
