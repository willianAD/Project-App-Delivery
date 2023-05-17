import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { requestGet } from '../services/request';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      shoppingCart: [],
      shoppingCartValue: 0.00,
    };
  }

  componentDidMount() {
    this.getProducts();
    this.getShoppingCart();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { shoppingCartValue, shoppingCart } = this.state;
    if (prevState.shoppingCartValue !== shoppingCartValue) {
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      localStorage.setItem('shoppingCartValue', JSON.stringify(shoppingCartValue));
    }
  }

  getProducts = async () => {
    const products = await requestGet('product');
    this.setState({
      products,
    });
  };

  getShoppingCart = () => {
    const shoppingCart = localStorage.getItem('shoppingCart');
    const shoppingCartValue = localStorage.getItem('shoppingCartValue');
    if (shoppingCart === null) {
      localStorage.setItem('shoppingCart', JSON.stringify([]));
      localStorage.setItem('shoppingCartValue', JSON.stringify(0));
    } else {
      this.setState({
        shoppingCart: JSON.parse(shoppingCart),
        shoppingCartValue: JSON.parse(shoppingCartValue),
      });
    }
  };

  subCart = (item, itemPrice) => {
    const { shoppingCart, shoppingCartValue } = this.state;
    const product = shoppingCart.find((a) => (
      a.name === item
    ));
    if (product && product.quantity > 0) {
      product.quantity -= 1;
      this.setState({
        shoppingCart,
        shoppingCartValue: shoppingCartValue - Number(itemPrice),
      });
    }
  };

  addCart = (item, itemPrice, itemId) => {
    const { shoppingCart, shoppingCartValue } = this.state;
    const product = shoppingCart.find((a) => (
      a.name === item
    ));
    if (product) {
      product.quantity += 1;
      this.setState({
        shoppingCart,
        shoppingCartValue: shoppingCartValue + Number(itemPrice),
      });
    } else {
      this.setState({
        shoppingCart: [...shoppingCart,
          { name: item, quantity: 1, price: itemPrice, id: itemId }],
        shoppingCartValue: shoppingCartValue + Number(itemPrice),
      });
    }
  };

  handleChange = ({ target }, price) => {
    const { shoppingCart, shoppingCartValue } = this.state;
    const product = shoppingCart.find((a) => (
      a.name === target.name
    ));
    if (product) {
      product.quantity = Number(target.value);
      this.setState({
        shoppingCart,
        shoppingCartValue: shoppingCartValue + (target.value * price),
      });
    } else {
      this.setState({
        shoppingCart: [...shoppingCart,
          { name: target.name, quantity: target.value, price }],
        shoppingCartValue: shoppingCartValue + Number(price * target.value),
      });
    }
  };

  render() {
    const { products, shoppingCartValue, shoppingCart } = this.state;
    const { history } = this.props;
    return (
      <>
        <NavBar />
        <h1> Products </h1>
        { products.map((product, index) => (
          <div
            key={ `customer_products__element-card-price-${index + 1}` }
          >
            <img
              alt={ product.name }
              src={ product.urlImage }
              data-testid={ `customer_products__img-card-bg-image-${index + 1}` }
            />
            <p
              data-testid={ `customer_products__element-card-price-${index + 1}` }
            >
              { String(product.price).replace('.', ',') }
            </p>
            <p
              data-testid={ `customer_products__element-card-title-${index + 1}` }
            >
              { product.name }
            </p>
            <div>
              <button
                type="button"
                data-testid={ `customer_products__button-card-rm-item-${index + 1}` }
                onClick={ () => this.subCart(product.name, product.price) }
              >
                -
              </button>
              <input
                data-testid={ `customer_products__input-card-quantity-${index + 1}` }
                value={ shoppingCart.find((a) => a.name === product.name) === undefined
                  ? 0 : shoppingCart.find((a) => a.name === product.name).quantity }
                placeholder="0"
                name={ product.name }
                onChange={ (e) => this.handleChange(e, product.price, product.id) }
              />
              <button
                type="button"
                data-testid={ `customer_products__button-card-add-item-${index + 1}` }
                onClick={ () => this.addCart(product.name, product.price, product.id) }
              >
                +
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ shoppingCartValue === 0 }
          onClick={ () => history.push('/customer/checkout') }
        >
          Ver Carrinho: R$
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { (shoppingCartValue).toFixed(2).replace('.', ',') }
          </span>
        </button>
      </>
    );
  }
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Products);
