import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class NavbarUser extends React.Component {
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
      <div>
        <nav>
          <Link to="/customer/products">
            <span data-testid="customer_products__element-navbar-link-products">
              PRODUTOS
            </span>
          </Link>
          <Link to="/customer/orders">
            <span data-testid="customer_products__element-navbar-link-orders">
              MEUS PEDIDOS
            </span>
          </Link>
          <span data-testid="customer_products__element-navbar-user-full-name">
            { userName }
          </span>
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

NavbarUser.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(NavbarUser);
