import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="paiLinks-nav">
          <div className="nav-link">
            <Link to="/seller/orders" className="link">
              <p
                data-testid="customer_products__element-navbar-link-orders"
                className="link"
              >
                PEDIDOS
              </p>
            </Link>
          </div>
        </div>
        <div className="paiName-nav">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { JSON.parse((localStorage.getItem('user'))).name }
          </p>
        </div>
        <div className="paiSair-nav">
          <Link
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.clear() }
            to="/login"
            className="link"
          >
            <p className="link-sair">Sair</p>
          </Link>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Navbar);
