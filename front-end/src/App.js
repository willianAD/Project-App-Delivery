import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
