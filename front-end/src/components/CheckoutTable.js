import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLocalStorage } from '../helpers/index';

class CheckoutTable extends React.Component {
  handleRemoveProduct = (productName) => {
    const { shoppingCart, shoppingCartValue } = this.props;
    const { handleComponent } = this.props;

    const productRemove = shoppingCart.find((product) => product.name === productName);
    const withouTheProduct = shoppingCart
      .filter((product) => product.name !== productName);
    const newValue = shoppingCartValue - (productRemove.price * productRemove.quantity);

    handleComponent([{ name: 'shoppingCart', value: withouTheProduct },
      { name: 'shoppingCartValue', value: newValue },
    ]);
    setLocalStorage([{ name: 'shoppingCart', value: withouTheProduct },
      { name: 'shoppingCartValue', value: newValue }]);
  };

  render() {
    const { shoppingCart } = this.props;
    return (
      <table className="details-table">
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
          { shoppingCart.map((item, index) => (
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
                { (Number(item.price) * item.quantity)
                  .toFixed(2).replace('.', ',') }
              </td>
              <td>
                <button
                  type="button"
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  onClick={ () => this.handleRemoveProduct(item.name) }
                >
                  Remover Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

CheckoutTable.propTypes = {
  shoppingCart: PropTypes.shape({
    map: PropTypes.func,
    find: PropTypes.func,
    filter: PropTypes.func,
  }).isRequired,
  shoppingCartValue: PropTypes.number.isRequired,
  handleComponent: PropTypes.func.isRequired,
};

export default connect()(CheckoutTable);
