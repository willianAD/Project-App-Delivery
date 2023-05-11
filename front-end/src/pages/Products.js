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

  componentDidUpdate(_prevProps, prevState) {
    const {shoppingCartValue, shoppingCart} = this.state;
    if (prevState.shoppingCartValue !== shoppingCartValue) {
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      localStorage.setItem('shoppingCartValue', JSON.stringify(shoppingCartValue))
    }
  }

  getProducts = async () => {
    const products = await requestGet('product');
    this.setState({
      products: products,
    });
  }

  getShoppingCart = () => {
    const shoppingCart = localStorage.getItem('shoppingCart');
    const shoppingCartValue = localStorage.getItem('shoppingCartValue');
    if (shoppingCart === null) {
      localStorage.setItem('shoppingCart', JSON.stringify({}));
      localStorage.setItem('shoppingCartValue', JSON.stringify(0))
    } else {
      this.setState({
        shoppingCart: JSON.parse(shoppingCart),
        shoppingCartValue: JSON.parse(shoppingCartValue)
      })
    }
  };

  subCart = (item, itemPrice) => {
    const { shoppingCart, shoppingCartValue } = this.state;
    if (shoppingCart[item]) {
      this.setState({
        shoppingCart: {
          ...shoppingCart,
          [item]: shoppingCart[item] - 1
        },
        shoppingCartValue: shoppingCartValue - Number(itemPrice)
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
                onClick={ () => this.subCart(product.name, product.price) }
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
      <button>
        Ver Carrinho: R$
        {' '}
        <span data-testid='customer_products__checkout-bottom-value'>
          {(this.state.shoppingCartValue).toFixed(2).replace(".", ",")}
        </span>
      </button>
      </>
    );
  }
}

Products.propTypes = {};

  export default connect()(Products);
