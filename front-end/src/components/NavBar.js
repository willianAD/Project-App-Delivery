import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav>
      <Link
        to='/products'
        data-testid='customer_products__element-navbar-link-products'
        >
        Produtos
      </Link>
      <Link to='/checkout'>
        Meus pedidos
      </Link>
      <p
        data-testid='customer_products__element-navbar-user-full-name'>
        ---Nome do usuário---
      </p>
      <Link
        data-testid='customer_products__element-navbar-link-logout'>
        Sair
      </Link>
      </nav>
    );
  }
}

  export default connect()(NavBar);
