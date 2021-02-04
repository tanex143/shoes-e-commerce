import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { productsData } from './productsData';

export const loginContext = createContext();

export const ContextLoginProvider = ({ children }) => {
  // storing the products data.
  const [allProductsData, setAllProductsData] = useState(productsData);

  // to check if the user is in the login or in the signup page.
  const [loginView, setLoginView] = useState(true);
  const [signupView, setSignupView] = useState(false);

  // controlled signup input.
  const [signupInput, setSignupInput] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupCPassword, setSignupCPassword] = useState('');

  // controlled login input.
  const [loginUsernameInput, setLoginUsernameInput] = useState('');
  const [loginPasswordInput, setLoginPasswordInput] = useState('');

  // checking if the user already registered.
  const [validUser, setValidUser] = useState(false);

  // checking if the user already registered.
  const [registeredUser, setRegisteredUser] = useState(false);

  // set the total value of cart.
  const [totalValue, setTotalValue] = useState(0);

  // storing user if who's logging in.
  const [currentUser, setCurrentUser] = useState([
    { id: null, username: '', password: '', cart: [] },
  ]);

  // storing all the user registered the their cart.
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'admin', cart: [] },
  ]);
  const history = useHistory();

  ////////////////////////////////////////////////////////////////////////////
  // storing the product which clicked.
  const [productDetailsDisplay, setProductDetailsDisplay] = useState([]);

  // modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // checking if the user selected the size or not.
  const [sizeSelection, setSizeSelecttion] = useState(false);

  /////////////////////////////////////////////////////////////////////////////

  // displaying the page if the user clicked the signup or login.
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

  // checking if the user already existed.
  const signupOnChangeHandler = (e) => {
    e.preventDefault();
    setSignupInput(e.target.value);

    const tempUsers = [...users];
    const filtered = tempUsers.filter(
      (user) => user.username === e.target.value
    );

    filtered.length === 1 ? setValidUser(false) : setValidUser(true);
  };

  // adding user that who fillup in the signup.
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
        {
          id: Date.now(),
          username: signupInput,
          password: signupCPassword,
          cart: [],
        },
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

  // checking if the user is registered or not.
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

  // if the user is registered then it will add in the current user.
  const loginHandler = (e) => {
    e.preventDefault();
    let statusMessage = '';

    const tempUsers = [...users];

    let filteredUser = tempUsers.filter(
      (f) => f.username === loginUsernameInput
    );
    console.log(filteredUser);
    if (!registeredUser) {
      setCurrentUser(filteredUser);
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

  // if the user will logout. his data will save in the all users.
  const logoutHandler = (e) => {
    e.preventDefault();

    const tempUsers = [...users];

    let index = tempUsers.findIndex((f) => f.id === currentUser[0].id);
    let filtered = tempUsers[index];

    filtered.id = currentUser[0].id;
    filtered.username = currentUser[0].username;
    filtered.password = currentUser[0].password;
    filtered.cart = currentUser[0].cart;
    setUsers(tempUsers);
    history.replace('/');
    setCurrentUser([{ id: null, username: '', password: '', cart: [] }]);
    setTotalValue(0);
  };

  ///////////////////////////////////////////////////////////
  // adding comma every 3 digit.
  const thousandsSeparatorsHandler = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // adding the product details in state and scroll to the top.
  const productDetailsDisplayHandler = (data) => {
    setProductDetailsDisplay(data);

    window.scrollTo({
      top: 0,
    });
  };

  // add to cart
  const addToCartHandler = (id, currentuser) => {
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
    setCurrentUser([
      {
        id: currentuser.id,
        username: currentuser.username,
        password: currentuser.password,
        cart: [...currentUser[0].cart, product],
      },
    ]);
    setIsModalVisible(true);
    setSizeSelecttion(false);
  };

  // incrementing and decrementing the product quantity.
  const quantityHandler = (id, quantity) => {
    let tempCart = [...currentUser];
    let index = tempCart[0].cart.findIndex((f) => f.id === id);
    let product = tempCart[0].cart[index];

    if (quantity) {
      product.count += 1;
    } else {
      product.count -= 1;
    }

    product.total = product.price * product.count;

    setCurrentUser(tempCart);
  };

  // removing each item in cart.
  const removeItemHandler = (id) => {
    let tempProducts = [...allProductsData];
    let tempCart = [...currentUser];
    let indexItem = tempCart[0].cart.findIndex((f) => f.id === id);

    tempCart[0].cart.splice(indexItem, 1);

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
    setCurrentUser(tempCart);
    setAllProductsData(tempProducts);
    setSizeSelecttion(false);
  };

  // showing modal once clicked the add to cart button.
  const modalCancelHandler = () => {
    setIsModalVisible(false);
    setSizeSelecttion(false);
  };

  // clearing the cart of that user.
  const clearCartHandler = () => {
    let tempProducts = [...allProductsData];
    let tempCart = [...currentUser];

    tempCart[0].cart = [];

    setSizeSelecttion(false);
    setTotalValue(0);

    tempProducts.map((item) => {
      item.inCart = false;
      item.count = 0;
      item.total = 0;

      item.sizes = [
        { id: 101, size: 'large', choice: false },
        { id: 102, size: 'extra large', choice: false },
        { id: 103, size: '2x extra large', choice: false },
      ];
      return setCurrentUser(tempCart);
    });
  };

  // setting the product size which user picked.
  const sizeChoiceHandler = (product, id) => {
    let index = product.sizes.findIndex((f) => f.id === id);
    let size = product.sizes[index];

    size.choice = true;

    product.sizes = [size];

    setProductDetailsDisplay(product);
    setSizeSelecttion(true);
  };
  /////////////////////////////////////////////////////////

  // adding the total value of the cart.
  const totalValueHandler = (user) => {
    let total = user.cart.reduce(
      (variable, currentValue) => variable + currentValue.total,
      0
    );

    setTotalValue(total);
  };

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
        productDetailsDisplayHandler,
        addToCartHandler,
        isModalVisible,
        modalCancelHandler,
        quantityHandler,
        removeItemHandler,
        clearCartHandler,
        sizeChoiceHandler,
        sizeSelection,
        setSizeSelecttion,
        users,
        totalValue,
        setTotalValue,
        totalValueHandler,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};
