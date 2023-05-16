import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleUser } from '../redux/actions';
import { requestPost } from '../services/request';
import DrinkUp from '../images/DrinkUp.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisable: true,
      messageError: true,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    history.push('/login');
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.verifyInputs);
  };

  verifyInputs = () => {
    const characters = 6;
    const { email, password } = this.state;
    const rejexEmail = /^[a-zA-Z0-9._-]+@([a-z]+\.)+[\w-]{2,4}$/;
    const validate = (rejexEmail.test(email) && password.length >= characters);

    this.setState({ buttonDisable: !validate });
  };

  handleSubmit = async () => {
    try {
      const { email, password } = this.state;
      const { dispatch, history } = this.props;
      const { token } = await requestPost('/user/login', { email, password });
      const { id, name, role } = await requestPost('/user/email', { email });

      localStorage.setItem('user', JSON.stringify({
        id, name, email, role, token,
      }));

      if (role === 'customer') {
        history.push('/customer/products');
      } else if (role === 'seller') {
        history.push('/seller/orders');
      } else {
        history.push('/admin/manage');
      }

      dispatch(handleUser(email));
    } catch (error) {
      this.setState({ messageError: false });
    }
  };

  createAccount = () => {
    const { history } = this.props;
    history.push('/register');
  };

  render() {
    const { email, password, buttonDisable, messageError } = this.state;
    return (
      <form>
        <img src={ DrinkUp } alt="AppLogo" />
        <h1>DRINK UP</h1>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            data-testid="common_login__input-email"
            placeholder="Digite seu Email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            data-testid="common_login__input-password"
            placeholder="Digite sua Senha"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ buttonDisable }
          onClick={ this.handleSubmit }
        >
          LOGIN
        </button>
        <br />
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ this.createAccount }
        >
          Ainda não tenho conta
        </button>
        <br />
        {
          !messageError ? (
            <span data-testid="common_login__element-invalid-email">
              Email e Password devem ser validos!
            </span>
          ) : null
        }
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
