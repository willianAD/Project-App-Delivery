import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestGet, requestPut } from '../services/request';
import NavBar from '../components/NavBar';
import '../styles/orderDetails.css';

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      sale: {},
      status: '',
      button: false,
    };
  }

  componentDidMount() {
    this.getSale();
  }

  getSale = async () => {
    const { location: { pathname } } = this.props;
    const saleId = pathname[pathname.length - 1];
    const sale = await requestGet(`/seller/${saleId}`);
    const newDate = this.formatDate(sale.saleDate);
    this.setState({
      sale: { ...sale, saleDate: (await newDate).toString() },
      status: sale.status,
      button: sale.status !== 'Entregue',
    });
  };

  formatDate = async (date) => {
    const dateFormat = new Date(date);
    const ten = 10;

    const year = dateFormat.getFullYear();
    const day = dateFormat.getDate();
    const wrorngFormatMonth = dateFormat.getMonth() + 1;

    const month = wrorngFormatMonth >= ten ? wrorngFormatMonth : `0${wrorngFormatMonth}`;

    return `${day}/${month}/${year}`;
  };

  checkSale = async () => {
    const { sale } = this.state;
    const newStatus = 'Entregue';
    const body = {
      userId: sale.user.id,
      sellerId: sale.seller.id,
      totalPrice: sale.totalPrice,
      deliveryAddress: sale.deliveryAddress,
      deliveryNumber: sale.deliveryNumber,
      status: newStatus,
    };

    this.setState({
      status: newStatus,
      button: true,
    });

    await requestPut(`/seller/${sale.id}`, body);
  };

  render() {
    const dataTest = 'customer_order_details__element-order-';
    const { sale, status, button } = this.state;
    return (
      sale.products ? (
        <>
          <NavBar />
          <main className="order-details-main">
            <h1>Detalhes do pedido</h1>
            <div className="order-details-focus">
              <div className="order-details-table-head">
                <p
                  data-testid={ `${dataTest}details-label-order-id` }
                >
                  PEDIDO
                  {' '}
                  { sale.id }
                </p>
                <p
                  data-testid={ `${dataTest}details-label-seller-name` }
                >
                  P.Vendedora:
                  {' '}
                  { sale.seller.name }
                </p>
                <p
                  data-testid={ `${dataTest}details-label-order-date` }
                >
                  { sale.saleDate }
                </p>
                <p
                  className="status"
                  data-testid={ `${dataTest}details-label-delivery-status${sale.id}` }
                >
                  { status }
                </p>
                <button
                  data-testid="customer_order_details__button-delivery-check"
                  type="button"
                  onClick={ this.checkSale }
                  disabled={ button }
                >
                  Marcar como entregue
                </button>
              </div>
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
                  { sale.products ? sale.products.map((a, index) => (
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
            </div>
            <p
              data-testid={ `${dataTest}total-price` }
            >
              Total: R$
              <spna>
                { sale.totalPrice.replace('.', ',') }
              </spna>
            </p>
          </main>
        </>
      ) : <p> Loading </p>
    );
  }
}

Orders.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default connect()(Orders);
