import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    const { name } = JSON.parse(localStorage.getItem('user'));
    this.setState({
      userName: name,
    });
  }

  buttonOut() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/login');
  }

  render() {
    const { userName } = this.state;
    return (
      <div
        className="nav-bar"
      >
        <nav>
          {/* USAR TAG HTML APROPRIADA DEPOIS */}
          <Link to="/seller/orders">
            <span
              data-testid="customer_products__element-navbar-link-orders"
            >
              PEDIDOS
            </span>
          </Link>
          <h1
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { userName }
          </h1>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => this.buttonOut() }
          >
            Sair
          </button>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

// Navbar.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

export default withRouter(Navbar);
