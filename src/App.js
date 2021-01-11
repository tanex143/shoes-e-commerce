import Navbar from './components/navbar';
import ProductsList from './components/productsList';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import ProductDetails from './components/productDetails';
import MyCartDetails from './components/myCartDetails';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <ProductsList />
        </Route>
        <Route path='/mycart' exact>
          <MyCartDetails />
        </Route>
        <Route path='/productdetails/:title'>
          <ProductDetails />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
