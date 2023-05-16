import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Orders from './pages/Orders';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders/:id" component={ Orders } />
    </Switch>
  );
}

export default App;
