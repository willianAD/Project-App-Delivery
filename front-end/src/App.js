import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
<<<<<<< HEAD
import admin from './pages/Admin';
import Register from './pages/Register';
import CustomerOrders from './pages/CustomerOrders';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import SellerOrders from './pages/SellerOrders';
import OrderDetails from './pages/OrderDetails';
=======
<<<<<<< HEAD
import Register from './pages/Register';
=======
import SaleDetails from './pages/SaleDetails';
>>>>>>> 148c624 (feat: create page SaleDetails)
import './App.css';
>>>>>>> 297e174 (feat: create page SaleDetails)

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
<<<<<<< HEAD
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/admin/manage" component={ admin } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders/:id" component={ Orders } />
      <Route exact path="/customer/products" />
<<<<<<< HEAD
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ OrderDetails } />
=======
=======
      <Route exact path="/seller/details" component={ SaleDetails } />
>>>>>>> 148c624 (feat: create page SaleDetails)
>>>>>>> 297e174 (feat: create page SaleDetails)
    </Switch>
  );
}

export default App;
