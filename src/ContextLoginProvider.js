import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { productsData } from './productsData';

export const loginContext = createContext();

export const ContextLoginProvider = ({ children }) => {
  const [allProductsData, setAllProductsData] = useState(productsData);
  const [loginView, setLoginView] = useState(true);
  const [signupView, setSignupView] = useState(false);

  const [signupInput, setSignupInput] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupCPassword, setSignupCPassword] = useState('');

  const [loginUsernameInput, setLoginUsernameInput] = useState('');
  const [loginPasswordInput, setLoginPasswordInput] = useState('');

  const [validUser, setValidUser] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(false);

  const [currentUser, setCurrentUser] = useState([
    {
      username: '',
      password: '',
    },
  ]);

  const [users, setUsers] = useState([{ username: 'tanex', password: '123' }]);
  const history = useHistory();

  ////////////////////////////////////////////////////////////////////////////
  const [productDetailsDisplay, setProductDetailsDisplay] = useState([]);
  const [myCart, setMyCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sizeSelection, setSizeSelecttion] = useState(false);

  /////////////////////////////////////////////////////////////////////////////

  const loginViewHandler = (choices) => {
    if (choices === 'login') {
      setLoginView(true);
      setSignupView(false);
    }
    if (choices === 'signup') {
      setLoginView(false);
      setSignupView(true);
    }
  };

  const signupOnChangeHandler = (e) => {
    e.preventDefault();
    setSignupInput(e.target.value);

    const tempUsers = [...users];
    const filtered = tempUsers.filter(
      (user) => user.username === e.target.value
    );

    filtered.length === 1 ? setValidUser(false) : setValidUser(true);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const tempUsers = [...users];
    let statusMessage = '';

    if (!validUser) {
      setSignupInput('');
      setSignupPassword('');
      setSignupCPassword('');
      statusMessage = message.error('Account already exist. Please try again.');
      console.log(tempUsers);
    } else {
      setUsers([
        ...tempUsers,
        { username: signupInput, password: signupCPassword },
      ]);
      setSignupInput('');
      setSignupPassword('');
      setSignupCPassword('');

      setLoginView(true);
      setSignupView(false);
      statusMessage = message.success('Account successfully created.');
    }

    return statusMessage;
  };

  const loginOnChangeHandler = (e) => {
    e.preventDefault();
    setLoginPasswordInput(e.target.value);

    const tempUsers = [...users];
    const filtered = tempUsers.filter(
      (user) =>
        user.password === e.target.value && user.username === loginUsernameInput
    );

    filtered.length === 1 ? setRegisteredUser(false) : setRegisteredUser(true);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    let statusMessage = '';
    if (!registeredUser) {
      setCurrentUser([
        {
          username: loginUsernameInput,
          password: loginPasswordInput,
        },
      ]);
      console.log('Logged In Successfully');
      statusMessage = message.success('Login Successfully');
      setLoginUsernameInput('');
      setLoginPasswordInput('');
      history.push('/productlist');
    } else {
      console.log('error login');
      statusMessage = message.error('Username or Password is incorrect!');
      setLoginUsernameInput('');
      setLoginPasswordInput('');
      return history.push('/');
    }
    return statusMessage;
  };

  const logoutHandler = (e) => {
    e.preventDefault();

    history.replace('/');
    setCurrentUser([
      {
        username: '',
        password: '',
      },
    ]);
  };

  ///////////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////////

  return (
    <loginContext.Provider
      value={{
        loginView,
        signupView,
        currentUser,
        loginViewHandler,
        signupInput,
        signupPassword,
        setSignupPassword,
        signupCPassword,
        setSignupCPassword,
        loginUsernameInput,
        loginPasswordInput,
        signupHandler,
        loginHandler,
        signupOnChangeHandler,
        loginOnChangeHandler,
        logoutHandler,
        setLoginUsernameInput,
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
    </loginContext.Provider>
  );
};
