import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <Link
          to="/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/checkout"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus pedidos
        </Link>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { JSON.parse((localStorage.getItem('user'))).name}
        </p>
        <Link
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => localStorage.removeItem('user') }
          to="/login"
        >
          Sair
        </Link>
      </nav>
    );
  }
}

export default connect()(NavBar);
