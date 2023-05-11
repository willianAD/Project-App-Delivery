import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { requestGet } from '../services/request';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  };

  getProducts = async () => {
    const products = await requestGet('product');
    this.setState({
      products: products,
    });
  }

  render() {
    return (
      <>
      <NavBar/>
      <h1> Products </h1>
      {this.state.products.map((product, index) => {
        return (
          <div
            key={`customer_products__element-card-price-${index}`}
          >
            <img
              alt={product.name}
              src={ product.urlImage }
              data-testid={`customer_products__img-card-bg-image-${index}`}
            />
            <p data-testid={`customer_products__element-card-price-${index}`}>
              {product.price }
            </p>
            <p
              data-testid={`customer_products__element-card-title-${index}`}
            >
              { product.name }
            </p>
            <div>
              <button
                data-testid={`customer_products__button-card-rm-item-${index}`}
              >
                -
              </button>
              <p data-testid={`customer_products__input-card-quantity-${index}`}></p>
              <button
                data-testid={`customer_products__button-card-add-item-${index}`}
              >
                +
              </button>
            </div>
          </div>
        )
      })}
      </>
    );
  }
}

Products.propTypes = {};

  export default connect()(Products);
