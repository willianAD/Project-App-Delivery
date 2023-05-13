import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { postHeader, requestGet } from '../services/request';

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
        addressNumber: 0,
      },
    };
  }

  componentDidMount() {
    this.getShoppingCart();
    this.getUsers();
  }

  getUsers = async () => {
    const thisUser = localStorage.getItem('user');
    const { details } = this.state;
    const users = await requestGet('/user');

    const userId = users.find((a) => (
      a.name === JSON.parse(thisUser).name
    ));

    this.setState({
      sellers: users,
      details: { ...details, userId: userId.id },
    });
  };

  getShoppingCart = () => {
    const shoppingCart = localStorage.getItem('shoppingCart');
    const shoppingCartValue = localStorage.getItem('shoppingCartValue');
    if (shoppingCart === null) {
      localStorage.setItem('shoppingCart', JSON.stringify({}));
      localStorage.setItem('shoppingCartValue', JSON.stringify(0));
    } else {
      this.setState({
        shoppingCart: JSON.parse(shoppingCart),
        shoppingCartValue: JSON.parse(shoppingCartValue),
      });
    }
  };

  finish = async () => {
    const { history } = this.props;
    const thisUser = JSON.parse(localStorage.getItem('user'));
    const { shoppingCartValue, details } = this.state;

    const body = {
      userId: details.userId,
      sellerId: details.sellerId,
      totalPrice: shoppingCartValue,
      deliveryAddress: details.address,
      deliveryNumber: details.addressNumber,
      status: 'Pendente',
    };
    const response = await postHeader('/seller/orders', body, thisUser.token);
    history.push(`/customer/orders/${response.id}`);
  };

  handleChange = (key, value) => {
    const { details } = this.state;
    this.setState({
      details: { ...details, [key]: value },
    });
  };

  render() {
    const { shoppingCartValue, shoppingCart, sellers, details } = this.state;
    return (
      <>
        <NavBar />
        <h1> Finalizar Pedido </h1>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
              <th>Remover Item</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((item, index) => (
              <tr key={ `${item.name}-${index}` }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  { item.name }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { item.quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { String(item.price).replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { (Number(item.price) * item.quantity).toFixed(2).replace('.', ',') }
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    Remover Item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Total: R$
          {' '}
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            {(shoppingCartValue).toFixed(2).replace('.', ',')}
          </span>
        </p>
        <form>
          <h2> Detalhes e Endereço para Entrega </h2>
          <div>
            <label htmlFor="seller">
              <select
                id="seller"
                name="seller"
                data-testid="customer_checkout__select-seller"
                value={ details.sellerId }
                onChange={ (e) => this.handleChange('seller', e.target.value) }
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
              Endereço
              <input
                id="address"
                name="address"
                type="text"
                value={ details.address }
                onChange={ (e) => this.handleChange('address', e.target.value) }
                data-testid="customer_checkout__input-address"
              />
            </label>
            <label
              htmlFor="address-number"
            >
              Número
              <input
                id="address-number"
                name="address-number"
                type="number"
                value={ details.addressNumber }
                onChange={ (e) => this.handleChange('addressNumber', e.target.value) }
                data-testid="customer_checkout__input-address-number"
              />
            </label>
          </div>
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ () => this.finish() }
          >
            FINALIZAR PEDIDO
          </button>
        </form>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Checkout);
