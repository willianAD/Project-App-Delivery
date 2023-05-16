import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocalStorage } from '../helpers/index';
import { requestGet, postHeader } from '../services/request';
import NavBar from '../components/NavBar';

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      sale: {},
      status: '',
    };
  }

  componentDidMount() {
    this.getSale();
  }

  getSale = async () => {
    const { location: { pathname } } = this.props;
    const saleId = pathname[pathname.length - 1];
    const sale = await requestGet(`/seller/${saleId}`);
    const seller = await requestGet(`/user/${sale.sellerId}`);
    const newDate = this.formatDate(sale.saleDate);
    console.log(sale);
    this.setState({
      sale: { ...sale, saleDate: (await newDate).toString(), seller: (await seller) },
      status: sale.status,
    });
  };

  formatDate = async (date) => {
    const dateFormat = new Date(date);

    const year = dateFormat.getFullYear();
    const day = dateFormat.getDate();
    const month = dateFormat.getMonth();

    return `${day}/${month}/${year}`;
  };

  checkSale = async () => {
    const { sale } = this.state;
    const { token } = getLocalStorage('user');
    const newStatus = 'Entregue';

    const body = {
      userId: sale.userId,
      sellerId: sale.sellerId,
      totalPrice: sale.totalPrice,
      deliveryAddress: sale.deliveryAddress,
      deliveryNumber: sale.deliveryNumber,
      status: newStatus,
    };

    this.setState({
      status: newStatus,
    });

    await postHeader('/seller/orders', body, token);
  };

  render() {
    const { sale, status } = this.state;
    const { seller } = sale;
    return (
      sale.products
        ? (
          <>
            <NavBar />
            <h1>Detalhe do pedido</h1>
            <div>
              <div>
                <p
                  data-testid="customer_order_details__element-order-details-label-order-id"
                >
                  PEDIDO
                  {' '}
                  { sale.id }
                </p>
                <p
                  data-testid="customer_order_details__element-order-details-label-seller-name"
                >
                  P.Vendedora:
                  {' '}
                  { seller.name }
                </p>
                <p
                  data-testid="customer_order_details__element-order-details-label-order-date"
                >
                  { sale.saleDate }
                </p>
                <p
                  data-testid={
                    `customer_order_details__element-order-details-label-delivery-status${sale.id}`
                  }
                >
                  { status }
                </p>
                <button
                  data-testid="customer_order_details__button-delivery-check"
                  type="button"
                  onClick={ this.checkSale }
                  disabled={ status === 'Entregue' }
                >
                  Marcar como entregue
                </button>
              </div>
              { sale.products.map((a, index) => (
                <>
                  <p
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    { index }
                  </p>
                  <p
                    data-testid={
                      `customer_order_details__element-order-table-name-${index}`
                    }
                  >
                    { a.name }
                  </p>
                  <p
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    { a.quantity }
                  </p>
                  <p
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    { a.price }
                  </p>
                  <p
                    data-testid={
                      `customer_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    {
                      (Number(a.SalesProduct.quantity) * Number(a.price)).toFixed(2)
                    }
                  </p>
                </>
              ))}
              <p
                data-testid="customer_order_details__element-order-total-price"
              >
                Total: R$
                { sale.totalPrice }
              </p>
            </div>
          </>)
        : <p> Loading  </p>
    );
  }
}

Orders.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default connect()(Orders);
