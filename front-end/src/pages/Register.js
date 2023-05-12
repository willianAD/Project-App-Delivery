import React from 'react';
import PropTypes from 'prop-types';
import { requestPost } from '../services/request';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      buttonDisable: true,
      messageError: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.verifyInputs);
  };

  verifyInputs = () => {
    const nameMax = 12;
    const passwordMin = 6;
    const { name, email, password } = this.state;
    const rejexEmail = /^[a-zA-Z0-9._-]+@([a-z]+\.)+[\w-]{2,4}$/;
    const validate = (rejexEmail.test(email) && name.length >= nameMax
      && password.length >= passwordMin);

    this.setState({ buttonDisable: !validate });
  };

  handleSubmit = async () => {
    try {
      const { name, email, password } = this.state;
      const { history } = this.props;

      const { token } = await requestPost('/user', { name, email, password });

      localStorage.setItem('user', JSON.stringify({
        name, email, role: 'customer', token,
      }));

      history.push('/customer/products');
    } catch (error) {
      this.setState({ messageError: false });
    }
  };

  render() {
    const { name, email, password, buttonDisable, messageError } = this.state;
    return (
      <form>
        <h1>Cadastro</h1>
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="name"
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            data-testid="common_register__input-email"
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
            data-testid="common_register__input-password"
            placeholder="Digite sua Senha"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ buttonDisable }
          onClick={ this.handleSubmit }
        >
          CADASTRAR
        </button>
        <br />
        {
          !messageError ? (
            <span data-testid="common_register__element-invalid_register">
              Dados Invalidos, preencha os campos corretamente!
            </span>
          ) : null
        }
      </form>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Register;
