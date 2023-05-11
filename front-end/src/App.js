import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/products" component={ Products } />
    </Switch>
  );
}

export default App;
