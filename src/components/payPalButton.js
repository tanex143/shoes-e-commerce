import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useContext } from 'react';
import { loginContext } from './../ContextLoginProvider';
import { useHistory } from 'react-router-dom';

const PayPalButton = () => {
  const { totalValue, clearCartHandler } = useContext(loginContext);
  const history = useHistory();

  const onSuccess = (payment) => {
    // Congratulation, it came here means everything's fine!
    console.log('The payment was succeeded!', payment);
    clearCartHandler();
    history.replace('/productlist');
  };

  const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log('The payment was cancelled!', data);
  };

  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log('Error!', err);
  };

  let env = 'sandbox';
  let currency = 'USD';

  const client = {
    sandbox:
      'Ac-PCIi2fMxGDgV_iBTT09Nx0PzSMXXgKM6UjlMB4xGubtwZX3Gj5P786J8o57RpaLh1IxfWhz04eaTi',
    production: 'YOUR-PRODUCTION-APP-ID',
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={totalValue}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
};

export default PayPalButton;
