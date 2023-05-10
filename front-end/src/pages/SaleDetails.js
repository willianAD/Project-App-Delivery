import React from 'react';
import { connect } from 'react-redux';
import ProductsTable from '../components/SaleDetails/ProductsTable';
import { requestGet } from '../services/request';
import totalCalculate from '../utils/TotalCalulate';

const dti = 'seller_order_details__element-order-details-label-delivery-status';

class SaleDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      orderId: 0,
      date: '',
      status: '',
      products: [],
    };
  }

  async componentDidMount() {
    const response = await requestGet('/seller/orders/details/1');
    this.setState({
      orderId: response[0].id,
      date: response[0].saleDate,
      status: response[0].status,
      products: response[0].products,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, products, orderId, date, status } = this.state;
    return (
      <>
        <h1>Detalhe do Pedido</h1>
        <div>
          <h3
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {`Pedido ${orderId}`}
          </h3>
          <h3
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {date}
          </h3>
          <h3
            data-testid={ dti }
          >
            {status}
          </h3>
          <button
            data-testid="seller_order_details__button-preparing-check"
            type="button"
          >
            Preparar pedido
          </button>
          <button type="button">Saiu para entrega</button>
        </div>
        {
          (isLoading) ? (<p>Carregando...</p>) : (
            <div>
              <ProductsTable products={ products } />
            </div>
          )
        }
        <h2>
          {`Total: R$${totalCalculate(products).toFixed(2)}`}
        </h2>
      </>
    );
  }
}

export default connect()(SaleDetails);
