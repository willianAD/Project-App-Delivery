import React, { Component } from 'react';

class OrderCard extends Component {
  render() {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const ano = date.getFullYear().toString();
      return `${dia}/${mes}/${ano}`;
    };

    const formatterBrl = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const {
      orderNum,
      status,
      saleDate,
      totalPrice,
      deliveryAddress } = this.props;

    return (
      <div className="container-order-card">

        <div
          className="order-num"
          data-testid={ `seller_orders__element-order-id-${orderNum}` }
        >
          <p>Pedido</p>
          <p>{orderNum}</p>
        </div>

        <div>
          <div>
            <p
              data-testid={ `seller_orders__element-delivery-status-${orderNum}` }
            >
              {status}
            </p>
            <p
              data-testid={ `seller_orders__element-order-date-${orderNum}` }
            >
              {formatDate(saleDate)}
            </p>
            <p
              data-testid={ `seller_orders__element-card-price-${orderNum}` }
            >
              {formatterBrl.format(totalPrice)}
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${orderNum}` }
            >
              {deliveryAddress}
            </p>
          </div>

        </div>
      </div>
    );
  }
}

OrderCard.propTypes = {}.isRequired;

export default OrderCard;
