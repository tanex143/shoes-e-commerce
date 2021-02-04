import Navbar from './components/navbar';
import ProductsList from './components/productsList';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import ProductDetails from './components/productDetails';
import MyCartDetails from './components/myCartDetails';
import PageNotFound from './components/pageNotFound';
import Login from './components/login';

const App = () => {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>

        <Route path='/productlist' exact>
          <Navbar />
          <ProductsList />
          <Footer />
        </Route>

        <Route path='/mycart' exact>
          <Navbar />
          <MyCartDetails />
        </Route>

        <Route path='/productdetails/:title'>
          <Navbar />
          <ProductDetails />
        </Route>

        {/* if the url is incorrect or mispelled then it will redirect to page not found */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
};

export default App;
