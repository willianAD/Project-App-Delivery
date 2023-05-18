import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DetailsOrderTable extends React.Component {
  render() {
    const { saleProducts, dataTest } = this.props;
    return (
      <table className="details-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { saleProducts ? saleProducts.map((a, index) => (
            <tr key={ index } className="table-line">
              <td
                data-testid={ `${dataTest}table-item-number-${index}` }
                className="item-index"
              >
                { index + 1 }
              </td>
              <td
                data-testid={ `${dataTest}table-name-${index}` }
              >
                { a.name }
              </td>
              <td
                data-testid={ `${dataTest}table-quantity-${index}` }
              >
                { a.SalesProduct.quantity }
              </td>
              <td
                data-testid={ `${dataTest}table-sub-total-${index}` }
              >
                { a.price }
              </td>
              <td
                data-testid={ `${dataTest}table-unit-price-${index}` }
              >
                {
                  (Number(a.SalesProduct.quantity) * Number(a.price)).toFixed(2)
                }
              </td>
            </tr>
          )) : <p> Loading </p> }
        </tbody>
      </table>
    );
  }
}

DetailsOrderTable.propTypes = {
  saleProducts: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dataTest: PropTypes.string.isRequired,
};

export default connect()(DetailsOrderTable);
