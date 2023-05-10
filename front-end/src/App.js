import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
<<<<<<< HEAD
import Register from './pages/Register';
=======
import SaleDetails from './pages/SaleDetails';
>>>>>>> 148c624 (feat: create page SaleDetails)
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
<<<<<<< HEAD
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" />
=======
      <Route exact path="/seller/details" component={ SaleDetails } />
>>>>>>> 148c624 (feat: create page SaleDetails)
    </Switch>
  );
}

export default App;
