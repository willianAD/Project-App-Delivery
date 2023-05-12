import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { requestPost, requestGet } from '../services/request';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
      shoppingCartValue: 0.00,
      sellers: [],
      details: { seller: 'Fulana Pereira', address: '', addressNumber: 0 },
    };
  }

  componentDidMount() {
    this.getShoppingCart();
    this.getUsers();
  }

  getUsers = async () => {
    const users = await requestGet('/user');
    const sellers = users.filter((a) => (
      a.role === 'seller'
    ));
    this.setState({
      sellers,
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
    const { shoppingCartValue, details, sellers } = this.state;
    const body = {
      userId: 1,
      sellerId: details.seller.id,
      totalPrice: shoppingCartValue,
      deliveryAddress: sellers.find((s) => s.name === details.seller).id,
      deliveryNumber: details.addressNumber,
      status: 'Pendente',
    };
    const response = await requestPost('/seller/orders', body);
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
        <div>
          <table>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
              <th>Remover Item</th>
            </tr>
            {shoppingCart.map((item, index) => (
              <tr key={ `${item.name}-${index}` }>
                <td>
                  { index }
                </td>
                <td>
                  { item.index }
                </td>
                <td>
                  { item.name }
                </td>
                <td>
                  { item.quantity }
                </td>
                <td>
                  { item.price }
                </td>
                <td>
                  { (Number(item.price) * item.quantity).toFixed(2) }
                </td>
                <td>
                  <button type="button">
                    Remover Item
                  </button>
                </td>
              </tr>
            ))}
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
        </div>
        <form>
          <h2> Detalhes e Endereço para Entrega </h2>
          <div>
            <label htmlFor="seller">
              <select
                id="seller"
                name="seller"
                data-testid="customer_checkout__select-seller"
                value={ details.seller }
                onClick={ (e) => this.handleChange('seller', e.target.value) }
              >
                {sellers.map((user) => (
                  <option
                    key={ user.name }
                    value={ user.name }
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
