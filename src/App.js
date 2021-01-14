import Navbar from './components/navbar';
import ProductsList from './components/productsList';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import ProductDetails from './components/productDetails';
import MyCartDetails from './components/myCartDetails';
import PageNotFound from './components/pageNotFound';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <ProductsList />
          <Footer />
        </Route>
        <Route path='/mycart' exact>
          <MyCartDetails />
        </Route>
        <Route path='/productdetails/:title'>
          <ProductDetails />
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
};

export default App;
