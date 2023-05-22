import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { requestGet } from '../services/request';
import '../styles/products.css';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      shoppingCart: [],
      shoppingCartValue: 0.00,
      entra: false,
    };
  }

  componentDidMount() {
    this.getProducts();
    this.getShoppingCart();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { shoppingCartValue, shoppingCart, entra } = this.state;
    if (prevState.shoppingCartValue !== shoppingCartValue) {
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      localStorage.setItem('shoppingCartValue', JSON.stringify(shoppingCartValue));
    }
    const shoppingCartValue2 = localStorage.getItem('shoppingCartValue');

    if (shoppingCartValue2 !== shoppingCartValue) {
      const a = shoppingCart.filter((e) => e.quantity !== 0);
      localStorage.setItem('shoppingCart', JSON.stringify(a));
      if (!a.length) {
        localStorage.setItem('shoppingCartValue', JSON.stringify(0.00));
        const shoppingCartValue3 = localStorage.getItem('shoppingCartValue');
        console.log(shoppingCartValue3);

        if (entra) {
          this.setState({ shoppingCartValue: 0.00, entra: false });
        }
      }
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
    console.log(shoppingCartValue);

    this.setState({ entra: true });
    const product = shoppingCart.find((a) => (
      a.name === target.name
    ));

    if (product) {
      product.quantity = Number(target.value);
      this.setState({
        shoppingCart,
        shoppingCartValue: shoppingCartValue + (product.quantity * price),
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
        <h1 className="title-products"> PRODUTOS </h1>
        <div className="paiCards-products">
          { products.map((product, index) => (
            <div
              key={ `customer_products__element-card-price-${index + 1}` }
              className="avoProduto-products"
            >
              <div className="paiImgPrice-products">
                <img
                  alt={ product.name }
                  src={ product.urlImage }
                  data-testid={ `customer_products__img-card-bg-image-${index + 1}` }
                  className="img-products"
                />
                <p
                  data-testid={ `customer_products__element-card-price-${index + 1}` }
                  className="price-products"
                >
                  { `R$ ${String(product.price).replace('.', ',')}` }
                </p>
              </div>
              <div className="paiInputs">
                <p
                  data-testid={ `customer_products__element-card-title-${index + 1}` }
                  className="name-products"
                >
                  { product.name }
                </p>
                <div className="inputPrice-products">
                  <button
                    type="button"
                    data-testid={ `customer_products__button-card-rm-item-${index + 1}` }
                    onClick={ () => this.subCart(product.name, product.price) }
                    className="moreBtn-products"
                  >
                    -
                  </button>
                  <input
                    data-testid={ `customer_products__input-card-quantity-${index + 1}` }
                    value={ shoppingCart.find((a) => a.name === product.name)
                       === undefined
                      ? 0 : shoppingCart.find((a) => a.name === product.name).quantity }
                    placeholder="0"
                    name={ product.name }
                    onChange={ (e) => this.handleChange(e, product.price, product.id) }
                    className="quantity-products"
                  />
                  <button
                    type="button"
                    data-testid={ `customer_products__button-card-add-item-${index + 1}` }
                    onClick={
                      () => this.addCart(product.name, product.price, product.id)
                    }
                    className="lessBtn-products"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="paiCheckoutBtn-products">
          <button
            type="button"
            data-testid="customer_products__button-cart"
            disabled={ shoppingCartValue === 0 }
            onClick={ () => history.push('/customer/checkout') }
            className="checkoutBtn-products"
          >
            Ver Carrinho: R$
            {' '}
            <span
              data-testid="customer_products__checkout-bottom-value"
            >
              { (shoppingCartValue).toFixed(2).replace('.', ',') }
            </span>
          </button>
        </div>
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
