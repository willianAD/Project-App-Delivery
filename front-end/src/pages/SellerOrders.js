import React, { Component } from 'react';
import Navbar from '../components/SellerOrders/Navbar';
import OrderCard from '../components/SellerOrders/OrderCard';
import { requestGet } from '../services/request';

class SellerOrders extends Component {
  constructor() {
    super();
    // ESSE ESTADO É SÓ UM EXEMPLO, O VERDADEIRO ESTADO
    // PRECISA VIR DAS INFORMAÇÕES DO BANCO DE DADOS
    this.state = {
      ordersArray: [],
    };
  }

  async componentDidMount() {
    const response = await requestGet('seller/orders');
    console.log(response);

    this.setState({
      ordersArray: response,
    });
  }

  render() {
    const {
      ordersArray,
    } = this.state;

    return (
      <main>
        <section className="nav-bar">
          <Navbar> Navbar </Navbar>
        </section>
        {/*
            FAZER UM MAP EM TODOS OS PEDIDOS E PARA CADA PEDIDO
            RENDERIZAR O ELEMENTO ABAIXO */}
        { ordersArray.map((order, key) => (
          <OrderCard
            key={ key }
            orderNum={ order.id }
            status={ order.status }
            saleDate={ order.saleDate }
            totalPrice={ order.totalPrice }
            deliveryAddress={ order.deliveryAddress }
          />
        )) }

      </main>
    );
  }
}
SellerOrders.propTypes = {}.isRequired;

export default SellerOrders;
