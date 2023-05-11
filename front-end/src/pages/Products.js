import React from 'react';
import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { requestGet } from '../services/request';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      shoppingCart: [],
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
  };

  getShoppingCart = () => {
    const shoppingCart = localStorage.getItem('shoppingCart');
    const shoppingCartValue = localStorage.getItem('shoppingCartValue');
    if (shoppingCart === null) {
      localStorage.setItem('shoppingCart', JSON.stringify([]));
      localStorage.setItem('shoppingCartValue', JSON.stringify(0))
    } else {
      this.setState({
        shoppingCart: JSON.parse(shoppingCart),
        shoppingCartValue: JSON.parse(shoppingCartValue)
      });
    }
  };

  subCart = (item, itemPrice) => {
    const { shoppingCart, shoppingCartValue } = this.state;
    const product = shoppingCart.find((a, i) => {
      if(a.name === item) return i;
    })
    if (product && product.quantity > 0) {
      console.log('helo')
      product.quantity -= 1; 
      this.setState({
        shoppingCart, 
        shoppingCartValue: shoppingCartValue - Number(itemPrice),
      });
    }
  };

  addCart = (item, itemPrice) => {
    const { shoppingCart, shoppingCartValue } = this.state;
    const product = shoppingCart.find((a, i) => {
      if(a.name === item) return i;
    })
    if (product) {
      product.quantity += 1; 
      this.setState({
        shoppingCart,
        shoppingCartValue: shoppingCartValue + Number(itemPrice),
      });
    } else {
      this.setState({
        shoppingCart: [...shoppingCart, {name: item, quantity: 1, price: itemPrice }],
        shoppingCartValue: shoppingCartValue + Number(itemPrice),
      });
    }
  };

  render() {
    const { products, shoppingCartValue, shoppingCart } = this.state;
    return (
      <>
      <NavBar />
      <h1> Products </h1>
      { products.map((product, index) => (
          <div
            key={ `customer_products__element-card-price-${index}` }
          >
            <img
              alt={product.name}
              src={ product.urlImage }
              data-testid={ `customer_products__img-card-bg-image-${index}` }
            />
            <p
              data-testid={ `customer_products__element-card-price-${index}` }
            >
              { product.price }
            </p>
            <p
              data-testid={ `customer_products__element-card-title-${index}` }
            >
              { product.name }
            </p>
            <div>
              <button
                type="button"
                data-testid={ `customer_products__button-card-rm-item-${index}` }
                onClick={ () => this.subCart(product.name, product.price) }
              >
                -
              </button>
              <p
                data-testid={ `customer_products__input-card-quantity-${index}` }>
                  {shoppingCart.find((a) => a.name === product.name) === undefined ? 0 : shoppingCart.find((a) => a.name === product.name).quantity}
              </p>
              <button
                type="button"
                data-testid={ `customer_products__button-card-add-item-${index}` }
                onClick={ () => this.addCart(product.name, product.price) }
              >
                +
              </button>
            </div>
          </div>
        ))
      }
      <button
        type="button"
      >
        Ver Carrinho: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { (shoppingCartValue).toFixed(2).replace(".", ",") }
        </span>
      </button>
      </>
    );
  }
}

export default connect()(Products);
