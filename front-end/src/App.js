import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Login from './pages/Login';
import admin from './pages/Admin';
import Register from './pages/Register';
import SellerOrders from './pages/SellerOrders';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/admin/manage" component={ admin } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ OrderDetails } />
    </Switch>
  );
}

export default App;
