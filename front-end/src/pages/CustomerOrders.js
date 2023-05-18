import React from 'react';
import PropTypes from 'prop-types';
import NavbarUser from '../components/NavbarUser';
import UserCard from '../components/UserCard';
import { requestGet } from '../services/request';
import '../styles/orders.css';

class CustomerOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      ordersArray: [],
    };
  }

  async componentDidMount() {
    const bd = await requestGet('seller/orders');

    const { id } = JSON.parse(localStorage.getItem('user'));

    const arrayCustomer = bd.filter((e) => e.userId === id);

    this.setState({
      ordersArray: arrayCustomer,
    });
  }

  handleClickOrder(orderId) {
    const { history } = this.props;
    history.push(`/customer/orders/${orderId}`);
  }

  render() {
    const { ordersArray } = this.state;
    return (
      <main className="order-main">
        <NavbarUser />
        <div className="order-all">
          { ordersArray.map((order, i) => (
            <button
              type="button"
              key={ i }
              onClick={ () => { this.handleClickOrder(order.id); } }
              className="product-card"
            >
              <UserCard
                key={ i }
                orderNum={ order.id }
                status={ order.status }
                saleDate={ order.saleDate }
                totalPrice={ order.totalPrice }
              />
            </button>
          )) }
        </div>
      </main>
    );
  }
}

CustomerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default CustomerOrders;
