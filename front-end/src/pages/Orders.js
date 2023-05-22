import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestGet, requestPut } from '../services/request';
import NavbarUser from '../components/NavbarUser';

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
      button: sale.status !== 'Em Trânsito',
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
          <NavbarUser />
          <h1>Detalhe do pedido</h1>
          <div>
            <div>
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
            { sale.products ? sale.products.map((a, index) => (
              <>
                <p
                  data-testid={ `${dataTest}table-item-number-${index}` }
                >
                  { index + 1 }
                </p>
                <p
                  data-testid={ `${dataTest}table-name-${index}` }
                >
                  { a.name }
                </p>
                <p
                  data-testid={ `${dataTest}table-quantity-${index}` }
                >
                  { a.quantity }
                </p>
                <p
                  data-testid={ `${dataTest}table-sub-total-${index}` }
                >
                  { a.price }
                </p>
                <p
                  data-testid={ `${dataTest}table-unit-price-${index}` }
                >
                  {
                    (Number(a.SalesProduct.quantity) * Number(a.price)).toFixed(2)
                  }
                </p>
              </>
            )) : <p> Loading </p> }
            <p
              data-testid={ `${dataTest}total-price` }
            >
              Total: R$
              <spna>
                { sale.totalPrice.replace('.', ',') }
              </spna>
            </p>
          </div>
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
