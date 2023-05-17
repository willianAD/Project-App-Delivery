import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../components/SellerOrders/Navbar';
import { requestGet } from '../services/request';

class OrderDetails extends Component {
  constructor() {
    super();
    this.state = {
      orderDetails: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const orderId = match.params.id;
    const response = await requestGet(`seller/orders/${orderId}`);

    this.setState({
      orderDetails: response,
    });
  }

  render() {
    const { orderDetails } = this.state;

    if (!orderDetails) {
      return <div>Carregando...</div>;
    }

    return (
      <main>
        <section className="nav-bar">
          <Navbar> Navbar </Navbar>
          <h1>OrderDetails</h1>
        </section>

      </main>
    );
  }
}

OrderDetails.propTypes = {}.isRequired;

export default withRouter(OrderDetails);
