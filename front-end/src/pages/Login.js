import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisable: true,
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
      return error;
    }
  };

  render() {
    const { email, password, buttonDisable } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            data-testid=""
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            data-testid=""
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid=""
          disabled={ buttonDisable }
          className="btnEntrar"
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
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
