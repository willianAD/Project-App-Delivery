import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/navBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <div className="paiLinks-nav">
          <div className="nav-link">
            <Link
              to="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
              className="link"
            >
              <p className="link">Produtos</p>
            </Link>
          </div>
          <div className="nav-link">
            <Link
              to="/customer/orders"
              data-testid="customer_products__element-navbar-link-orders"
              className="link"
            >
              <p className="link">Meus pedidos</p>
            </Link>
          </div>
        </div>
        <div className="paiName-nav">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { JSON.parse((localStorage.getItem('user'))).name}
          </p>
        </div>
        <div className="paiSair-nav">
          <Link
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.removeItem('user') }
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

export default connect()(NavBar);
