import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import CheckoutTable from '../components/CheckoutTable';

import { postHeader, requestGet, requestPost } from '../services/request';
import { setLocalStorage, getLocalStorage } from '../helpers/index';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
      shoppingCartValue: 0.00,
      sellers: [],
      details: {
        userId: 0,
        sellerId: 2,
        address: '',
        addressNumber: '',
      },
    };
  }

  componentDidMount() {
    this.getShoppingCart();
    this.getUsers();
  }

  getUsers = async () => {
    const thisUser = getLocalStorage('user');
    const { details } = this.state;
    const users = await requestGet('/user');

    const userId = users.find((a) => (
      a.name === thisUser.name
    ));

    this.handleComponent([{ name: 'sellers', value: users },
      { name: 'details', value: { ...details, userId: userId.id } }]);
  };

  getShoppingCart = () => {
    const shoppingCart = getLocalStorage('shoppingCart');
    const shoppingCartValue = getLocalStorage('shoppingCartValue');
    if (shoppingCart === null) {
      setLocalStorage([{ name: 'shoppingCart', value: [] },
        { name: 'shoppingCartValue', value: 0 }]);
    } else {
      this.setState({
        shoppingCart,
        shoppingCartValue,
      });
    }
  };

  finish = async () => {
    const { history } = this.props;
    const thisUser = getLocalStorage('user');
    const { shoppingCartValue, details, shoppingCart } = this.state;

    const body = {
      userId: details.userId,
      sellerId: details.sellerId,
      totalPrice: shoppingCartValue,
      deliveryAddress: details.address,
      deliveryNumber: details.addressNumber,
      status: 'Pendente',
    };
    const response = await postHeader('/seller/orders', body, thisUser.token);
    const products = shoppingCart.map((p) => p);

    const secondBody = {
      id: response.id,
      products,
    };
    console.log(secondBody);
    await requestPost('/sale', secondBody);

    history.push(`/customer/orders/${response.id}`);
  };

  handleChange = (key, value) => {
    const { details } = this.state;
    this.setState({
      details: { ...details, [key]: value },
    });
  };

  handleComponent = (components) => {
    components.forEach((component) => {
      this.setState({
        [component.name]: component.value,
      });
    });
  };

  render() {
    const { shoppingCartValue, shoppingCart, sellers, details } = this.state;
    return (
      <div className="paiCheckout">
        <NavBar />
        <h1 className="title-checkout"> FINALIZAR PEDIDO </h1>
        { shoppingCart.length > 0
          ? (
            <CheckoutTable
              shoppingCart={ shoppingCart }
              shoppingCartValue={ shoppingCartValue }
              handleComponent={ this.handleComponent }
            />
          )
          : <p> Você não possui produtos no carrinho  </p>}
        <p className="price-checkout">
          Total: R$
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            {(shoppingCartValue).toFixed(2).replace('.', ',')}
          </span>
        </p>
        <form className="form-login">
          <h2 className="title-register"> Detalhes e Endereço para Entrega </h2>
          <div className="paiInputs-register">
            <label htmlFor="seller">
              <span className="labelName">Pessoa Vendedora</span>
              <select
                id="seller"
                name="seller"
                data-testid="customer_checkout__select-seller"
                value={ details.sellerId }
                onChange={ (e) => this.handleChange('seller', e.target.value) }
                className="inputRole-admin"
              >
                {sellers.map((user) => (
                  <option
                    key={ user.name }
                    value={ user.id }
                  >
                    { user.name }
                  </option>))}
              </select>
            </label>
            <label htmlFor="address">
              <span className="labelName">Endereço</span>
              <input
                id="address"
                name="address"
                type="text"
                value={ details.address }
                onChange={ (e) => this.handleChange('address', e.target.value) }
                data-testid="customer_checkout__input-address"
                className="inputName-register"
              />
            </label>
            <label
              htmlFor="address-number"
            >
              <span className="labelName">Número</span>
              <input
                id="address-number"
                name="address-number"
                type="number"
                placeholder="0"
                value={ details.addressNumber }
                onChange={ (e) => this.handleChange('addressNumber', e.target.value) }
                data-testid="customer_checkout__input-address-number"
                className="inputName-register"
              />
            </label>
          </div>
          <div className="btn-admin">
            <button
              type="button"
              data-testid="customer_checkout__button-submit-order"
              onClick={ () => this.finish() }
              className="buttonRegister-admin"
            >
              FINALIZAR PEDIDO
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Checkout);
