import React from 'react';
import PropTypes from 'prop-types';

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
                <td id="item">{ index + 1 }</td>
                <td id="description">{ product.name }</td>
                <td id="quantity">{ product.SalesProduct.quantity }</td>
                <td id="price">{ product.price }</td>
                <td id="total-price">
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
