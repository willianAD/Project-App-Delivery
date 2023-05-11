import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
      shoppingCartValue: 0.00,
    };
  }

  componentDidMount() {
    this.getShoppingCart();
  }

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

  render() {
    const { shoppingCartValue, shoppingCart } = this.state;
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
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
          >
            FINALIZAR PEDIDO
          </button>
        </form>
      </>
    );
  }
}

export default connect()(Checkout);
