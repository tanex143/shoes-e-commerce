import Navbar from './components/navbar';
import ProductsList from './components/productsList';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import ProductDetails from './components/productDetails';
import MyCartDetails from './components/myCartDetails';
import PageNotFound from './components/pageNotFound';
import Login from './components/login';
import { ContextLoginProvider } from './ContextLoginProvider';

const App = () => {
  return (
    <>
      <ContextLoginProvider>
        <Switch>
          <Route path='/' exact>
            <Navbar />
            <ProductsList />
            <Footer />
          </Route>

          <Route path='/login' exact>
            <Login />
          </Route>

          <Route path='/mycart' exact>
            <Navbar />
            <MyCartDetails />
          </Route>

          <Route path='/productdetails/:title'>
            <Navbar />
            <ProductDetails />
          </Route>

          <Route component={PageNotFound} />
        </Switch>
      </ContextLoginProvider>
    </>
  );
};

export default App;
