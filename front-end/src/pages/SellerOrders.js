import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../components/SellerOrders/Navbar';
import OrderCard from '../components/SellerOrders/OrderCard';
import { requestGet } from '../services/request';

class SellerOrders extends Component {
  constructor() {
    super();

    this.state = {
      ordersArray: [],
    };
  }

  async componentDidMount() {
    const response = await requestGet('seller/orders');

    const { id } = JSON.parse(localStorage.getItem('user'));
    const arraySeller = response.filter((e) => e.sellerId === id);

    this.setState({
      ordersArray: arraySeller,
    });
  }

  handleClickOrder(orderId) {
    const { history } = this.props;
    history.push(`/seller/orders/${orderId}`);
  }

  render() {
    const { ordersArray } = this.state;

    return (
      <main>
        <section className="nav-bar">
          <Navbar />
        </section>
        { ordersArray.map((order, key) => (
          <button
            type="button"
            key={ key }
            onClick={ () => this.handleClickOrder(order.id) }
          >
            <OrderCard
              key={ key }
              orderNum={ order.id }
              status={ order.status }
              saleDate={ order.saleDate }
              totalPrice={ order.totalPrice }
              deliveryAddress={ order.deliveryAddress }
            />
          </button>
        )) }
      </main>
    );
  }
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SellerOrders);
