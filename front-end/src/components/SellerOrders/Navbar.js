import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div
        className="nav-bar"
      >
        <nav>
          {/* USAR TAG HTML APROPRIADA DEPOIS */}
          <h1
            className="customer_products__element-navbar-link-orders"
          >
            PEDIDOS
          </h1>
          <h1
            className="customer_products__element-navbar-user-full-name"
          >
            User
          </h1>
          <h1
            className="customer_products__element-navbar-link-logout"
          >
            Sair
          </h1>
        </nav>
      </div>
    );
  }
}

export default Navbar;
