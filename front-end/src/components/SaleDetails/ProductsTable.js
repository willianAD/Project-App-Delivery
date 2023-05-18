import React from 'react';
import PropTypes from 'prop-types';

const dtiId = 'seller_order_details__element-order-table-item-number-';
const dtiDescription = 'seller_order_details__element-order-table-name-';
const dtiQuantity = 'seller_order_details__element-order-table-quantity-';
const dtiPrice = 'seller_order_details__element-order-table-unit-price-';
const dtiTotal = 'seller_order_details__element-order-table-sub-total-';

class ProductsTable extends React.Component {
  render() {
    const { products } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => (
              <tr key={ index }>
                <td
                  id="item"
                  data-testid={ `${dtiId}${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  id="description"
                  data-testid={ `${dtiDescription}${index}` }
                >
                  { product.name }
                </td>
                <td
                  id="quantity"
                  data-testid={ `${dtiQuantity}${index}` }
                >
                  { product.SalesProduct.quantity }
                </td>
                <td
                  id="price"
                  data-testid={ `${dtiPrice}${index}` }
                >
                  { product.price }
                </td>
                <td
                  id="total-price"
                  data-testid={ `${dtiTotal}${index}` }
                >
                  { (product.price * product.SalesProduct.quantity).toFixed(2) }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    SalesProduct: PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }),
    price: PropTypes.string.isRequired,
  })).isRequired,
};

export default ProductsTable;
