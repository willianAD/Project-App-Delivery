import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/seller/orders" component={ SellerOrders } />
    </Switch>
  );
}

export default App;
