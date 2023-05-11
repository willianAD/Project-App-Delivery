import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {

  constructor() {
    super();
  }

  // handleSubmit = (path) => {
  //   // const { history } = this.props;
  //   // this.history.push(path);
  //   console.log(this.props.history)
  // };


  render() {
    return (
      <nav>
      <Link
        to='/products'
        data-testid='customer_products__element-navbar-link-products'
        >
        Produtos
      </Link>
      <Link to='/'>
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

// NavBar.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

  export default connect()(NavBar);
