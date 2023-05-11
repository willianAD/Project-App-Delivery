import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { requestGet } from '../services/request';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      shoppingCart: {},
      shoppingCartValue: 0.00
    };
  }

  componentDidMount() {
    this.getProducts();
    this.getShoppingCart();
  };

  getProducts = async () => {
    const products = await requestGet('product');
    this.setState({
      products: products,
    });
  }

  getShoppingCart = () => {
    const shoppingCart = localStorage.getItem('shoppingCart');
    if (shoppingCart === null) {
      localStorage.setItem('shoppingCart', JSON.stringify({}))
    } else {
      this.setState({
        shoppingCart: JSON.parse(shoppingCart)
      })
    }
  };

  addCart = (item, itemPrice) => {
    const { shoppingCart, shoppingCartValue } = this.state;
    this.setState({
      shoppingCart: {
        ...shoppingCart,
        [item]: shoppingCart[item] === undefined ? 1 : shoppingCart[item] + 1
      },
      shoppingCartValue: shoppingCartValue + Number(itemPrice)
    })
  };

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
              <p
                data-testid={`customer_products__input-card-quantity-${index}`}>
                  { this.state.shoppingCart[product.name] === undefined ? 0 : this.state.shoppingCart[product.name] }
              </p>
              <button
                data-testid={`customer_products__button-card-add-item-${index}`}
                onClick={() => this.addCart(product.name, product.price)}
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
